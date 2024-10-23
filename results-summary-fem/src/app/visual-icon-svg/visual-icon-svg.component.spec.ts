import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualIconSvgComponent } from './visual-icon-svg.component';

describe('VisualIconSvgComponent', () => {
  let component: VisualIconSvgComponent;
  let fixture: ComponentFixture<VisualIconSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisualIconSvgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualIconSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
