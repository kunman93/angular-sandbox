import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionIconSvgComponent } from './reaction-icon-svg.component';

describe('ReactionIconSvgComponent', () => {
  let component: ReactionIconSvgComponent;
  let fixture: ComponentFixture<ReactionIconSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReactionIconSvgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactionIconSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
