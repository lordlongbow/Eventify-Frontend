import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiPerfilComponentComponent } from './mi-perfil-component.component';

describe('MiPerfilComponentComponent', () => {
  let component: MiPerfilComponentComponent;
  let fixture: ComponentFixture<MiPerfilComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiPerfilComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiPerfilComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
