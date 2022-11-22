import { BidAreaEditComponent } from "../components/bid/bid-area-edit/bid-area-edit.component"

export interface BidSheet {
    jobId: number,
    preliminary: boolean,
    areas: BidArea[]
}

export interface BidArea {
  id: number,
  name: string,
  description: string,
  notes: string,
  row: number,
  deleted: boolean,
  areaItems: BidAreaItem[]
}

export interface BidAreaItem{
  bidAreaId: number,
  bidItemId: number,
  ours: boolean,
  deleted: boolean,
  quantity: number,
  unitCost: number,
  row: number,
  item: BidItem
}

export interface BidItem {
  id: number,
  category: string,
  categoryId: number,
  description: string
}

export interface BidAreaItemEdit{
  bidAreaId: number,
  bidItemId: number,
  ours: boolean,
  deleted: boolean,
  quantity: number,
  unitCost: number,
  row: number,
  item: BidItemEdit
}

export interface BidAreaEdit {
  id: number,
  name: string,
  description: string,
  notes: string,
  row: number,
  deleted: boolean
}

export interface BidItemEdit {
  id: number,
  areaId: number,
  category: string,
  categoryId: number,
  description: string
}

