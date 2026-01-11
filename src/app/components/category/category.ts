import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category';

@Component({
  standalone: true,
  selector: 'app-category',
  imports: [CommonModule, FormsModule],
  templateUrl: './category.html',
  styleUrls: ['./category.css']
})
export class CategoryComponent {
  categories: any[] = [];
  categoryName = '';
  editId: number | null = null;

  constructor(private service: CategoryService) {
    this.loadCategories();
  }

  loadCategories() {
    this.service.getAll().subscribe(res => this.categories = res);
  }

  saveCategory() {
    if (this.editId) {
      this.service.update(this.editId, this.categoryName).subscribe(() => {
        this.reset();
        this.loadCategories();
      });
    } else {
      this.service.create(this.categoryName).subscribe(() => {
        this.reset();
        this.loadCategories();
      });
    }
  }

  editCategory(c: any) {
    this.editId = c.category_id;
    this.categoryName = c.category_name;
  }

  deleteCategory(id: number) {
    this.service.delete(id).subscribe(() => this.loadCategories());
  }

  reset() {
    this.categoryName = '';
    this.editId = null;
  }
}
