import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisCertificadosComponentComponent } from './mis-certificados-component.component';

describe('MisCertificadosComponentComponent', () => {
  let component: MisCertificadosComponentComponent;
  let fixture: ComponentFixture<MisCertificadosComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisCertificadosComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisCertificadosComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
