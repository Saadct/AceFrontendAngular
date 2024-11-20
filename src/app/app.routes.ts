import { Routes } from '@angular/router';
import { ProductListComponent } from './Pages/product-list/product-list.component';
import { ProductCreateComponent } from './Pages/product-create/product-create.component';
import { ProductEditComponent } from './Pages/product-edit/product-edit.component';

export const routes: Routes = [
    {
        //path: 'product-list', 
        path: '', 
        component: ProductListComponent, 
      },
      {
        path: 'product-create', 
        component: ProductCreateComponent, 
      },
      { path: 'product-edit/:id', 
      component: ProductEditComponent
      },

];
