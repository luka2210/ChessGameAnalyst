import { Component, ViewChild } from '@angular/core';
import { VdnChartComponent, VdnChartConfiguration } from 'vdn-chart';
import { DataService } from '../services/data.service';
import { SeriesHelper } from './series.helper';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('performance') chart: VdnChartComponent;

  constructor(private data: DataService) {}

  ngOnInit() {}
  ngAfterViewInit() {
    const lastName = "Anand";
    this.data.getGamesByLastName(lastName).subscribe({
      next: content => {
        const initChartSeries = SeriesHelper.GamesToChartSeries(content, lastName);
        const globalChart = new VdnChartConfiguration.GlobalChart();
        globalChart.contextMapVisible = false;
        globalChart.legendConfig = {location: "External", position: "TopMiddle"};
        this.chart.initialize(globalChart, initChartSeries)
      },
      error: err => console.error(err)
    })
  }

}
