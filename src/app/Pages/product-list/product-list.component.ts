import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../Models/product';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table'; 
import { MatSortModule } from '@angular/material/sort'; 
import { CommonModule } from '@angular/common'; 
import { Router, RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';  

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,  
    HttpClientModule,  
    MatTableModule,  
    MatSortModule,
    RouterModule,
    MatIconModule,
    MatPaginatorModule
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

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;


  constructor(private productService: ProductService, private router : Router, private snackBar: MatSnackBar) {}

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
             },
        error: (err) => {
          this.error = 'Erreur lors du chargement des produits';
          this.loading = false;
          this.showNotification(this.error, 'error')
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
          this.showNotification('Produit supprimé avec succées !', 'success')
        },
        (error) => {
          this.showNotification('Erreur lors de la suppression du produit !', 'error');
        }
      );
    }
  }

  private showNotification(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Fermer', {
      duration: 4000,
      panelClass: type === 'success' ? 'snack-success' : 'snack-error'
    });
  }
}