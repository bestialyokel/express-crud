import { CreateOrderDto, DeleteOrderDto, DtoRawValues, UpdateOrderDto } from "./order.dto";
import { Order } from "./order";
import { IOrdersService } from "./orders.service";
import { UnhandledError } from "./errors";

export interface IOrdersController {
    getAll(): Promise<Order[]>;
    deleteOne(dto: DtoRawValues<DeleteOrderDto>): Promise<Order | null>;
    updateOne(id: number, dto: DtoRawValues<UpdateOrderDto>): Promise<Order | null>;
    addOne(dto: DtoRawValues<CreateOrderDto>): Promise<Order | null>;
}

export class OrdersController implements IOrdersController {

    constructor(protected orders: IOrdersService) {}

    async getAll() {
        return this.orders.getAll();
    }

    public deleteOne(dto: DtoRawValues<DeleteOrderDto>) {
        return this.orders.deleteOne(dto);
    }

    public updateOne(id: number, dto: DtoRawValues<UpdateOrderDto>) {
        return this.orders.updateOne(id, dto);
    }

    public addOne(dto: DtoRawValues<CreateOrderDto>) {
        return this.orders.addOne(dto);
    }
}