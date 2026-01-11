import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  // State Management
  isEditing: boolean = false;
  editId: number | null = null;

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

  // Logic: Add a new category
  addCategory() {
    if (!this.newCategoryName.trim()) return;
    const exists = this.categories.some(c => c.category_name.toLowerCase() === this.newCategoryName.trim().toLowerCase());
    
    if (exists) {
      alert('Category exists!');
      return;
    }

    const newCat = { category_id: this.categories.length + 1, category_name: this.newCategoryName.trim() };
    this.categories.push(newCat);
    this.categoryId = newCat.category_id;
    this.newCategoryName = '';
  }

  // Logic: Save (Create or Update) Product
  saveProduct() {
    if (!this.productName.trim() || this.categoryId === null) return;
    const selectedCategory = this.categories.find(cat => cat.category_id == this.categoryId);

    if (this.isEditing && this.editId !== null) {
      // UPDATE Logic
      const index = this.products.findIndex(p => p.product_id === this.editId);
      if (index !== -1) {
        this.products[index] = {
          ...this.products[index],
          product_name: this.productName,
          category_id: Number(this.categoryId),
          category_name: selectedCategory?.category_name
        };
      }
      this.cancelEdit();
    } else {
      // CREATE Logic
      this.products.unshift({
        product_id: Date.now(), // Unique ID for local demo
        product_name: this.productName,
        category_name: selectedCategory?.category_name,
        category_id: Number(this.categoryId)
      });
      this.resetForm();
    }
  }

  // Logic: Delete Product
  deleteProduct(id: number) {
    if (confirm('Delete this product?')) {
      this.products = this.products.filter(p => p.product_id !== id);
      // Adjust page if current page becomes empty
      if (this.pagedProducts.length === 0 && this.page > 1) this.page--;
    }
  }

  // Logic: Enter Edit Mode
  startEdit(product: any) {
    this.isEditing = true;
    this.editId = product.product_id;
    this.productName = product.product_name;
    this.categoryId = product.category_id;
  }

  cancelEdit() {
    this.isEditing = false;
    this.editId = null;
    this.resetForm();
  }

  resetForm() {
    this.productName = '';
    this.categoryId = null;
  }

  // Pagination
  get pagedProducts() {
    const start = (this.page - 1) * this.pageSize;
    return this.products.slice(start, start + this.pageSize);
  }

  prev() { if (this.page > 1) this.page--; }
  next() { if (this.products.length > this.page * this.pageSize) this.page++; }
}