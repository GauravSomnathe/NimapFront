import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Fixes *ngFor and *ngIf
import { FormsModule } from '@angular/forms';   // Fixes the NG8002 (ngModel) error

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.html',
  styleUrls: ['./product.css']
})
export class ProductComponent {
  // Form Models
  productName: string = '';
  categoryId: number | null = null;
  newCategoryName: string = '';

  // Pagination Settings
  page: number = 1;
  pageSize: number = 5;

  // Initial Data
  categories: any[] = [
    { category_id: 1, category_name: 'Electronics' },
    { category_id: 2, category_name: 'Clothing' },
    { category_id: 3, category_name: 'Books' }
  ];

  products: any[] = [];

  // Logic: Add a new category to the dropdown
  addCategory() {
    if (!this.newCategoryName.trim()) return;

    const exists = this.categories.some(
      (cat) => cat.category_name.toLowerCase() === this.newCategoryName.trim().toLowerCase()
    );

    if (exists) {
      alert('This category already exists!');
      return;
    }

    const newCat = {
      category_id: this.categories.length + 1,
      category_name: this.newCategoryName.trim()
    };

    this.categories.push(newCat);
    this.categoryId = newCat.category_id; // Auto-select for the user
    this.newCategoryName = ''; // Reset input
  }

  // Logic: Add product to the list
  addProduct() {
    if (!this.productName.trim() || this.categoryId === null) return;

    const selectedCategory = this.categories.find(cat => cat.category_id == this.categoryId);

    this.products.unshift({
      product_id: this.products.length + 1,
      product_name: this.productName,
      category_name: selectedCategory?.category_name,
      category_id: Number(this.categoryId)
    });

    // Reset Form
    this.productName = '';
    this.categoryId = null;
  }

  // Client-side pagination helper (for local demo)
  get pagedProducts() {
    const startIndex = (this.page - 1) * this.pageSize;
    return this.products.slice(startIndex, startIndex + this.pageSize);
  }

  // Pagination Controls
  prev() {
    if (this.page > 1) this.page--;
  }

  next() {
    if (this.products.length > this.page * this.pageSize) {
      this.page++;
    }
  }
}