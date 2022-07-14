export interface IUserRequest {

    name: string;
    email: string;
    cpf: string;
    password: string;
    permission_id: string;
    company_id: string;
    active: boolean;

}

export interface IUserResponse {

    id: string;
    name: string;
    email: string;
    cpf: string;
    permission_id: string;
    company_id: string;
    active: boolean;
    created_at: Date;
    updated_at: Date;

}

export interface IUserLogin {

    email: string;
    password: string;

}