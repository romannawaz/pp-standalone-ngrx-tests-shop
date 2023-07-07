import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ProductsService } from './products.service';
import { CreateProductDto, IProduct } from './products.interface';

describe('[ProductsService]', () => {
  let service: ProductsService;

  let httpTestingController: HttpTestingController;

  let productMock: IProduct = {
    id: '123',
    title: 'title',
    description: 'description',
    price: 10,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(ProductsService);

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should return all products', () => {
    const expectedProducts = [productMock, productMock];

    service.getAll().subscribe((products) => {
      expect(products).toEqual(expectedProducts);
    });

    const req = httpTestingController.expectOne(service.getAllUrl());
    req.flush({ products: expectedProducts });
  });

  it('Should return product by id', () => {
    service.getById(productMock.id).subscribe((product) => {
      expect(product).toEqual(productMock);
    });

    const req = httpTestingController.expectOne(
      service.getByIdUrl(productMock.id)
    );
    req.flush({ product: productMock });
  });

  it('Should return created product', () => {
    const { id, ...createProduct } = productMock;
    const createProductMock: CreateProductDto = createProduct;

    service.create(createProductMock).subscribe((product) => {
      expect(product).toEqual(productMock);
    });

    const req = httpTestingController.expectOne(service.createUrl());
    req.flush({ newProduct: productMock });
  });

  it('Should return updated product', () => {
    const changes: Partial<IProduct> = {
      title: 'newTitle',
      price: 20,
    };

    const updatedProductMock: IProduct = Object.assign(productMock, changes);

    service.update(productMock.id, changes).subscribe((updatedProduct) => {
      expect(updatedProduct).toEqual(updatedProductMock);
    });

    const req = httpTestingController.expectOne(
      service.updateUrl(productMock.id)
    );
    req.flush({ updatedProduct: updatedProductMock });
  });

  it('Should return removed product', () => {
    service.remove(productMock.id).subscribe((removedProduct) => {
      expect(removedProduct).toEqual(productMock);
    });

    const req = httpTestingController.expectOne(
      service.removeUrl(productMock.id)
    );
    req.flush({ removedProduct: productMock });
  });
});
