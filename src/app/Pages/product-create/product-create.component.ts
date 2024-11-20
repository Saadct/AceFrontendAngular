import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; 
import { Product } from '../../Models/product';
import { ProductService } from '../../Services/product.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Route, Router, RouterModule } from '@angular/router';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

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
    private router: Router
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
        this.successMessage = 'Produit créé avec succès !';
        this.errorMessage = '';
        this.productForm.reset();
        this.router.navigate(['']);
      },
      (error) => {
        this.loading = false;
        this.successMessage = '';
        this.errorMessage = 'Erreur lors de la création du produit : ' + error.message;
      }
    );
  }
}
