import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { Item } from '../../../../core/models/lookup/item';
import { AddEditItemModelComponent } from './add-edit-item-model/add-edit-item-model.component';
import { MaterialModule } from '../../../../core/shared/material/material.module';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ItemService } from '../../../../core/services/pagesService/lookup/item/item.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GalleriaModule } from 'primeng/galleria';
import { Image } from 'primeng/image';

@Component({
  selector: 'app-items',
  imports: [MaterialModule, CurrencyPipe, CommonModule, GalleriaModule, Image],
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent {
  items: Item[] = [];
  dataSource = new MatTableDataSource<Item>();
  displayedColumns: string[] = ['position', 'name', 'image', 'price', 'category', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isLoading:boolean = true;

  constructor(
    private itemService: ItemService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.isLoading = true;
    
    this.itemService.getItems().subscribe({
      next: (items: any) => {
        this.items = items.data;
        this.dataSource = new MatTableDataSource(items.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.error("Error loading items:", error);
      },
      complete: () => {
        this.isLoading = false; 
      }
    });
  }

  openAddItemDialog(element: any): void {
    const dialogRef = this.dialog.open(AddEditItemModelComponent, {
      width: '800px',
      data: element == 'add' ? null : element, // Pass null for add functionality
      position: { top: '40px' },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadItems(); // Reload items after adding
      }
    });
  }

  deleteItem(id: string): void {
    this.itemService.deleteItem(id).subscribe((response: any) => {
      this.toastr.error(response.message)
      this.loadItems();
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
