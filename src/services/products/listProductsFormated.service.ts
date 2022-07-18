import { listProductRepository } from "../../repositories/products";

const listProductsFormatedService = async (page = 1) => {
  const products = await listProductRepository();
  //   const productsWithoutPassword = products.map((product) => {
  //     return { ...product, password: undefined };
  //   });

  const productsPerPage = 15;
  const productsQuantity = products.length;
  const pages = Math.ceil(productsQuantity / productsPerPage);
  const productsToShow = products.filter((_, index) => {
    const lastIndex = page * 15;
    const firstIndex = lastIndex - 15;

    return index >= firstIndex && index < lastIndex;
  });

  const requestResult = {
    itensQuantity: productsQuantity,
    totalPages: pages,
    page,
    products: productsToShow,
  };

  return requestResult;
};
export default listProductsFormatedService;
