import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; 
import { Product } from '../../Models/product';
import { ProductService } from '../../Services/product.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Route, Router, RouterModule } from '@angular/router';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-create',
  imports: [ReactiveFormsModule,
    CommonModule,
    NgIf,
    MatTableModule,  
    MatSortModule,
    RouterModule
  ],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent {

  productForm: FormGroup; 
  loading: boolean = false; 
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private productService: ProductService, 
    private router: Router, private snackBar: MatSnackBar

  ) {
  
    this.productForm = this.fb.group({
      nom: ['', Validators.required], 
      description: ['', Validators.required], 
      prix: ['', [Validators.required, Validators.min(0)]], 
      quantiteEnStock: ['', [Validators.required, Validators.min(0)]], 
      dateAjout: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      return; 
    }

    const productData: Product = this.productForm.value; 
    
    this.loading = true; 

    this.productService.createProduct(productData).subscribe(
      (response) => {
        this.loading = false;
        this.showNotification('Produit ajouté avec succès !', 'success');
        this.router.navigate(['']);
      },
      (error) => {
        this.loading = false;
        this.showNotification('Erreur lors de la modification du produit.', 'error');
      }
    );
  }

  private showNotification(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Fermer', {
      duration: 4000,
      panelClass: type === 'success' ? 'snack-success' : 'snack-error'
    });
  }
}
