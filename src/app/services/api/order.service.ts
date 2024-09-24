import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { CreateOrderModel, Order } from 'src/app/shared/models/order';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(
        private http: HttpClient,
        @Inject('API_URL') private apiUrl: string,
    ) 
    { }

    createOrder(createOrderModel : CreateOrderModel) : Observable<any> {
        return this.http.post(`${this.apiUrl}api/Order`, createOrderModel);
    }

    getClientOrders(id: string) : Observable<any> {
        return this.http.get(`${this.apiUrl}api/Order/user/all/${id}`);
    }

    getManagerOrders(id: string) : Observable<any> {
        return this.http.get(`${this.apiUrl}api/Order/manager/all/${id}`);
    }

    changeOrderDescription(order: Order) : Observable<any> {
        return this.http.patch(`${this.apiUrl}api/Order/${order.id}/description`, { description: order.description });
    }

    approveOrder(orderId: string) : Observable<any> {
        return this.http.patch(`${this.apiUrl}api/Order/approve/${orderId}`, '');
    }

    cancelOrder(orderId: string) : Observable<any> {
        return this.http.patch(`${this.apiUrl}api/Order/cancel/${orderId}`, '');
    }

    completeOrder(orderId: string) : Observable<any> {
        return this.http.patch(`${this.apiUrl}api/Order/complete/${orderId}`, '');
    }
}
