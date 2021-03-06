export interface IInventoryRequest {
  product_id: string;
  unitary_value: number;
  quantity: number;
}

export interface IInventoryResponse {
  id: string;
  product: object;
  unitary_value: number;
  quantity: number;
  total_value: number;
  created_at: Date;
  updated_at: Date;
}

export interface IInventoryUpdate {  
  type_order: string;
  unitary_value?: number,
  quantity: number
}

export interface IInventoryUpdated {
  id: string;
  newData: {
    quantity: number;
    unitary_value?: number;
    total_value: number;
  };
}
export interface IInventoryList {
  id: string;
}
