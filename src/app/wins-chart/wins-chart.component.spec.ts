import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinsChartComponent } from './wins-chart.component';

describe('WinsChartComponent', () => {
  let component: WinsChartComponent;
  let fixture: ComponentFixture<WinsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WinsChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WinsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
