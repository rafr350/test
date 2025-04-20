import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [RouterModule, CommonModule] // Phải import RouterModule để dùng Router và CommonModule để dùng các chỉ thị ngFor
})
export class ProductsComponent implements OnInit {
  products!: Product[];

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    // Sử dụng route.queryParams là một Observable
    this.route.queryParams.subscribe(params => {
      this.productService.getProductByQuery(params).subscribe(data => {
        this.products = data as Product[];
        console.log(this.products);
      })
    })
  }

}
