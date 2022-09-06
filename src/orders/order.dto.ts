

export type DtoRawValues<T> = {
    [key in keyof T]: string
};

export interface CreateOrderDto {
    sum: number;
    currency: number;
    course: number;
    email: string
}

export interface UpdateOrderDto extends CreateOrderDto {}

export interface DeleteOrderDto {
    id: number;
}