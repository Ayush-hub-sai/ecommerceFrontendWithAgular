import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../../../core/shared/material/material.module';
import { CommonModule } from '@angular/common';
import { ItemService } from '../../../../../core/services/pagesService/lookup/item/item.service';
import { Category } from '../../../../../core/models/lookup/category';
import { CategoryService } from '../../../../../core/services/pagesService/lookup/category/category.service';
import { ToastrService } from 'ngx-toastr';
import { Image } from 'primeng/image';

@Component({
  selector: 'app-add-edit-item-model',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule, Image],
  templateUrl: './add-edit-item-model.component.html',
  styleUrl: './add-edit-item-model.component.scss'
})
export class AddEditItemModelComponent implements OnInit {
  itemForm!: FormGroup;
  categories: Category[] = [];
  imageList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<AddEditItemModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit(): void {
    this.loadcategory();
    this.loadItem()
  }

  loadItem() {
    this.itemForm = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      category: [this.data?.category?._id || '', Validators.required],
      price: [this.data?.price || null, [Validators.required, Validators.min(0)]],
      image: ['', Validators.required]
    });
    
    if(this.data.image.length>0){
      this.data.image.forEach((img: any) => {
        this.imageList.push(img)
      });
      this.updateImageValidate();
    }
  }

  loadcategory(): void {
    this.categoryService.getCategories().subscribe((category: any) => {
      this.categories = category.data;
    });
  }

  increment() {
    const imageValue = this.itemForm.controls['image'].value;
    if (imageValue) {
      this.imageList.push(imageValue);
      this.itemForm.controls['image'].setValue('');
    }
    this.updateImageValidate();
  }

  decrement(index: number) {
    if (index > -1) {
      this.imageList.splice(index, 1);
    }
    this.updateImageValidate()
  }

  updateImageValidate() {
    if (this.imageList.length > 0) {
      this.itemForm.controls['image'].clearValidators();
    } else {
      this.itemForm.controls['image'].setValidators([Validators.required]);
    }
    this.itemForm.controls['image'].updateValueAndValidity();
  }

  save(): void {
    if (this.itemForm.valid) {
      let itemName = this.itemForm.value.name;
      itemName = itemName.charAt(0).toUpperCase() + itemName.slice(1);
      this.itemForm.patchValue({
        name: itemName,
        image: this.imageList
      });

      if (this.data?._id) {
        // Edit item
        this.itemService.updateItem(this.data._id, this.itemForm.value).subscribe((response: any) => {
          this.toastr.success(response.message);
          this.dialogRef.close(true);
        });
      } else {
        // Add new item
        this.itemService.addItem(this.itemForm.value).subscribe((response: any) => {
          this.toastr.success(response?.message);
          this.dialogRef.close(true);
        });
      }
    }
  }

}
