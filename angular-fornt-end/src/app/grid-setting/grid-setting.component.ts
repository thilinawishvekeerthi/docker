import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { GridData } from '../shared/model/TileResponse';
import { Tile } from '../shared/model/Title';
import { GridDataService } from '../shared/service/grid.data.service';
import { LoadingService } from '../shared/service/loading.service';
@Component({
  selector: 'grid-setting',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './grid-setting.component.html',
  styleUrls: ['./grid-setting.component.scss'],
  providers:[
    LoadingService,
    GridDataService
  ]
})
export class GridSettingComponent implements OnInit {

  gridData$: Observable<GridData> | undefined;

  setUpGridFormGroup: FormGroup = this._formBuilder.group({
    numberOfRows: ['',[Validators.required]],
    numberOfColumns: ['',[Validators.required]],
    numberOfMergeCellsPerTime: ['']
  });

  secondFormGroup: FormGroup = this._formBuilder.group({secondCtrl: ['']});

  constructor(
    private _formBuilder: FormBuilder,
    public gridDataService: GridDataService,
    public loadingService: LoadingService) {}


  ngOnInit(): void {
    this.loadGridTiles();
  }

  private loadGridTiles() {
    this.gridData$ = this.gridDataService.getGridData();
  }

  generateGrid():void{
    const formValue = this.setUpGridFormGroup.value;
    this.setUpGridFormGroup.controls['numberOfMergeCellsPerTime'].patchValue('');
    this.gridDataService.generateGrid(formValue);
  }

  gridCellClick(tile: Tile):void{
   this.gridDataService.gridCellClick(tile, this.setUpGridFormGroup);
  }

  next(){
   this.gridDataService.saveGridData();
  }

  

}
