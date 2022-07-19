export interface IOrderRequest {

    product_id: string;
    user_id: string;
    quantity: number;
    type: string;
}

export interface IOrderResponse {

    id: string;
    product: object;
    user: object;
    quantity: number;
    type: string;
    active: boolean;
    created_at: Date;
    updated_at: Date;

}