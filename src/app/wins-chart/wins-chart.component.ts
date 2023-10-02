import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { VdnBarChartComponent } from 'vdn-chart';
import { Subscription } from 'rxjs';
import { WinsChartHelper } from './wins-chart.helper';

@Component({
  selector: 'app-wins-chart',
  templateUrl: './wins-chart.component.html',
  styleUrls: ['./wins-chart.component.scss']
})
export class WinsChartComponent {
  @ViewChild('winsChart') chart: VdnBarChartComponent;

  @Output() totalNumGames: EventEmitter<number> = new EventEmitter<number>();

  $allGamesSubscription: Subscription;

  constructor(private dataService: DataService) {}

  ngAfterViewInit() {
    this.$allGamesSubscription = this.dataService.getAllGames().subscribe({
      next: content => {
        WinsChartHelper.InitBarChart(this.chart, content);
        this.totalNumGames.emit(content.length)
      },
      error: err => {
        console.log(err);
      }
    });
  }

  ngOnDestroy() {
    this.$allGamesSubscription.unsubscribe();
  }
}
