import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class ProductEditComponent implements OnInit {
  productForm!: FormGroup;
  id!: string;
  isLoading = true;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      price: new FormControl(0, [Validators.required, Validators.min(0)]),
      desc: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
    });

    this.id = this.route.snapshot.params['id'];
    this.productService.getProductDetail(this.id).subscribe(
      (product: Product) => {
        this.productForm.patchValue({
          name: product.name,
          category: product.category,
          price: product.price,
          desc: product.desc,
          image: product.image,
        });
        this.isLoading = false; 
      },
      (error) => {
        console.error('Error fetching product details:', error);
        this.isLoading = false;
        alert('Không thể lấy thông tin sản phẩm!');
        this.router.navigate(['/admin/product-list']);
      }
    );
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.productService.updateProduct(this.id, this.productForm.value).subscribe(
        () => {
          alert('Sản phẩm đã được cập nhật!');
          this.router.navigate(['/admin/product-list']);
        },
        (error) => {
          console.error('Error updating product:', error);
          alert('Cập nhật sản phẩm thất bại!');
        }
      );
    } else {
      alert('Vui lòng kiểm tra lại thông tin sản phẩm!');
    }
  }
}
