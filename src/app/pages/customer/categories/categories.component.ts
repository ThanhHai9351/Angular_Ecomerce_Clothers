import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { APIResponse, ICategory } from '@app/core/model/model';
import { CategoryService } from '@app/core/services/category.service';

@Component({
  selector: 'app-categories',
  imports: [NgFor],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  categories: ICategory[] = []
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe((res:APIResponse<ICategory[]>)=>{
      if(res.status ===200)
      {
        this.categories = res.data as ICategory[];
        console.log(res.data);
      }
    })
  }
}
