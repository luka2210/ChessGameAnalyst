import { ChessGameDto } from "api";
import { DateTime } from "luxon";
import { VdnBarChartComponent, VdnBarChartConfiguration } from "vdn-chart";

export namespace YearsChartHelper {

  const secondary = getComputedStyle(document.documentElement).getPropertyValue('--bs-secondary')

  export const InitBarChart = (barChart: VdnBarChartComponent, allGames: ChessGameDto[]): void => {
    const numGamesPerYear = _getNumGamesPerYear(allGames);
    const data: VdnBarChartConfiguration.BarChartData = _getBarChartData(numGamesPerYear);
    const config: VdnBarChartConfiguration.BarChartConfiguration = _getBarChartConfig();
    barChart.initialize(data, config);
  }

  const _getBarChartData = (numGamesPerYear: {[key: number]: number}): VdnBarChartConfiguration.BarChartData => {
    let series: VdnBarChartConfiguration.BarChartSeries[] = [];
    let categories: string[] = Object.keys(numGamesPerYear);
    let se = new VdnBarChartConfiguration.BarChartSeries('Games ditribution per year', Object.values(numGamesPerYear), secondary, true);
    se.noLabel = false;
    series.push(se);
    return new VdnBarChartConfiguration.BarChartData(categories, series);
  }

  const _getNumGamesPerYear = (allGames: ChessGameDto[]): {[key: number]: number} => allGames.reduce<{[key: number]: number}>((dict, game) => {
    game.date = game.date.replaceAll("??", "01");
    const year = _chessDateToDate(game.date).getFullYear();
    if (Object.keys(dict).includes(year.toString()))
      dict[year] = dict[year] + 1;
    else
      dict[year] = 1;
    return dict;
  }, {});

  const _getBarChartConfig = (): VdnBarChartConfiguration.BarChartConfiguration => {
    let config = new VdnBarChartConfiguration.BarChartConfiguration();
    config.minLabelsLevel = 0;
    config.labelRarefaction = { ticks: true, gridlines: true, skip: 10};
    config.categoryRarefaction = 4;
    return config;
  }

  const _chessDateToDate = (date: string): Date => DateTime.fromFormat(date, 'yyyy.MM.dd').toJSDate()

}
