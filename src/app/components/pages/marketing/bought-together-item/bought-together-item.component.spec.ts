import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoughtTogetherItemComponent } from './bought-together-item.component';

describe('BoughtTogetherItemComponent', () => {
  let component: BoughtTogetherItemComponent;
  let fixture: ComponentFixture<BoughtTogetherItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoughtTogetherItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoughtTogetherItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
