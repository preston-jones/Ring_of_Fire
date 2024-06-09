import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCardInfoComponent } from './dialog-card-info.component';

describe('DialogCardInfoComponent', () => {
  let component: DialogCardInfoComponent;
  let fixture: ComponentFixture<DialogCardInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCardInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogCardInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
