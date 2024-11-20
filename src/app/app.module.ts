import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProductListComponent } from './Pages/product-list/product-list.component';
import { ProductService } from './Services/product.service';
import { RouterModule } from '@angular/router'; 
import { routes } from './app.routes';
/*
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes), // Utiliser uniquement forRoot avec vos routes
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
*/