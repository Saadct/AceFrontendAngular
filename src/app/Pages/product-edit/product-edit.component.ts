import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../Models/product';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-product-edit',
  imports: [ReactiveFormsModule,
    CommonModule,
    CommonModule,
    NgIf,
    MatTableModule,  
    MatSortModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit {
  productId: string = "";
  product: Product = {} as Product;
  productForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  loading: boolean = false; 

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router : Router
  ) {
    this.productForm = this.fb.group({
      id: [''],
      nom: ['', Validators.required], 
      description: ['', Validators.required], 
      prix: ['', [Validators.required, Validators.min(0)]], 
      quantiteEnStock: ['', [Validators.required, Validators.min(0)]], 
      dateAjout: ['', Validators.required]
    });
  }



  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id') as string;
    console.log(this.productId);
    this.loadProductData();
    console.log(this.product);
  }

  private loadProductData(): void {
    this.loading = true;
    this.productService.getProductById(this.productId).subscribe(
      (data: Product) => {
        const formattedDate = data.dateAjout.split('T')[0];
        this.productForm.patchValue({
          id: this.productId,
          nom: data.nom,
          description: data.description,
          prix: data.prix,
          quantiteEnStock: data.quantiteEnStock,
          dateAjout: formattedDate
        });
        this.loading = false;
      },
      (error) => {
        this.errorMessage = "Erreur lors du chargement du produit.";
        this.loading = false;
      }
    );
  }


  onSubmit(): void {
    if (this.productForm.valid) {
      const updatedProduct: Product = {
        ...this.product,
        ...this.productForm.value
      };

      this.productService.updateProduct(this.productId, updatedProduct).subscribe(
        (response) => {
          console.log('Produit mis à jour avec succès', response);
          alert('Produit mis à jour avec succès !');
          this.router.navigate(['']);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du produit', error);
          alert('Erreur lors de la mise à jour du produit. Veuillez réessayer.');
        }
      );
    } else {
      alert('Le formulaire contient des erreurs. Veuillez vérifier les champs.');
    }
  }
}
