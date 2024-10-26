import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryIconSvgComponent } from './memory-icon-svg.component';

describe('MemoryIconSvgComponent', () => {
  let component: MemoryIconSvgComponent;
  let fixture: ComponentFixture<MemoryIconSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemoryIconSvgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemoryIconSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
