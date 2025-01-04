import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CategoryService } from '@app/core/services/category.service';
import { APIResponse, ICategory } from '@app/core/model/model';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '@app/shared/avatar/avatar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule, RouterLink, RouterLinkActive, AvatarComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
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
      }
    })
  }
}
