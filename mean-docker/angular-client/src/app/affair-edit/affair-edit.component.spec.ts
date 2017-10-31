import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffairEditComponent } from './affair-edit.component';

describe('AffairEditComponent', () => {
  let component: AffairEditComponent;
  let fixture: ComponentFixture<AffairEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffairEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffairEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
