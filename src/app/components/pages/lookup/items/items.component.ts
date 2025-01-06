import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { Item } from '../../../../core/models/lookup/item';
import { AddEditItemModelComponent } from './add-edit-item-model/add-edit-item-model.component';
import { MaterialModule } from '../../../../core/shared/material/material.module';
import { CurrencyPipe } from '@angular/common';
import { ItemService } from '../../../../core/services/pagesService/lookup/item/item.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-items',
  imports: [MaterialModule, CurrencyPipe],
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent {
  items: Item[] = [];
  dataSource = new MatTableDataSource<Item>();
  displayedColumns: string[] = ['position', 'name', 'price', 'category', 'actions'];

  constructor(
    private itemService: ItemService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.itemService.getItems().subscribe((items) => {
      this.items = items;
      this.dataSource.data = this.items; // Bind to Material Table
    });
  }

  openAddItemDialog(element: any): void {
    const dialogRef = this.dialog.open(AddEditItemModelComponent, {
      width: '600px',
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
    this.itemService.deleteItem(id).subscribe(() => {
      this.items = this.items.filter((item) => item._id !== id);
      this.dataSource.data = this.items; // Update dataSource
      this.toastr.error("Item Deleted Successfully")
    });
  }
}
