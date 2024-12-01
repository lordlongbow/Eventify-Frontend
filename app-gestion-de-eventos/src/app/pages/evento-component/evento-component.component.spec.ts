import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoComponentComponent } from './evento-component.component';

describe('EventoComponentComponent', () => {
  let component: EventoComponentComponent;
  let fixture: ComponentFixture<EventoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventoComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
