import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../Models/product';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table'; 
import { MatSortModule } from '@angular/material/sort'; 
import { CommonModule } from '@angular/common'; 
import { Router, RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,  
    HttpClientModule,  
    MatTableModule,  
    MatSortModule,
    RouterModule,
    MatIconModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = false;
  error: string | null = null;
  displayedColumns: string[] = [ 'nom','desc', 'prix', 'qt', 'dateAjt', 'actions'];
  dataSource = this.products;

  constructor(private productService: ProductService, private router : Router) {}

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

  editProduct(id : string) {
    this.router.navigate(['product-edit', id]);
  }

  deleteProduct(id : string) {
    if (confirm('Voulez-vous vraiment supprimer ce produit ?')) {
      this.productService.deleteProduct(id).subscribe(
        () => {
          this.loadProducts();
        },
        (error) => {
          console.error('Erreur lors de la suppression du produit', error);
        }
      );
    }
  }
}