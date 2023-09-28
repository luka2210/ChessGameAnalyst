import { ChessGameDto } from "api";
import { DateTime } from "luxon";
import { VdnChartConfiguration } from "vdn-chart";

export namespace SeriesHelper {

  export const GamesToChartSeries = (games: ChessGameDto[], lastName: string): VdnChartConfiguration.InitChartSeries[] => {
    const gamesWon: ChessGameDto[] = [];
    const gamesLost: ChessGameDto[] = [];
    const gamesDraw: ChessGameDto[] = [];

    for (const game of games) {
      const isWhite = game.white.split(',')[0] == lastName;
      const result = game.result;

      if (result == "1-0") {
        if (isWhite) {
          gamesWon.push(game);
        }
        else {
          gamesLost.push(game);
        }
      }
      else if (result == "0-1") {
        if (isWhite) {
          gamesLost.push(game);
        }
        else {
          gamesWon.push(game);
        }
      }
      else {
        gamesDraw.push(game);
      }
    }
    const chartSeriesWon = new VdnChartConfiguration.InitChartSeries(_getSeriesConfig(300, "Games Won"), _getSeriesDataPoints(gamesWon));
    const chartSeriesLost = new VdnChartConfiguration.InitChartSeries(_getSeriesConfig(400, "Games Lost"), _getSeriesDataPoints(gamesLost));
    const chartSeriesDraw = new VdnChartConfiguration.InitChartSeries(_getSeriesConfig(500, "Games Draw"), _getSeriesDataPoints(gamesDraw));
    return [chartSeriesWon, chartSeriesLost, chartSeriesDraw];
  }

  const _getSeriesConfig = (id: number, name: string) => {
    const seriesChartConfig = new VdnChartConfiguration.SeriesChartConfig()
    seriesChartConfig.seriesInfo = <any>{ ID: id, DisplayName: name, Name: name, NoDataValue: -9999 };
    seriesChartConfig.seriesName = name;

    return seriesChartConfig;
  }

  const _getSeriesDataPoints = (games: ChessGameDto[]): VdnChartConfiguration.SeriesDataPoint[] => {
    const dataPoints: VdnChartConfiguration.SeriesDataPoint[] = []
    let index = 0;

    const yearsDict = _getYearsDict(games);
    //console.log(yearsDict);
    for (const key of Object.keys(yearsDict)) {
      const localDateTime = new Date(Number(key), 0, 1);
      const dataValue = yearsDict[key];
      const point = <VdnChartConfiguration.SeriesDataPoint> {id: index, LocalDateTime: localDateTime, DataValue: dataValue };
      dataPoints.push(point);
      index += 1;
    }

    return dataPoints;
  }

  const _getYearsDict = (games: ChessGameDto[]): {[key: string]: number} => {
    const dict: {[key: number]: [number, number]} = {}
    for (const game of games) {
      game.date = game.date.replaceAll("??", "01");
      const year = _chessDateToDate(game.date).getFullYear();
      const numOfMoves = _getNumberOfMoves(game.game);
      if (Object.keys(dict).includes(year.toString())) {
        const totalNumOfMoves = dict[year][0];
        const count = dict[year][1];
        dict[year] = [totalNumOfMoves + numOfMoves, count + 1];
      }
      else {
        if (!isNaN(year))
          dict[year] = [numOfMoves, 1];
      }
    }
    const yearDict: {[key: number]: number} = {};
    for (const key of Object.keys(dict)) {
      yearDict[key] = dict[key][0] / dict[key][1];
    }
    return yearDict;
  }

  const _chessDateToDate = (date: string): Date => DateTime.fromFormat(date, 'yyyy.MM.dd').toJSDate()

  const _getNumberOfMoves = (moves: string): number => {
    const numbers = moves.match(/\d+/g).map(Number)
    return Math.max(...numbers);
  }
}
