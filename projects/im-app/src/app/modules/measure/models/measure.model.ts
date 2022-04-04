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
    deleted: boolean;
    rolledGood: boolean;
    width: number;

    rooms: MeasureRoom[];
}

export interface MeasureItemEdit
{
    id: number;
    material: string;
    deleted: boolean;
    rolledGood: boolean;
    width: number;
}

export interface MeasureRoom
{
    id: number;
    room: string;
    description: string;
    deleted: boolean;
    disconnected: boolean;
    leftToRight: boolean;
    cuts: Cut[];
}

export interface MeasureRoomEdit
{
    id: number;
    room: string;
    description: string;
    deleted: boolean;
    disconnected: boolean;
    leftToRight: boolean;
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
