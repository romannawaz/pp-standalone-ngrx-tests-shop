import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { ApiService } from '@services/api/api.service';
import {
  CreateProductDto,
  CreateProductResponse,
  IProduct,
  ProductsResponse,
  RemoveProductResponse,
  SingleProductResponse,
  UpdateProductResponse,
} from './products.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private _url = this.apiService.apiUrl + '/products';

  constructor(private http: HttpClient, private apiService: ApiService) {}

  getAllUrl = () => `${this._url}/all`;

  getByIdUrl = (id: string) => `${this._url}/${id}`;

  createUrl = () => `${this._url}/create`;

  updateUrl = (id: string) => `${this._url}/update/${id}`;

  removeUrl = (id: string) => `${this._url}/remove/${id}`;

  getAll(): Observable<IProduct[]> {
    return this.http
      .get<ProductsResponse>(this.getAllUrl())
      .pipe(map(({ products }) => products));
  }

  getById(id: string): Observable<IProduct> {
    return this.http
      .get<SingleProductResponse>(this.getByIdUrl(id))
      .pipe(map(({ product }) => product));
  }

  create(product: CreateProductDto): Observable<IProduct> {
    return this.http
      .post<CreateProductResponse>(this.createUrl(), product)
      .pipe(map(({ newProduct }) => newProduct));
  }

  update(id: string, changes: Partial<IProduct>): Observable<IProduct> {
    return this.http
      .patch<UpdateProductResponse>(this.updateUrl(id), {
        changes,
      })
      .pipe(map(({ updatedProduct }) => updatedProduct));
  }

  remove(id: string): Observable<IProduct> {
    return this.http
      .delete<RemoveProductResponse>(this.removeUrl(id))
      .pipe(map(({ removedProduct }) => removedProduct));
  }
}
