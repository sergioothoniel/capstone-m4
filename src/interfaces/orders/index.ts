export interface IOrderRequest {

    product_id: string;
    user_id: string;
    quantity: number;
    type: string;
    active: boolean;

}

export interface IOrderResponse {

    id: string;
    product_id: string;
    user_id: string;
    quantity: number;
    type: string;
    active: boolean;
    created_at: string;
    updated_at: string;

}