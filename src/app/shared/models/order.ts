import { UserAccount } from "./user";

export interface Order {
    id: string;
    orderDate: Date;
    description: string;
    status?: OrderStatus;
    beekeeperId?: string,
    beekeeper?: UserAccount,
    managerId?: string,
    manager?: UserAccount
}

export interface OrderStatus {
    id: string,
    statusName: string
}

export interface CreateOrderModel {
    description: string,
    managerId: string | null,
    beekeeperId: string | null
}