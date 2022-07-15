export interface IUserRequest {

    name: string;
    email: string;
    cpf: string;
    password: string;
    permission_id: string;
    company_id: string;  
}

export interface IUserResponse {

    id: string;
    name: string;
    email: string;
    cpf: string;
    permission: object;
    company: object;
    active: boolean;
    created_at: Date;
    updated_at: Date;

}

export interface IUserLogin {

    email: string;
    password: string;

}