import appDataSource from "../../data-source"
import { Product } from "../../entities/product.entity"
import { IProductsRequest, IProductsResponse, IProductUpdate } from "../../interfaces/products"

export const productsRepository = appDataSource.getRepository(Product)

export const listProductRepository = async (): Promise<IProductsResponse[]> =>{
    const products = await productsRepository.find()
    return products
}


export const createUProductsRepository = (newProduct: IProductsRequest): IProductsResponse =>{
    const product = productsRepository.create(newProduct)
    return product
}

export const saveProductRepository = async (newProduct: IProductsRequest): Promise<IProductsResponse> =>{
    const product = await productsRepository.save(newProduct)
    return product
}

export const deleteProductRepository = async (id: string) =>{

    const products = await listProductRepository()

    const productToDelete = products.find(product => product.id === id)

    await productsRepository.delete(productToDelete!.id)
}

export const updateProductRepository = async (id: string, data: IProductUpdate)=>{

    await productsRepository.update({id: id}, data)

    const products = await listProductRepository()
    const productUpdated = products.find(product => product.id === id)

    return productUpdated
}