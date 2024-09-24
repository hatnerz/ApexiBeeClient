import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { OrderService } from 'src/app/services/api/order.service';
import { LocalizationService } from 'src/app/services/localization.service';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent {

    orderDateFormat!: string;

    constructor(public localizationService: LocalizationService)
    {
        this.getCorrentOrderDateFormat();
    }

    @Input()
    isCanBeModified: boolean = false;

    @Input()
    orders!: Order[]

    @Output()
    modifyOrderButtonClick = new EventEmitter<Order>();

    getCorrentOrderDateFormat() {
        this.orderDateFormat = 
            this.localizationService.getCurrentDataFormat()?.value + " "
            + this.localizationService.getCurrentTimeFormat()?.format;
    }

    getCorrectOrderDate(order: Order) {
        var newDate = new Date(order.orderDate);
        newDate.setHours(newDate.getHours() + this.localizationService.getCurrentTimeZone());
        return newDate;
    }

    sendOrderModifying(order: Order) {
        var newOrder = { ...order }
        console.log(order);
        this.modifyOrderButtonClick.emit(newOrder);
    }
}
