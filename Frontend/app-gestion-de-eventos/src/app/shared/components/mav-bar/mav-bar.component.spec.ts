import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MavBarComponent } from './mav-bar.component';

describe('MavBarComponent', () => {
  let component: MavBarComponent;
  let fixture: ComponentFixture<MavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MavBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
