import { Component, Input } from '@angular/core';
import { ChessGameDto } from 'api';
import { TableHelper } from './table.helper';
import { TableBaseStyle, VdnTableColumn } from 'vdn-maui';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-table-modal',
  templateUrl: './table-modal.component.html',
  styleUrls: ['./table-modal.component.scss']
})
export class TableModalComponent {
  tableRows: TableHelper.TableRowModel[] = [];
  tableColumns: VdnTableColumn<any>[] = [];

  tableBaseStyle: TableBaseStyle = new TableBaseStyle('primary', 'primary', {top: 'none', right: 'none', bottom: 'none', left:'none'}, 'none');

  private _inputData: [ChessGameDto[], string];
  public get inputData(): [ChessGameDto[], string] {
    return this._inputData;
  }
  @Input()
  public set inputData(value: [ChessGameDto[], string]) {
    this._inputData = value;
    [this.tableColumns, this.tableRows] = TableHelper.ChessGamesToTableModel(this.inputData[0], this.inputData[1]);
  }

  constructor(private activeModal: NgbActiveModal) {}

  close() {
    this.activeModal.close();
  }
}
