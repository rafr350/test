import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [RouterModule, CommonModule] // Import RouterModule để dùng Router và CommonModule để dùng các chỉ thị ngFor
})
export class HomeComponent implements OnInit {
  title = "Homepage";
  products!: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getAll().subscribe(data => {
      this.products = data as Product[];
      console.log(this.products);
    });
  }

  getTitle() {
    return this.title;
  }

  hello() {
    alert(`Hello ${this.title}`);
  }
}
