export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
}

export type CreateProductDto = Omit<IProduct, 'id'>;

export interface ProductsResponse {
  products: IProduct[];
}

export interface SingleProductResponse {
  product: IProduct;
}

export interface CreateProductResponse {
  newProduct: IProduct;
}

export interface UpdateProductResponse {
  updatedProduct: IProduct;
}

export interface RemoveProductResponse {
  removedProduct: IProduct;
}
