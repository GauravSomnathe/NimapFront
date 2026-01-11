import { Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category';
import { ProductComponent } from './components/product/product';

export const routes: Routes = [
  { path: '', redirectTo: 'categories', pathMatch: 'full' },
  { path: 'categories', component: CategoryComponent },
  { path: 'products', component: ProductComponent },
];
