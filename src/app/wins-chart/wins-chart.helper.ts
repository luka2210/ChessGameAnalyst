import { ChessGameDto } from "api";
import { VdnBarChartComponent, VdnBarChartConfiguration } from "vdn-chart";
import { values } from 'lodash';

export namespace WinsChartHelper {
  export const InitBarChart = (barChart: VdnBarChartComponent, allGames: ChessGameDto[]): void => {
    const [whiteWins, blackWins] = _getWins(allGames);
    const data: VdnBarChartConfiguration.BarChartData = _getBarChartData(whiteWins, blackWins);
    const config: VdnBarChartConfiguration.BarChartConfiguration = _getBarChartConfig();
    barChart.initialize(data, config);
  }

  const _getBarChartData = (whiteWins: number, blackWins: number): VdnBarChartConfiguration.BarChartData => {
    let series: VdnBarChartConfiguration.BarChartSeries[] = [];
    let categories: string[] = ['White number of wins', 'Black number of wins'];
    let se = new VdnBarChartConfiguration.BarChartSeries('Wins distribution', [whiteWins, blackWins], values(_barChartColor), true);
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

  class _barChartColor {
    static BarPallete = {
        pastelOrange: '#FFC145',
        uclaBlue: '#5B5F97',
        raspberryViolet: '#8F2D56',
        azureBlue: '#0496FF',
        rubyRed: '#D81159',
        goldenrod: '#D5A021',
        auqamarine: '#68EDC6',
        golderBrown: '#99621E',
        mughalGreen: '#2C5530',
        deepTurquoise: '#0D5C63',
        tiffanyBlue: '#03B5AA',
        mayaBlue: '#56CBF9',
        darkSiena: '#3C1518',
        malachiteGreen: '#61E786',
        carmineRed: '#8B2635',
        wenge: '#63595C',
        spaceGrey: '#404E4D'
    }

    constructor() {}
 }
}
