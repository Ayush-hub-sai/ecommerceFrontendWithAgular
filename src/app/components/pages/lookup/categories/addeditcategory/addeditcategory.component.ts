import { Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../../core/shared/material/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../../../core/services/pagesService/lookup/category/category.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addeditcategory',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './addeditcategory.component.html',
  styleUrl: './addeditcategory.component.scss'
})
export class AddeditcategoryComponent implements OnInit {
  categoryForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<AddeditcategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
  }

  ngOnInit(): void {
    this.loadCategory()
  }

  loadCategory(){
    console.log(this.data);
    this.categoryForm = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      image: [this.data?.image ||'', Validators.required]
    });
  }

  save(): void {
    if (this.categoryForm.valid) {
      let categoryName = this.categoryForm.value.name;
      categoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
      this.categoryForm.patchValue({ name: categoryName });

      if (this.data?._id) {
        // Edit category
        this.categoryService.updateCategory(this.data._id, this.categoryForm.value).subscribe((response:any) => {
          this.dialogRef.close(true);
          this.toastr.success(response.message)
        });
      } else {
        // Add new category
        this.categoryService.addCategory(this.categoryForm.value).subscribe((response:any) => {
          this.dialogRef.close(true);
          this.toastr.success(response.message)
        });
      }
    }
  }


}
