import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, of} from "rxjs";
import { pluck, catchError, finalize} from "rxjs/operators";

import { Page, PageRequest } from 'src/app/models';

export type PaginationEndpoint<T> = (
    filter:string,
    sortDirection:string,
    pageIndex:number,
    pageSize:number) => Observable<Page<T>>

export class PaginatedDataSource<T> implements DataSource<T> {

    private dataSubject = new BehaviorSubject<T[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private countSubject = new BehaviorSubject<number>(0);

    public loading$ = this.loadingSubject.asObservable();
    public count$ = this.countSubject.asObservable();

    constructor(private endPoint: PaginationEndpoint<T>) {}

    loaddata(filter:string,
        sortDirection:string,
        pageIndex:number,
        pageSize:number) {

        this.loadingSubject.next(true);

        this.endPoint(filter, sortDirection, pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(page => {
                this.dataSubject.next((page as Page<T>).content),
                this.countSubject.next((page as Page<T>).totalElements)
            });

    }

    connect(collectionViewer: CollectionViewer): Observable<T[]> {
        return this.dataSubject.asObservable();
   }

    disconnect(collectionViewer: CollectionViewer): void {
        this.dataSubject.complete();
        this.loadingSubject.complete();
        this.countSubject.complete();
    }

}
