import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../../core/shared/material/material.module';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Category } from '../../../../core/models/lookup/category';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from '../../../../core/services/pagesService/lookup/category/category.service';
import { AddeditcategoryComponent } from './addeditcategory/addeditcategory.component';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Image } from 'primeng/image';
@Component({
  selector: 'app-categories',
  imports: [MaterialModule, CommonModule, Image],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  category: Category[] = [];
  dataSource = new MatTableDataSource<Category>();
  displayedColumns: string[] = ['position', 'name', 'image', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private categoryervice: CategoryService,
    private toastr: ToastrService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadcategory();
  }

  loadcategory(): void {
    this.categoryervice.getCategories().subscribe((category: any) => {
      this.category = category.data;
      this.dataSource = new MatTableDataSource(category.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
    this.categoryervice.deleteCategory(id).subscribe((response:any) => {
      this.loadcategory();
      this.toastr.error(response.message);
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
