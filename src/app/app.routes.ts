import { Routes } from '@angular/router';
import { HomeComponent } from '@app/pages/customer/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'products', 
    loadComponent: () => import('./pages/customer/products/products.component').then(m => m.ProductsComponent)
  },
  { 
    path: 'categories', 
    loadComponent: () => import('./pages/customer/categories/categories.component').then(m => m.CategoriesComponent)
  },
  { 
    path: 'login', 
    loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent)
  },
  { 
    path: 'register', 
    loadComponent: () => import('./pages/auth/register/register.component').then(m => m.RegisterComponent)
  },
];
