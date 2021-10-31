import { CollectionViewer, DataSource} from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of, Subject, combineLatest} from "rxjs";
import { switchMap, startWith, share, map} from "rxjs/operators";
import { Page, PageRequest, Sort } from '../models';

export type PaginatedEndpoint<T, Q> = (pageable: PageRequest<T>, query: Q) => Observable<Page<T>>

export class PaginatedDataSource<T, Q> implements DataSource<T> {
    private pageNumber = new Subject<number>();
    private sort: BehaviorSubject<Sort<T>>;
    private query: BehaviorSubject<Q>;
  
    public page$: Observable<Page<T>>;

    constructor(
        private endpoint: PaginatedEndpoint<T, Q>,
        initialSort: Sort<T>,
        initialQuery: Q,
        public pageSize = 20) {
          this.query = new BehaviorSubject<Q>(initialQuery)
          this.sort = new BehaviorSubject<Sort<T>>(initialSort)
          const param$ = combineLatest([this.query, this.sort]);
          this.page$ = param$.pipe(
            switchMap(([query, sort]) => this.pageNumber.pipe(
              startWith(0),
              switchMap(page => this.endpoint({page, sort, size: this.pageSize}, query)
              )
            )),
            share()
          )
      }
    
      sortBy(sort: Partial<Sort<T>>): void {
        const lastSort = this.sort.getValue();
        const nextSort = {...lastSort, ...sort};
        this.sort.next(nextSort);
      }
    
      queryBy(query: Partial<Q>): void {
        const lastQuery = this.query.getValue();
        const nextQuery = {...lastQuery, ...query};
        this.query.next(nextQuery);
      }
    
      fetch(page: number): void {
        this.pageNumber.next(page);
      }
    
      connect(collectionViewer: CollectionViewer): Observable<T[]> {
        return this.page$.pipe(map(page => page.results));
      }
    
      disconnect(collectionViewer: CollectionViewer): void {

      }
}
