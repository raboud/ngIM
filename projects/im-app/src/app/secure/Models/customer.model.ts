
  export interface Sort<T> {
    property: keyof T;
    order: 'asc' | 'desc' | '';
  }
  
  export interface PageRequest<T> {
    page: number;
    size: number;
    sort?: Sort<T>;
  }
  
  export interface Page<t> {
    currentPage: number;
    pageCount: number;
    pageSize: number;
    rowCount: number;
    results: t[];
  }

  export interface Customer {
    id: number;
    name: string;
    addres: {
      line1: string;
      line2: string;
      city: string;
      state: string;
      zipCode: string;
    }
  }