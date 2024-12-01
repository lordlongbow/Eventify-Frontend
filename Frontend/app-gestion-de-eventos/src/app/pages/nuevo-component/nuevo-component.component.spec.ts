import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoComponentComponent } from './nuevo-component.component';

describe('NuevoComponentComponent', () => {
  let component: NuevoComponentComponent;
  let fixture: ComponentFixture<NuevoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
