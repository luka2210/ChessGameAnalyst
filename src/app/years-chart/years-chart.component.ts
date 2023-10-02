import { Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { VdnBarChartComponent } from 'vdn-chart';
import { DataService } from '../services/data.service';
import { YearsChartHelper } from './years-chart.helper';

@Component({
  selector: 'app-years-chart',
  templateUrl: './years-chart.component.html',
  styleUrls: ['./years-chart.component.scss']
})
export class YearsChartComponent {
  @ViewChild('yearsChart') chart: VdnBarChartComponent;

  $allGamesSubscription: Subscription;

  constructor(private dataService: DataService) {}

  ngAfterViewInit() {
    this.$allGamesSubscription = this.dataService.getAllGames().subscribe({
      next: content => {
        YearsChartHelper.InitBarChart(this.chart, content);
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
