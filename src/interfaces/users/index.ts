export interface IUserRequest {

    name: string;
    email: string;
    cpf: string;
    password: string;
    permission_id: number;
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

export interface IUserUpdate {
    name?: string,
    email?: string,
    cpf?: string,
    permission?: number,
    company?: string,
    active?: boolean,
    password?: string
}

export interface IUserFormated{
    id: string;
    name: string;
    email: string;
    cpf: string;
    permission: any;
    company: any;
    active: boolean;
    created_at: Date;
    updated_at: Date;

}