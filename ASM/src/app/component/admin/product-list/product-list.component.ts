import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [CommonModule, RouterModule, NgxPaginationModule],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isLoading = true;
  p: number = 1; 

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getAll().subscribe(
      (data) => {
        this.products = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading products:', error);
        this.isLoading = false;
      }
    );
  }

  onDelete(productId: string): void {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
      this.productService.deleteProduct(productId).subscribe(
        () => {
          alert('Sản phẩm đã được xóa!');
          this.loadProducts(); // Reload product list after deletion
        },
        (error) => {
          console.error('Error deleting product:', error);
        }
      );
    }
  }
}
