import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffairAddComponent } from './affair-add.component';

describe('AffairAddComponent', () => {
  let component: AffairAddComponent;
  let fixture: ComponentFixture<AffairAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffairAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffairAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
