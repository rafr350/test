import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone:true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports :[RouterOutlet, CommonModule, RouterModule]
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
