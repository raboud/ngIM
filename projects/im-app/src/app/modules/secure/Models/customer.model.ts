
  
  
  

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