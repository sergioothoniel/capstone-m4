export interface IProductsRequest {

    name: string;
    description: string;
    category_id: string;
    user_id: string;

}

export interface IProductsResponse {

    id: string;
    name: string;
    description: string;
    category: object;
    user: object;

}

export interface IProductUpdate{
    name?: string;
    description?: string;
    category_id?: string;
}