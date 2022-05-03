import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PaginatedDataSource, Sort } from 'randr-lib';
import { MeasureList } from '../../models/measure.model';
import { MeasureListQuery, MeasureService } from '../../services/measure.service';

@Component({
  selector: 'app-measure-list',
  templateUrl: './measure-list.component.html',
  styleUrls: ['./measure-list.component.scss']
})
export class MeasureListComponent {
  psort: Sort<MeasureList> = { property: 'address1', order: ''}

  dataSource: PaginatedDataSource<MeasureList, MeasureListQuery>
    = new PaginatedDataSource<MeasureList, MeasureListQuery>(
      (request, query) => this.dataService.getPage(request, query),
      this.psort,
      {lastname: ''});
  displayedColumns: string[] = ['name', 'line1', 'city', 'state', 'zip', 'status', 'date', 'actions'];

  resultsLength = 0;
  pageSize = 20;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(private dataService: MeasureService) { }

  select(id: number){
    console.log(id);
  }

  editMeasure($event: any, measure: MeasureList) {
    $event.stopPropagation();
  }
}


