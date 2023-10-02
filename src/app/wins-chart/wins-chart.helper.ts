import { ChessGameDto } from "api";
import { VdnBarChartComponent, VdnBarChartConfiguration } from "vdn-chart";

export namespace WinsChartHelper {
  const secondary = getComputedStyle(document.documentElement).getPropertyValue('--bs-secondary')

  export const InitBarChart = (barChart: VdnBarChartComponent, allGames: ChessGameDto[]): void => {
    const [whiteWins, blackWins] = _getWins(allGames);
    const data: VdnBarChartConfiguration.BarChartData = _getBarChartData(whiteWins, blackWins);
    const config: VdnBarChartConfiguration.BarChartConfiguration = _getBarChartConfig();
    barChart.initialize(data, config);
  }

  const _getBarChartData = (whiteWins: number, blackWins: number): VdnBarChartConfiguration.BarChartData => {
    let series: VdnBarChartConfiguration.BarChartSeries[] = [];
    let categories: string[] = ['White wins', 'Black wins'];
    let se = new VdnBarChartConfiguration.BarChartSeries('Wins distribution', [whiteWins, blackWins], secondary, true);
    se.noLabel = false;
    series.push(se);
    return new VdnBarChartConfiguration.BarChartData(categories, series);
  }

  const _getBarChartConfig = (): VdnBarChartConfiguration.BarChartConfiguration => {
    let config = new VdnBarChartConfiguration.BarChartConfiguration();
    return config;
  }

  const _getWins = (allGames: ChessGameDto[]): [number, number] => {
    const whiteWins: number = _getNumWins(allGames, "1-0");
    const blackWins: number = _getNumWins(allGames, "0-1");
    return [whiteWins, blackWins];
  }

  const _getNumWins = (allGames: ChessGameDto[], targetString: string): number => allGames.reduce((count, game) => {
    if (game.game.includes(targetString))
      count += 1;
    return count;
  }, 0);

}
