export interface ICompany {
  id: string;
  name: string;
  cnpj: string;
}

export interface ICreateCompany {
  name: string;
  cnpj: string;
}

export interface IUpdateCompany {
  id: string;
  data: {
    name?: string;
    cnpj?: string;
  };
}

export interface IDeleteCompany {
  id: string;
}
