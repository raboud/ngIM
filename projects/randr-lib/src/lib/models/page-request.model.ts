import { Sort } from "./sort.model";

  export interface PageRequest<T> {
    page: number;
    size: number;
    sort?: Sort<T>;
  }