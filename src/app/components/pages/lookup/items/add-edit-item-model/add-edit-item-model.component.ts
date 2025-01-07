import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../../../core/shared/material/material.module';
import { CommonModule } from '@angular/common';
import { ItemService } from '../../../../../core/services/pagesService/lookup/item/item.service';
import { Category } from '../../../../../core/models/lookup/category';
import { CategoryService } from '../../../../../core/services/pagesService/lookup/category/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-item-model',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-edit-item-model.component.html',
  styleUrl: './add-edit-item-model.component.scss'
})
export class AddEditItemModelComponent implements OnInit {
  itemForm: FormGroup;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<AddEditItemModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.itemForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      category: [data?.category?._id || '', Validators.required],
      price: [data?.price || null, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.loadcategory();
  }

  loadcategory(): void {
    this.categoryService.getCategories().subscribe((category: any) => {
      this.categories = category.data;

    });
  }

  save(): void {
    if (this.itemForm.valid) {
      let itemName = this.itemForm.value.name;
      itemName = itemName.charAt(0).toUpperCase() + itemName.slice(1);
      this.itemForm.patchValue({
        name: itemName
      })

      if (this.data?._id) {
        // Edit item
        this.itemService.updateItem(this.data._id, this.itemForm.value).subscribe((response:any) => {
          this.toastr.success(response.message);
          this.dialogRef.close(true);
        });
      } else {
        // Add new item
        this.itemService.addItem(this.itemForm.value).subscribe((response:any) => {
          this.toastr.success(response?.message);
          this.dialogRef.close(true);
        });
      }
    }
  }

}
