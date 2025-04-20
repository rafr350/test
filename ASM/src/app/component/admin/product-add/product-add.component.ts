import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { Category } from '../../../models/category';

@Component({
  selector: 'app-product-add',
  standalone: true,
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
})
export class ProductAddComponent implements OnInit {
  categories!: Category[];
  productForm!: FormGroup;

  constructor(private categoryService: CategoryService, private productService: ProductService) {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data as Category[];
    });

    this.productForm = new FormGroup({
      'name': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'category': new FormControl('', [Validators.required]),
      'price': new FormControl('', [Validators.required]),
      'image': new FormControl('', [Validators.required]),
      'desc': new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.productForm.invalid) {
      alert('Dữ liệu không hợp lệ');
    } else {
      this.productService.addProduct(this.productForm.value).subscribe(data => {
        location.assign('/admin/product-list');
      });
    }
  }
}
