import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, shareReplay, throwError } from "rxjs";
import { GridData, GridDataResponse } from "../model/TileResponse";
import { MessageService } from "./message.service";


@Injectable(
    {
        providedIn:'root'
    }
)
export class GridService{
    private urlPrefix : string = '/api/grid-data';

    constructor(private http: HttpClient,
        private messageService: MessageService){
    }

    loadGridTiles(emitError: number): Observable<GridData>{
        return  this.http.get<GridDataResponse>(`${this.urlPrefix}/${emitError}`)
        .pipe(
            map(res=>res.payload),
            catchError(err=>{
                const message = "Could not retrive grid data";
                console.log(message, err);
                this.messageService.openSnackBar(message);
                return throwError(()=>err);
            }),
            shareReplay()
        );
    }

    saveGridTiles(emitError: number, changes: any):Observable<any>{
        return this.http.put<GridDataResponse>(`${this.urlPrefix}/${emitError}`, changes)
        .pipe(
            map(res=>res.payload),
            catchError(err=>{
                const message = "Could not save grid data";
                console.log(message, err);
                this.messageService.openSnackBar(message);
                return throwError(()=>err);
            }),
            shareReplay()
        );
    }

}