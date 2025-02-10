import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../../core/shared/material/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StocksService } from '../../../../core/services/pagesService/lookup/stock/stocks.service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { Stock } from '../../../../core/models/lookup/stock';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-stocks',
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.scss'
})
export class StocksComponent {
  stockForm!: FormGroup;
  stockData: any[] = [];
  dataSource = new MatTableDataSource<Stock>();
  displayedColumns: string[] = ['position', 'itemName', 'stockQuantity', 'isOutofStocks', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isLoading = false;

  constructor(private stockService: StocksService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadStock()
    this.stockForm = this.fb.group({
      itemId: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]]
    });
  }

  addStock() {
    if (this.stockForm.invalid) return;

    this.isLoading = true;
    this.stockService.addStock(this.stockForm.value.itemId, this.stockForm.value.quantity).subscribe({
      next: (res) => {
        alert('Stock Added Successfully!');
        this.loadStock();
      },
      error: (err) => alert(err.error.message),
      complete: () => (this.isLoading = false)
    });
  }

  reduceStock(itemId: string, quantity: number) {
    if (!confirm(`Reduce stock of Item ID: ${itemId} by ${quantity}?`)) return;

    this.stockService.reduceStock(itemId, quantity).subscribe({
      next: (res) => {
        alert('Stock Reduced Successfully!');
        this.loadStock();
      },
      error: (err) => alert(err.error.message)
    });
  }

  setOutOfStock(itemId: string) {
    if (!confirm(`Mark Item ID: ${itemId} as Out of Stock?`)) return;

    this.stockService.setOutOfStock(itemId).subscribe({
      next: (res) => {
        alert('Item marked as Out of Stock!');
        this.loadStock();
      },
      error: (err) => alert(err.error.message)
    });
  }

  loadStock() {
    this.stockData = [];
    this.isLoading = true;
    this.stockService.getAllStocks().subscribe({
      next: (stocks: any) => {
        this.stockData = stocks.data;
        this.dataSource = new MatTableDataSource(stocks.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if (this.stockData.length > 0) {
          // this.deleteStocksInBatch(this.stockData); // Delete up to 800 stocks
        }
      },
      error: (error) => {
        console.error("Error loading items:", error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });


  }

  deleteStocksInBatch(stocks: any[]) {
    if (stocks.length === 0) return; // No stocks to delete

    let index = 0;

    const deleteNext = () => {
      if (index >= stocks.length) return; // Stop when all are deleted

      this.stockService.deleteStock(stocks[index]._id).subscribe({
        next: () => {
          console.log(`Deleted stock ID: ${stocks[index]._id}`);
          index++;
          deleteNext(); // Call next deletion
        },
        error: (error) => {
          console.error("Error deleting stock:", error);
          index++;
          deleteNext(); // Continue deleting even if one fails
        }
      });
    };

    deleteNext(); // Start deletion process
  }


  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openAddItemDialog(element: any): void { }

  deleteItem(id: string): void { }

}
