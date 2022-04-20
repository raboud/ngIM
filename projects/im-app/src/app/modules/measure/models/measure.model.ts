import { JobDetail } from "../../shared/models/jog-detail.model";

export interface Measure
{
    job: JobDetail;
    scheduleDate: Date;
    notes: String;
    items: MeasureItem[]
}

export interface MeasureCreate {
  jobId: number
}

export interface MeasureList {
  jobId: number;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  scheduleDate: Date;
  status: string;
}

export interface MeasureItem extends MeasureItemEdit
{
    id: number;
    material: string;
    deleted: boolean;
    rolledGoods: boolean;
    width: number;

    rooms: MeasureRoom[];
}

export interface MeasureItemEdit
{
    id: number;
    material: string;
    deleted: boolean;
    rolledGoods: boolean;
    width: number;
}

export interface MeasureRoom
{
    id: number;
    room: string;
    description: string;
    disconnected: boolean;
    leftToRight: boolean;
    floor: number;
    deleted: boolean;
    cuts: Cut[];
    transitions: Transition[];
  }

export interface MeasureRoomEdit
{
  id: number;
  room: string;
  description: string;
  disconnected: boolean;
  leftToRight: boolean;
  floor: number;
  deleted: boolean;
  cuts: Cut[];
  transitions: Transition[];
}

export interface MeasureEdit
{
    jobId: number;
    items: MeasureItem[]
}

export interface Cut
{
  id: number,
    width: number;
    length: number;
    notes: string;
    deleted: boolean;
}

export interface Transition
{
  id: number;
  type: string;
  length: number;
  notes: string;
  deleted: boolean;
}
