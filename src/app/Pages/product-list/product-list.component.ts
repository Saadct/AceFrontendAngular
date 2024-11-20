import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../Models/product';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table'; 
import { MatSortModule } from '@angular/material/sort'; 
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,  
    HttpClientModule,  
    MatTableModule,  
    MatSortModule,
    RouterModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = false;
  error: string | null = null;
  displayedColumns: string[] = [ 'nom','desc', 'prix', 'qt', 'dateAjt'];
  dataSource = this.products;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = null;

    this.productService.getProducts()
      .subscribe({
        next: (products) => {
          this.products = products;
          this.dataSource = this.products;
          this.loading = false;
          console.log(this.products);
        },
        error: (err) => {
          this.error = 'Erreur lors du chargement des produits';
          this.loading = false;
          console.error('Erreur:', err);
        },
        complete: () => {
          this.loading = false;
        }
      });
  }

  onPaginateChange(event: any): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.dataSource = this.products.slice(startIndex, endIndex);
  }
}
