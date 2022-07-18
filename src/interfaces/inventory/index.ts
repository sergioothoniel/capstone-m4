export interface IInventoryRequest{
    product_id: string,
    unitary_value: number,
    quantity: number
}

export interface IInventoryResponse {    
    id: string,
    product: object,
    unitary_value: number,
    quantity: number,
    total_value: number,
    created_at: Date,
    updated_at: Date
}

export interface IInventoryUpdate{
    quantity: number,
    unitary_value?: number,
}