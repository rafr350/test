import { Routes, CanActivate } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { LoginComponent } from './component/login/login.component';
import { ProductsComponent } from './component/products/products.component';
import { DashboardComponent } from './component/admin/dashboard/dashboard.component';
import { CategoryListComponent } from './component/admin/category-list/category-list.component';
import { SendEmailComponent } from './component/send-email/send-email.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { CategoryAddComponent } from './component/admin/category-add/category-add.component';
import { CategoryEditComponent } from './component/admin/category-edit/category-edit.component';
import { ProductListComponent } from './component/admin/product-list/product-list.component';
import { ProductAddComponent } from './component/admin/product-add/product-add.component';
import { ProductEditComponent } from './component/admin/product-edit/product-edit.component';
import { AdminGuard } from './auth/admin-guard';


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'forgot-password', component: SendEmailComponent},
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  { path: 'admin', component: DashboardComponent, canActivate: [AdminGuard],
    children:[
       { path:'category-list', component: CategoryListComponent},
       { path:'category-add', component: CategoryAddComponent},
       { path:'category-edit/:id', component: CategoryEditComponent},
       { path:'product-list', component: ProductListComponent},
       { path:'product-add', component: ProductAddComponent},
       { path: 'product-edit/:id', component: ProductEditComponent},
    ]
  },
  { path: '**', redirectTo: '/home' }
];
