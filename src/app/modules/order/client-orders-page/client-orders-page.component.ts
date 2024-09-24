import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/api/auth.service';
import { OrderService } from 'src/app/services/api/order.service';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-client-orders-page',
  templateUrl: './client-orders-page.component.html',
  styleUrls: ['./client-orders-page.component.scss']
})
export class ClientOrdersPageComponent implements OnInit {
    
    clientOrders!: Order[];

    constructor(
        private orderService: OrderService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        var clientId = this.authService.getUserInfoFromToken().accountId;
        this.orderService.getClientOrders(clientId).subscribe({
            next: (response) => {
                console.log(response);
                this.clientOrders = response;
            }
        })
    }
}
