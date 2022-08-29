import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GridData } from '../shared/model/TileResponse';
import { GridDataService } from '../shared/service/grid.data.service';
import { LoadingService } from '../shared/service/loading.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[
    LoadingService,
    GridDataService
  ]
})
export class HomeComponent implements OnInit {

  gridData$ : Observable<GridData> | undefined ;

  constructor(
    private gridDataService: GridDataService,
    public loadingService: LoadingService
    ) { }

  ngOnInit(): void {
    this.loadGridData();
  }

  private loadGridData() {
    this.gridData$ = this.gridDataService.getGridData();
  }


}
