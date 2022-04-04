export interface BidSheet {
    jobId: number,
    areas: BidArea[],
}

export interface BidArea {
  id: number,
  name: string,
  description: string,
  notes: string,
  row: number,
  deleted: boolean,
  items: BidItem[]
}

export interface BidAreaEdit {
  id: number,
  name: string,
  description: string,
  notes: string,
  row: number,
  deleted: boolean
}

export interface BidItem {
    id: number,
    category: string,
    subCategory: string,
    description: string,
    quantity: number,
    unitCost: number,
    ours: boolean,
    deleted: boolean,
    row: number
}

export interface BidItemEdit {
  id: number,
  category: string,
  subCategory: string,
  description: string,
  quantity: number,
  unitCost: number,
  ours: boolean,
  deleted: boolean,
  row: number
}
