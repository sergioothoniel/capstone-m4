import appDataSource from "../../data-source"
import { Category } from "../../entities/category.entity"
import { Permission } from "../../entities/permission.entity"
import { ICategoryRequest, ICategoryResponse } from "../../interfaces/categories"
import { IPermissionsRequest, IPermissionsResponse } from "../../interfaces/permissions"

export const categoriesRepository = appDataSource.getRepository(Category)

export const listCategoriesRepository = async (): Promise<ICategoryResponse[]> =>{
    const categories = await categoriesRepository.find()
    return categories
}


export const createCategoriesRepository = (newCategory: ICategoryRequest): ICategoryResponse =>{
    const category = categoriesRepository.create(newCategory)
    return category
}

export const saveCategoriesRepository = async (newCategory: ICategoryRequest): Promise<ICategoryResponse> =>{
    const category = await categoriesRepository.save(newCategory)
    return category
}

export const deleteCategoriesRepository = async (id: string) =>{

    const categories = await listCategoriesRepository()

    const categoryToDelete = categories.find(category => category.id === id)

    await categoriesRepository.delete(categoryToDelete!.id)
}

export const updateCategoriesRepository = async (id: string, name: string)=>{

    await categoriesRepository.update({id: id}, {name: name})

    const categories = await listCategoriesRepository()
    const categoryUpdated = categories.find(category => category.id === id)

    return categoryUpdated
}
