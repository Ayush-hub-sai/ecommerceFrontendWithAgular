import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemService } from '../../../../../core/services/pagesService/item/item.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../../../core/shared/material/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-edit-item-model',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-edit-item-model.component.html',
  styleUrl: './add-edit-item-model.component.scss'
})
export class AddEditItemModelComponent {
  itemForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private dialogRef: MatDialogRef<AddEditItemModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.itemForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      price: [data?.price || null, [Validators.required, Validators.min(0)]],
    });
  }

  save(): void {
    if (this.itemForm.valid) {
      if (this.data?._id) {
        // Edit item
        this.itemService.updateItem(this.data._id, this.itemForm.value).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        // Add new item
        this.itemService.addItem(this.itemForm.value).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }

  close(): void {
    this.dialogRef.close(false);
  }
}
