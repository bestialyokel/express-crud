import * as Pg from "pg";
import { Order } from "./order";
import { CreateOrderDto, DeleteOrderDto, UpdateOrderDto } from "./order.dto";

export interface IOrderDao {
    getAll(): Promise<Order[]>;
    deleteOne(dto: DeleteOrderDto): Promise<Order | null>;
    updateOne(id: number, dto: UpdateOrderDto): Promise<Order | null>;
    addOne(dto: CreateOrderDto): Promise<Order | null>;
}

export class OrderDaoImpl implements IOrderDao {
    constructor(protected dbClient: Pg.Pool) {}

    protected convertRowToOrder(value: Pg.QueryResultRow): Order {
        const order = {
            id: value['order_id'],
            sum: Number(value['summ']),
            currency: Number(value['currency']),
            course: Number(value['course']),
            email: value['email'] 
        } as Order;

        return order;
    }

    async getAll() {
        const query = 'SELECT order_id, summ, currency, course FROM orders';
        const queryResult = await this.dbClient.query(query);
        const orders = queryResult.rows.map(row => this.convertRowToOrder(row));
        return orders;
    }

    async deleteOne(dto: DeleteOrderDto) {
        const query = 'DELETE FROM orders WHERE order_id = $1 \
            RETURNING order_id, summ, currency, course';
        const queryResult = await this.dbClient.query(query, [dto.id]);

        if ( queryResult.rows.length == 0 ) {
            return null;
        }

        return this.convertRowToOrder(queryResult.rows[0]);
    }

    async updateOne(id: number, dto: UpdateOrderDto) {
        const query = 'UPDATE orders set \
            summ = $1, \
            currency = $2, \
            course = $3 \
            where order_id = $4 \
            RETURNING order_id, summ, currency, course';
        const {sum, currency, course} = dto;
        const queryResult = await this.dbClient.query(query, [sum, currency, course, id]);
       
        if ( queryResult.rows.length == 0 ) {
            return null;
        }

        return this.convertRowToOrder(queryResult.rows[0]);
    }

    async addOne(dto: CreateOrderDto) {
        const query = 'INSERT INTO orders(summ, currency, course) \
            VALUES ($1, $2, $3) \
            RETURNING order_id, summ, currency, course';
        const {sum, currency, course} = dto;
        const queryResult = await this.dbClient.query(query, [sum, currency, course]);
        
        if ( queryResult.rows.length == 0 ) {
            return null;
        }

        return this.convertRowToOrder(queryResult.rows[0]);
    }
}