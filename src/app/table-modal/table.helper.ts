import { ChessGameDto } from "api";
import { SeriesHelper } from "../home/series.helper";
import { VdnTableColumn } from "vdn-maui";
import { DateTime } from "luxon";
import { _isNumberValue } from "@angular/cdk/coercion";

export namespace TableHelper {
  export const ChessGamesToTableModel = (games: ChessGameDto[], lastName:string): [VdnTableColumn<any>[], TableRowModel[]] => {
    const [gamesWon, gamesLost, gamesDraw] = SeriesHelper.Split(games, lastName);
    const tableColumns: VdnTableColumn<any>[] = _getTableColumns();
    const tableRows: TableRowModel[] = _getTableRows(gamesWon, gamesLost, gamesDraw);
    return [tableColumns, tableRows];
  }

  export interface TableRowModel {
    x: number,
    y1: number,
    y2: number,
    y3: number
  }

  const _getTableColumns = () => {
    const tableColumns: VdnTableColumn<any>[] = [
      new VdnTableColumn('Date', 'x', 'Date', false, false, 'string', '100px'),
      new VdnTableColumn('Won', 'y1', 'Won', false, false, 'number', '100px'),
      new VdnTableColumn('Lost', 'y2', 'Lost', false, false, 'number', '100px'),
      new VdnTableColumn('Draw', 'y3', 'Draw', false, false, 'number', '100px')
    ]
    return tableColumns;
  }

  const _getDefaultRow = (key: string): TableRowModel => ({ x: Number(key), y1: null, y2: null, y3: null });

  const _initTableRows = (tableRows: TableRowModel[], yearsDict: {[key:number]: number}, property: string) => {
    for (const key of Object.keys(yearsDict)) {
      const oldTableRow: TableRowModel = tableRows.find(row => row.x == Number(key));
      const tableRow: TableRowModel = oldTableRow == null ? _getDefaultRow(key) : oldTableRow;
      tableRow[property] = yearsDict[key];
      if (oldTableRow == null)
        tableRows.push(tableRow);
    }
  }

  const _getNumberOfMoves = (moves: string): number => {
    const numbers = moves.match(/\d+/g).map(Number)
    return Math.max(...numbers);
  }

  const _sum = (games: ChessGameDto[]) => games.reduce((dict, game) => {
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
    return dict;
  }, <{[key: number]: [number, number]}>{});

  const _getTableRows = (gamesWon: ChessGameDto[], gamesLost: ChessGameDto[], gamesDraw: ChessGameDto[]): TableRowModel[] => {
    const gws = _average(_sum(gamesWon));
    const gls = _average(_sum(gamesLost));
    const gds = _average(_sum(gamesDraw));

    const tableRows: TableRowModel[] = [];
    _initTableRows(tableRows, gws, 'y1');
    _initTableRows(tableRows, gls, 'y2');
    _initTableRows(tableRows, gds, 'y3');

    return tableRows.sort((a, b) => a.x - b.x);
  }

  const _average = (dict: {[key: number]: [number, number]}) => {
    const yearDict: {[key: number]: number} = {};
    for (const key of Object.keys(dict)) {
      yearDict[key] = dict[key][0] / dict[key][1];
    }
    return yearDict;
  }

  const _chessDateToDate = (date: string): Date => DateTime.fromFormat(date, 'yyyy.MM.dd').toJSDate()
}
