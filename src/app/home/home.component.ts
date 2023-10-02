import { Component, ViewChild } from '@angular/core';
import { VdnChartComponent, VdnChartConfiguration } from 'vdn-chart';
import { DataService } from '../services/data.service';
import { SeriesHelper } from './series.helper';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TableModalComponent } from '../table-modal/table-modal.component';
import { ChessGameDto } from 'api';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('performance') chart: VdnChartComponent;

  $relevantPlayers: Subscription;
  $games: Subscription;

  chessGames: ChessGameDto[] = [];
  playersLastName: string[] = [];
  lastName:string = '';

  private _totalGames: number = 0;
  public get totalGames(): number {
    return this._totalGames;
  }
  public set totalGames(value: number) {
    this._totalGames = value;
  }

  constructor(private data: DataService, private modalService: NgbModal) {}

  ngOnInit() {}
  ngAfterViewInit() {
    this.displayData();
  }

  displayData() {
    this.$relevantPlayers = this.data.getRelevantPlayers().subscribe({
      next: content => {
        console.log(this.lastName);
        this.playersLastName = content;

        if (this.lastName == '') {
          this.lastName = this.playersLastName[0];
        }

        this.$games = this.data.getGamesByLastName(this.lastName).subscribe({
          next: content => {
            this.chessGames = content;
            const initChartSeries = SeriesHelper.GamesToChartSeries(content, this.lastName);
            const globalChart = new VdnChartConfiguration.GlobalChart();
            globalChart.contextMapVisible = false;
            globalChart.legendConfig = {location: "External", position: "TopMiddle"};
            this.chart.initialize(globalChart, initChartSeries)
          },
          error: err => console.error(err)
        });
      }
    });
  }

  openTableModal() {
    const modal = this.modalService.open(TableModalComponent);
    modal.componentInstance.inputData = [this.chessGames, this.lastName]
  }

  ngOnDestroy() {
    this.$relevantPlayers?.unsubscribe();
    this.$games?.unsubscribe();
  }

}
