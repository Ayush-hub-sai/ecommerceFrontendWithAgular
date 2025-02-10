import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../../core/shared/material/material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StocksService } from '../../../../core/services/pagesService/lookup/stock/stocks.service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { Stock } from '../../../../core/models/lookup/stock';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-stocks',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, FormsModule],
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
    this.loadStock();
    this.stockForm = this.fb.group({
      itemId: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]]
    });
  }

  addStock() {
    if (this.stockForm.invalid) return;

    this.isLoading = true;
    this.stockService.addStock(this.stockForm.value.itemId, this.stockForm.value.quantity).subscribe({
      next: () => {
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
      next: () => {
        alert('Stock Reduced Successfully!');
        this.loadStock();
      },
      error: (err) => alert(err.error.message)
    });
  }

  setOutOfStock(itemId: string) {
    if (!confirm(`Mark Item ID: ${itemId} as Out of Stock?`)) return;

    this.stockService.setOutOfStock(itemId).subscribe({
      next: () => {
        alert('Item marked as Out of Stock!');
        this.loadStock();
      },
      error: (err) => alert(err.error.message)
    });
  }

  loadStock() {
    this.isLoading = true;
    this.stockService.getAllStocks().subscribe({
      next: (stocks: any) => {
        this.stockData = stocks.data.map((stock:any) => ({
          ...stock,
          newQuantity: stock.quantity 
        }));
        this.dataSource = new MatTableDataSource(this.stockData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => console.error("Error loading stocks:", error),
      complete: () => this.isLoading = false
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateQuantity(element: any) {
    if (element.newQuantity !== element.quantity) {
      const updatedData = {
        itemId: element.item.id,
        newQuantity: element.newQuantity
      };

      // this.stockService.updateStockQuantity(updatedData).subscribe({
      //   next: () => {
      //     console.log('Stock updated successfully');
      //     element.quantity = element.newQuantity; // Update UI after API success
      //   },
      //   error: (error) => {
      //     console.error('Error updating stock:', error);
      //   }
      // });
    }
  }

  onQuantityChange(element: any) {
    console.log(element);
    
    // if (element.newQuantity < 0) {
    //   element.newQuantity = 0; // Prevent negative values
    // } else if (element.newQuantity > 9999) {
    //   element.newQuantity = 9999; // Set max limit
    // }
  }
}
