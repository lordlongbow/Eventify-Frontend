import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisEventosComponentComponent } from './mis-eventos-component.component';

describe('MisEventosComponentComponent', () => {
  let component: MisEventosComponentComponent;
  let fixture: ComponentFixture<MisEventosComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisEventosComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisEventosComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
