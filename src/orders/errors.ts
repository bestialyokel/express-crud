

export enum ValidationErrorCode {
    ID_INT_ERROR = "Id must be of integer type",
    INVALID_EMAIL = "Invalid email value",
    INVALID_CURRENCY = "Invalid currency value"
}

export class ValidationError extends Error {
    name: string = "ValidationError";
}

export class CreateOrderError extends Error {
    name: string = "CreateOrderError";
}

export class UpdateOrderError extends Error {
    name: string = "UpdateOrderError";
}

export class DeleteOrderError extends Error {
    name: string = "DeleteOrderError";
}

export class UnhandledError extends Error {
    name: string = "UnhandledError";
}