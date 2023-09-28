import { Component } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ChessGameAnalyst';
  constructor(private data: DataService) {}
  ngOnInit() {
    this.data.getRandomGame().subscribe({
      next: game => console.log(game),
      error: err => console.error(err)
    });
  }
}
