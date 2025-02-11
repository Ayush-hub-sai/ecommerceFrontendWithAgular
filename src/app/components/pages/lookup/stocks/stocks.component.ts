import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../../core/shared/material/material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StocksService } from '../../../../core/services/pagesService/lookup/stock/stocks.service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { Stock } from '../../../../core/models/lookup/stock';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-stocks',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.scss'
})
export class StocksComponent implements OnInit, AfterViewInit {
  stockForm!: FormGroup;
  stockData: any[] = [];
  dataSource = new MatTableDataSource<Stock>();
  displayedColumns: string[] = ['position', 'itemName', 'stockQuantity', 'isOutofStocks', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isLoading = false;

  constructor(
    private stockService: StocksService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadStock();
    this.stockForm = this.fb.group({
      itemId: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]]
    });
  }
  
  loadStock() {
    this.isLoading = true;
    this.stockService.getAllStocks().subscribe({
      next: (stocks: any) => {
        this.stockData = stocks.data.map((stock: Stock) => ({
          ...stock,
          newQuantity: stock.quantity
        }));
        this.dataSource.data = this.stockData;
      },
      error: (error) => console.error("Error loading stocks:", error),
      complete: () => this.isLoading = false
    });
  }

  sortByItemName() {
    this.stockData.sort((a, b) => a.item.name.localeCompare(b.item.name));
    console.log(this.stockData);
  }

  updateQuantity(element: any) {
    if (element.newQuantity !== element.quantity) {
      this.stockService.updateStock(element.item._id, element.newQuantity).subscribe({
        next: (res: any) => {
          this.toastr.success(res.message)
          this.loadStock();
        },
        error: (error) => {
          this.toastr.error(error.message)
        }
      });
    }
  }

  setOutOfStock(element: any) {
    if (!confirm(`Mark Item ID: ${element.item.name} as Out of Stock?`)) return;

    this.stockService.setOutOfStock(element.item._id).subscribe({
      next: (res: any) => {
        alert('Item marked as Out of Stock!');
        this.toastr.success(res.message)
        this.loadStock();
      },
      error: (err) => alert(err.error.message)
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Custom sorting for nested property (item.name)
    this.dataSource.sortingDataAccessor = (item: any, property) => {
      switch (property) {
        case 'name': return item?.item?.name.toLowerCase();
        default: return item[property];
      }
    };

    // Set custom filter predicate
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.item.name.toLowerCase().includes(filter);
    };
    
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

}
