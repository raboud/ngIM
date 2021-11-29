export interface JobEdit {
  id: number;
//  name: string;
  propertyCode: string;
  address: Address
  date: Date;
  squareFoot: string;
  bedBath: string;

  lockBox: string;
  gateCode: string;
  garageCode: string;

  year: string;

  renovationBudget: number;

  projectEndDate: Date;
//  renoTotal: number;
//  ourTotal: number;
//  status: string;
}

export interface Address {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;

}