import { Component, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { VdnBarChartComponent } from 'vdn-chart';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WinsChartHelper } from './wins-chart.helper';

@Component({
  selector: 'app-wins-chart',
  templateUrl: './wins-chart.component.html',
  styleUrls: ['./wins-chart.component.scss']
})
export class WinsChartComponent {
  @ViewChild('winsChart') chart: VdnBarChartComponent;

  $allGamesSubscription: Subscription;

  constructor(private dataService: DataService) {}

  ngAfterViewInit() {
    this.$allGamesSubscription = this.dataService.getAllGames().subscribe({
      next: content => {
        WinsChartHelper.InitBarChart(this.chart, content);
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
