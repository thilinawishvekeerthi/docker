import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { MergeDialogComponent } from "src/app/grid-setting/merge-dialog/merge-dialog.component";
import { MergeDialogData } from "src/app/grid-setting/merge-dialog/merge-dialog.data";
import { GridData } from "../model/TileResponse";
import { Tile } from "../model/Title";
import { GridService } from "./grid.service";
import { LoadingService } from "./loading.service";
import { MessageService } from "./message.service";

@Injectable()
export class GridDataService{

    private gridDataSubject = new BehaviorSubject<GridData>({Tiles: [], Config:{id:0, colCount: 4, rowCount:4}});
    private gridData$: Observable<GridData> = this.gridDataSubject.asObservable();

    private selectedTileSubject = new BehaviorSubject<Tile[]>([]);
    public selectedTiles$ : Observable<Tile[]> = this.selectedTileSubject.asObservable();

    constructor(
        private gridService: GridService,
        private loadingService: LoadingService,
        private messageService: MessageService,
        public dialog: MatDialog
    ){
        this.loadGridData();
    }

    private loadGridData(): void{
        const loadData$ = this.gridService.loadGridTiles(0)
        .pipe(
          map((payload:GridData)=> this.mapGridPayLoad(payload)),
          tap((data:GridData)=>this.gridDataSubject.next(data))
        );
        this.loadingService.loaderProcessIndicator(loadData$).subscribe();
    }

    private mapGridPayLoad(payload:GridData):GridData{
        payload.Tiles= this.mapImageUrl(payload.Tiles);
        return payload;
    }
      
    private mapImageUrl(tiles:Tile[]):Tile[]{
        tiles.forEach((tile:Tile)=> tile.url = `https://picsum.photos/id/${Math.floor(Math.random() * 700)}/${tile.cols*500}/${tile.rows*400}`);
        return tiles;
    }

    getGridData(): Observable<GridData>{
        return this.gridData$;
    }

    generateGrid(formValue: any):void{
        let tiles: Tile[] =[];
        let selectedTiles: Tile[] = [];
        const cellCount: number = formValue.numberOfRows* formValue.numberOfColumns;
        for(let index = 0; index < cellCount; index++){
          const tile : Tile ={
            id : index+1,
            color: 'gray',
            cols: 1,
            rows: 1,
            text:'',
            selected : false,
            merged: false
          }
          tiles.push(tile)
        }
        let gridData: GridData = this.gridDataSubject.getValue();
        gridData.Config.colCount = formValue.numberOfColumns;
        gridData.Config.rowCount = formValue.numberOfRows;
        gridData.Tiles = tiles;
        this.gridDataSubject.next(gridData);
        this.selectedTileSubject.next(selectedTiles);
      }

    gridCellClick(tile: Tile, formGroup: FormGroup){
      let formValue = formGroup.value;
      const selectedTiles = this.selectedTileSubject.getValue();
      if(!tile.merged && (!formValue.numberOfMergeCellsPerTime || selectedTiles.length == 0)){
        this.openDialog(false, formValue.numberOfMergeCellsPerTime)
        .pipe(
          tap((result: MergeDialogData)=>{
            if(result){
              const numberOfMergeCellsPerTime = result.mergeCellCount;
              formGroup.controls['numberOfMergeCellsPerTime'].patchValue(numberOfMergeCellsPerTime);
              formValue = formGroup.value;
              this.cellClick(tile, formValue);
            }
          })
          ).subscribe();
      }else{
        this.cellClick(tile, formValue);
      }
    }
      
     private cellClick(tile: Tile, formValue: any):void{
        const selectedTiles = this.selectedTileSubject.getValue();
        if(!tile.merged){
            if(tile.selected){
              // remove from selected tiles
              let index = selectedTiles.findIndex(d => d.id === tile.id); 
              selectedTiles.splice(index, 1);
              // change the color to old value
              tile.color = 'gray';
              tile.selected = false;
              this.updateGridDataTile(tile);
            }
            // check merge cell validation and change selected tile
            else if(formValue.numberOfMergeCellsPerTime > selectedTiles.length){
              tile.color = 'red';
              tile.selected = true;
              selectedTiles.push(tile);
              this.selectedTileSubject.next(selectedTiles);
              this.updateGridDataTile(tile);
            } else{
              this.messageService.openSnackBar("exeeds selected cells");
            }
            if(selectedTiles.length == formValue.numberOfMergeCellsPerTime){
              this.openDialog(true).pipe(
                tap((result: MergeDialogData)=>{
                    if(result && result.confirmationDialog){
                      this.mergeCells(formValue);
                    }
                })
              ).subscribe();
            }
          }else{
            this.messageService.openSnackBar("cannot select merge cells");
          }
        
      }

      private updateGridDataTile(tile: Tile) {
        let gridData = this.gridDataSubject.getValue();
        let tileId = gridData.Tiles.findIndex(d => d.id == tile.id);
        gridData.Tiles.splice(tileId, 1, tile);
        this.gridDataSubject.next(gridData);
      }

      mergeCells(formValue : any):void{
        
        let selectedTiles: Tile[] = this.selectedTileSubject.getValue();
        let gridData: GridData = this.gridDataSubject.getValue()
        let tiles: Tile[] =  gridData.Tiles;
        const firstTile: Tile = selectedTiles[0];
        const verticalTiles: Tile[] = [firstTile];
        const horizontalTiles: Tile[] = [firstTile];

        // find vertical selections 
        let findVerticalId: number = firstTile.id+1;
        for(let index = 0; index < formValue.numberOfColumns; index++){
         
          let nextVerticalTile = selectedTiles.find((title:Tile)=>title.id == findVerticalId);
          if(nextVerticalTile) {
            verticalTiles.push(nextVerticalTile);
            ++findVerticalId;
          }
        }
         // find horizontal selections 
         let findHorizontalId : number = firstTile.id + formValue.numberOfColumns;
         for(let index = 0; index < formValue.numberOfRows; index++){
          let nextHorizontalTile = selectedTiles.find((title:Tile)=>title.id == findHorizontalId);
          if(nextHorizontalTile){
            horizontalTiles.push(nextHorizontalTile);
            findHorizontalId = findHorizontalId + formValue.numberOfColumns;
          }
        }
    
        if(horizontalTiles.length == formValue.numberOfMergeCellsPerTime ||
           verticalTiles.length == formValue.numberOfMergeCellsPerTime ||
           formValue.numberOfMergeCellsPerTime == horizontalTiles.length * verticalTiles.length){
    
          const mergeTile : Tile = {
            id: firstTile.id,
            rows: horizontalTiles.length,
            cols: verticalTiles.length,
            color: 'blue',
            selected: true,
            merged: true,
            text:''
          }
    
          const firstTileIndex = tiles.findIndex(d => d.id === firstTile.id); 
    
          horizontalTiles.forEach((tile:Tile)=>{
            let index = tiles.findIndex(d => d.id === tile.id ); 
            if(index >= 0 && firstTileIndex != index)  {
              tiles.splice(index, 1);
            }
            let selectedIndex = selectedTiles.findIndex(d => d.id === tile.id);
            if(selectedIndex >= 0)  {
              selectedTiles.splice(selectedIndex, 1);
            }
          });
    
          verticalTiles.forEach((tile:Tile)=>{
            let index = tiles.findIndex(d => d.id === tile.id ); 
            if(index >= 0 && firstTileIndex != index)  {
              tiles.splice(index, 1);
            }
            let selectedIndex = selectedTiles.findIndex(d => d.id === tile.id);
            if(selectedIndex >= 0)  {
              selectedTiles.splice(selectedIndex, 1);
            }
          });
    
          selectedTiles.forEach((tile:Tile)=>{
            let index = tiles.findIndex(d => d.id === tile.id ); 
            if(index >= 0 && firstTileIndex != index)  {
              tiles.splice(index, 1);
            }
          });
    
         
          tiles[firstTileIndex] = mergeTile;
          selectedTiles= [];
          gridData.Tiles = tiles;
          this.gridDataSubject.next(gridData);
          this.selectedTileSubject.next(selectedTiles);
    
        }else{
          this.messageService.openSnackBar("merge mapping is wrong reset and try again");
        }
      }

    saveGridData(){
        let gridData: GridData = this.gridDataSubject.getValue()
        let tiles: Tile[] =  gridData.Tiles;
        tiles.forEach((tile:Tile)=> {tile.merged = true;  tile.color = 'blue';});
        const saveData$ = this.gridService.saveGridTiles(0,gridData) 
        .pipe(
            map((payload:GridData)=> this.mapGridPayLoad(payload)),
            tap((data:GridData)=>this.gridDataSubject.next(data)),
          );
        this.loadingService.loaderProcessIndicator(saveData$).subscribe();
    }

   
    openDialog(confirmationDialog: boolean = false, mergeCellCount: number = 0): Observable<any> {
      let dailogData : MergeDialogData ={
        title: 'Merge Cells',
        question: "Provide number of merge cells",
        questionMatLabel : "merge cell count",
        mergeCellCount : mergeCellCount,
        confirmationDialog : confirmationDialog
      }
      const dialogRef = this.dialog.open(MergeDialogComponent, {
        width: '250px',
        data: dailogData,
      });
  
      return dialogRef.afterClosed();
    }

}