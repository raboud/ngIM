export interface JobDetail {
  id: number;
  name: string;
  propertyCode: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  date: Date;
  squareFoot: string;
  bedBath: string;

  lockBox: string;
  gateCode: string;
  garageCode: string;

  year: string;

  renovationBudget: number;

  projectEndDate: Date;
  renoTotal: number;
  ourTotal: number;
  status: string;
}

export interface BidSheetList {
  id: number;

  jobId: number;

  renoTotal: number;

  ourTotal: number;
  preliminary: boolean;
  deleted: boolean;
  modified: Date;

}
