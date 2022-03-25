export interface Measure
{
    jobId: number
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipCode: string;
    scheduleDate: Date;
    notes: String;
    items: MeasureItem[]
}

export interface MeasureCreate {
  jobId: number
}

export interface MeasureList {
  JobId: number;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  scheduleDate: Date;
  status: string;
}

export interface MeasureItem
{
    id: number;
    material: string;
    rooms: MeasureRoom[];
    deleted: boolean;
}

export interface MeasureRoom
{
    id: number;
    room: string;
    description: string;
    cuts: Cut[];
}

export interface MeasureEdit
{
    jobId: number;
    items: MeasureItem[]
}

export interface Cut
{
    width: number;
    length: number;
    notes: string;
}
