export interface JobEdit {
  id: number;
  propertyCode: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  squareFoot: string;
  bedBath: string;
  lockBox: string;
  gateCode: string;
  garageCode: string;
  year: string;
  renovationBudget: number;
  projectEndDate: Date;
  ourTotal: number;
  status: number;
}

export interface Address {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;

}
