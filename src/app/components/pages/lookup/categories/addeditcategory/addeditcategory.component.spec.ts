import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditcategoryComponent } from './addeditcategory.component';

describe('AddeditcategoryComponent', () => {
  let component: AddeditcategoryComponent;
  let fixture: ComponentFixture<AddeditcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddeditcategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddeditcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
