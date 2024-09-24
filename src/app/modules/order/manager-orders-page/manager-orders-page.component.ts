import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/services/api/auth.service';
import { OrderService } from 'src/app/services/api/order.service';
import { LocalizationService } from 'src/app/services/localization.service';
import { UserService } from 'src/app/services/api/user.service';
import { CreateOrderModel, Order } from 'src/app/shared/models/order';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-training-center-orders-page',
  templateUrl: './manager-orders-page.component.html',
  styleUrls: ['./manager-orders-page.component.scss']
})
export class ManagerOrdersPageComponent {

    orders!: Order[];
    loading: boolean = true;
    isOrderAddDialogOpened: boolean = false;
    isOrderModifyDialogOpened: boolean = false;
    modifyOrderForm!: FormGroup;
    clientsList!: User[];
    currentModifyingOrder: any = {};
    orderToCreate: CreateOrderModel = {
        description: '',
        managerId: null,
        beekeeperId: null
    }
    orderToCreateBeekeeper?: User

    constructor(
        private orderService: OrderService,
        private authService: AuthService,
        private userService: UserService,
        public localizationService: LocalizationService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        if(!this.authService.isCurrentUserManager()) {
            alert("You don't have access to manager orders!");
            return;
        }
        this.updateActualOrderList();
        
        this.userService.getAllBeekeepersInfo().subscribe((result) => {
            this.clientsList = result;
            console.log(result);
        })
    }

    initModifyOrderDialog(order: Order) {
        this.currentModifyingOrder = order;
        this.isOrderModifyDialogOpened = true;
    }

    initCreateOrderDialog() {
        var currentManagerId = this.authService.getUserInfoFromToken().accountId;
        this.orderToCreate = {
            description: '',
            managerId: currentManagerId,
            beekeeperId: null
        }
        console.log("opened");
        this.isOrderAddDialogOpened = true;
    }

    updateActualOrderList() {
        var managerData = this.authService.getUserInfoFromToken();
        this.orderService.getManagerOrders(managerData.accountId)
        .pipe(
            finalize(() => {
                this.loading = false;
            })
        )
        .subscribe({
            next: (response) => {
                this.orders = response;
            },
            error: (reponse) => {
                this.messageService.add({severity: "error", summary: "Error", detail: "Cannot get orders"});
            }
        })
    }

    createNewOrder() {
        if(this.orderToCreateBeekeeper == null) {
            this.messageService.add({severity:"error", summary:"Error", detail:"Chose the beekeeper"});
            return;
        }

        this.orderToCreate.beekeeperId = this.orderToCreateBeekeeper.userAccountId;
        this.orderService.createOrder(this.orderToCreate).subscribe({
            next: (reponse) => {
                this.messageService.add({severity:"success", summary:"Success", detail: "Order succesfully created"});
                this.updateActualOrderList();
                this.isOrderAddDialogOpened = false;
            },
            error: (error) => {
                this.messageService.add({severity:"error", summary:"Error", detail: "Error during order creating"});
            }
        });
    }

    modifyOrder() {
        this.orderService.changeOrderDescription(this.currentModifyingOrder).subscribe({
            next: (response) => {
                console.log(response);
                this.messageService.add({severity:"success", summary:"Success", detail:"Order data sucessfully modified"});
                this.isOrderModifyDialogOpened = false;
                this.updateActualOrderList();
            },
            error: (error) => {
                this.messageService.add({severity:"error", summary:"Error", detail: error.error.message});
            }
        });
    }

    getClientLabel(client: User): string {
        return `${client.firstName} ${client.lastName} (${client.userName})`;
    }

    cancelOrder(orderId: string) {
        this.orderService.cancelOrder(orderId).subscribe({
            next: () => { this.isOrderModifyDialogOpened = false; this.messageService.add({severity:'success', summary:'Success', detail:'Order status changed' }); this.updateActualOrderList() },
            error: (error) => this.messageService.add({severity:'error', summary:'Error', detail: error.error.message })
        });
    }

    approveOrder(orderId: string) {
        this.orderService.approveOrder(orderId).subscribe({
            next: () => { this.isOrderModifyDialogOpened = false; this.messageService.add({severity:'success', summary:'Success', detail:'Order status changed' }); this.updateActualOrderList()},
            error: (error) => this.messageService.add({severity:'error', summary:'Error', detail: error.error.message })
        });
    }

    completeOrder(orderId: string) {
        this.orderService.completeOrder(orderId).subscribe({
            next: () => { this.isOrderModifyDialogOpened = false; this.messageService.add({severity:'success', summary:'Success', detail:'Order status changed' }); this.updateActualOrderList()},
            error: (error) => this.messageService.add({severity:'error', summary:'Error', detail: error.error.message })
        });
    }
    
}
