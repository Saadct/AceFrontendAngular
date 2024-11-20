import { Injectable } from '@angular/core';
import { environment } from '../../env';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: string; 
  nom: string; 
  description: string;  
  prix: number;  
  quantiteEnStock: number;  
  dateAjout: string;  
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`; 

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getProductsPaginated(page: number, pageSize: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?page=${page}&pageSize=${pageSize}`);
  }
}