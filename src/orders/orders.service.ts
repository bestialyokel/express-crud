import { CreateOrderDto, DeleteOrderDto, DtoRawValues, UpdateOrderDto } from "./order.dto";
import { Order } from "./order";
import { IOrderDao } from "./order.dao";
import * as Validator from "validator";
import { ValidationError, ValidationErrorCode } from "./errors";

export interface IOrdersService {
    getAll(): Promise<Order[]>;
    deleteOne(dto: DtoRawValues<DeleteOrderDto>): Promise<Order | null>;
    updateOne(id: number, dto: DtoRawValues<UpdateOrderDto>): Promise<Order | null>;
    addOne(dto: DtoRawValues<CreateOrderDto>): Promise<Order | null>;
}

type FieldsValidator<T> = {
    [key in keyof T]: (value: string) => ValidationErrorCode | null
};

const CreateOrderDtoValidator: FieldsValidator<CreateOrderDto> = {
    sum: (value) => Validator.default.isCurrency(value) ? null : ValidationErrorCode.INVALID_CURRENCY,
    currency: (value) => Validator.default.isCurrency(value) ? null : ValidationErrorCode.INVALID_CURRENCY,
    course: (value) => Validator.default.isCurrency(value) ? null : ValidationErrorCode.INVALID_CURRENCY,
    email: (value) => Validator.default.isEmail(value) ? null : ValidationErrorCode.INVALID_EMAIL
};

const UpdateOrderDtoValidator: FieldsValidator<UpdateOrderDto> = CreateOrderDtoValidator;

const DeleteOrderDtoValidator: FieldsValidator<DeleteOrderDto> = {
    id: (value) => Validator.default.isInt(value) ? null : ValidationErrorCode.ID_INT_ERROR
}

const validateFields = <T>(dto: DtoRawValues<T>, validator: FieldsValidator<T>) => {
    for (const key of Object.keys(validator) ) {
        const keyT = key as keyof T;
        const validateFunc = validator[keyT];
        const value = String(dto[keyT]);
        const error = validateFunc(value);
        if (error != null) {
            return new ValidationError(`${key} error: ${error}`)
        }
    }

    return null;
};

export class OrdersService implements IOrdersService {

    constructor(protected orders: IOrderDao) {}

    public getAll(): Promise<Order[]> {
        return this.orders.getAll();
    }

    public deleteOne(dto: DtoRawValues<DeleteOrderDto>) {
        const validateError = validateFields(dto, DeleteOrderDtoValidator);
        if (validateError != null) {
            throw validateError;
        }
        
        const deleteDto = this.convertDeleteDto(dto);
        return this.orders.deleteOne(deleteDto);
    }

    public updateOne(id: number, dto: DtoRawValues<UpdateOrderDto>) {
        const validateError = validateFields(dto, UpdateOrderDtoValidator);
        if (validateError != null) {
            throw validateError;
        }
        
        const updateDto = this.convertUpdateDto(dto);
        return this.orders.updateOne(id, updateDto);
    }

    public addOne(dto: DtoRawValues<CreateOrderDto>) {
        const validateError = validateFields(dto, CreateOrderDtoValidator);
        if (validateError != null) {
            throw validateError;
        }
        
        const updateDto = this.convertUpdateDto(dto);
        return this.orders.addOne(updateDto);
    }

    protected convertCreateDto(dto: DtoRawValues<CreateOrderDto>): CreateOrderDto {
        return {
            sum: Number(dto.sum),
            course: Number(dto.course),
            currency: Number(dto.currency)
        } as CreateOrderDto;
    }

    protected convertUpdateDto(dto: DtoRawValues<UpdateOrderDto>): UpdateOrderDto {
        return this.convertCreateDto(dto) as UpdateOrderDto;
    }

    protected convertDeleteDto(dto: DtoRawValues<DeleteOrderDto>): DeleteOrderDto {
        return {
            id: Number(dto.id)
        } as DeleteOrderDto;
    }
}