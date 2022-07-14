export interface ICompanie {
  id: string;
  name: string;
  cnpj: string;
}

export interface ICreateCompanie {
  name: string;
  cnpj: string;
}

export interface IUpdateCompanie {
  id: string;
  name: string;
}

export interface IDeleteCompanie {
  id: string;
}
