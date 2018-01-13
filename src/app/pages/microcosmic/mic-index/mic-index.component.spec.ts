import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicIndexComponent } from './mic-index.component';

describe('MicIndexComponent', () => {
  let component: MicIndexComponent;
  let fixture: ComponentFixture<MicIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
