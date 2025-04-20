import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';

@Component({
  selector: 'app-category-list',
  standalone: true,
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  imports: [CommonModule, RouterModule]
})
export class CategoryListComponent implements OnInit {
  categories!: Category[];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data as Category[];
    });
  }

  onDelete(id: string) {
    var result = confirm("Bạn có muốn xóa không?");
    if (result) {
      this.categoryService.delete(id).subscribe(() => {
        location.assign('/admin/category-list');
      });
    }
  }
}
