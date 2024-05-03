import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloServerComponent } from './hello-server.component';

describe('HelloServerComponent', () => {
  let component: HelloServerComponent;
  let fixture: ComponentFixture<HelloServerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelloServerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HelloServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
