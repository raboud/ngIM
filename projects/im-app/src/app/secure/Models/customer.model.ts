export interface GithubApi {
    items: GithubIssue[];
    total_count: number;
  }
  
  export interface GithubIssue {
    created_at: string;
    number: string;
    state: string;
    title: string;
  }

  export interface Page<t> {
    currentPage: number;
    pageCount: number;
    pageSize: number;
    rowCount: number;
    results: Customer[];
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