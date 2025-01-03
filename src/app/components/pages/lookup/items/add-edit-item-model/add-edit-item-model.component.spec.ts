import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditItemModelComponent } from './add-edit-item-model.component';

describe('AddEditItemModelComponent', () => {
  let component: AddEditItemModelComponent;
  let fixture: ComponentFixture<AddEditItemModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditItemModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditItemModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
