import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerbalIconSvgComponent } from './verbal-icon-svg.component';

describe('VerbalIconSvgComponent', () => {
  let component: VerbalIconSvgComponent;
  let fixture: ComponentFixture<VerbalIconSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerbalIconSvgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerbalIconSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
