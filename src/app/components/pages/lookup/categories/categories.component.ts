import { Component } from '@angular/core';
import { MaterialModule } from '../../../../core/shared/material/material.module';
import { CurrencyPipe } from '@angular/common';
import { Category } from '../../../../core/models/lookup/category';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from '../../../../core/services/pagesService/lookup/category/category.service';
import { AddeditcategoryComponent } from './addeditcategory/addeditcategory.component';

@Component({
  selector: 'app-categories',
  imports: [MaterialModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  category: Category[] = [];
  dataSource = new MatTableDataSource<Category>();
  displayedColumns: string[] = ['position', 'name', 'actions'];

  constructor(private categoryervice: CategoryService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadcategory();
  }

  loadcategory(): void {
    this.categoryervice.getCategories().subscribe((category:any) => {
      this.category = category;
      this.dataSource.data = this.category; // Bind to Material Table
    });
  }

  openAddCategoryDialog(element: any): void {
    const dialogRef = this.dialog.open(AddeditcategoryComponent, {
      width: '600px',
      data: element == 'add' ? null : element,
      position: { top: '40px' },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadcategory(); 
      }
    });
  }

  deleteCategory(id: string): void {
    this.categoryervice.deleteCategory(id).subscribe(() => {
      this.category = this.category.filter((categoryData) => categoryData._id !== id);
      this.dataSource.data = this.category; 
    });
  }
}
