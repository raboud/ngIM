export interface JobDetail {
    id: number;
    name: string;
    addres: {
      address1: string;
      address2: string;
      city: string;
      state: string;
      zipCode: string;
    }
    projectEndDate: Date;
    ourTotal: number;
    status: string;
  }