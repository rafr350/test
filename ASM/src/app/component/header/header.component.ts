import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { AuthService } from '../../services/auth.service';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, NgxPaginationModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  keyword: string = '';
  categories!: Category[];
  isADM: any
  isLogin:  any

  constructor(private authService: AuthService, private categoryService: CategoryService, private router: Router) {
    this.isADM = authService.checkAdmin();
    this.isLogin = authService.checkLogin();
}

  ngOnInit() {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data as Category[];
      console.log(this.categories);
    });
  }

  onSearch() {
    if (this.keyword.trim().length > 3) {
      this.router.navigate(['products'], { queryParams: { 'keyword': this.keyword } });
    } else {
      this.keyword = '';
      alert('Hãy nhập ít nhất 3 ký tự');
    }
  }

  onLogout() {
    localStorage.clear()
    location.assign('/'); 
  }
}
