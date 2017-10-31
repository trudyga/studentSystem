import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffairsComponent } from './affairs.component';

describe('AffairsComponent', () => {
  let component: AffairsComponent;
  let fixture: ComponentFixture<AffairsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffairsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
