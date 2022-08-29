import { Injectable } from "@angular/core";
import { BehaviorSubject, concatMap, finalize, Observable, of, tap } from "rxjs";


@Injectable()
export class LoadingService{

    private loadingSubject = new BehaviorSubject<boolean>(false);

    loading$ : Observable<boolean> = this.loadingSubject.asObservable();

    loaderProcessIndicator<T>(obs$ : Observable<T>): Observable<T>{
        // of(null) will still emit null. and start the process
        return of(null)
               .pipe(
                 tap(()=>this.loadingSubject.next(true)), // mutation
                 concatMap(()=>obs$),
                 finalize(()=>this.loadingSubject.next(false))
               );
    }

    loadingOn(){
        this.loadingSubject.next(true);
       }
   
    loadingOff(){
        this.loadingSubject.next(false);
       }

}