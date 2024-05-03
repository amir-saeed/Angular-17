import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloClientComponent } from './hello-client.component';

describe('HelloClientComponent', () => {
  let component: HelloClientComponent;
  let fixture: ComponentFixture<HelloClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelloClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HelloClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
