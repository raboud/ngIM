export interface BidSheet {
    jobId: number,
    preliminary: boolean,
    areas: BidArea[],
    logs: Log[],
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
    categoryId: number,
    description: string,
    quantity: number,
    unitCost: number,
    ours: boolean,
    deleted: boolean,
    row: number
}

export interface BidItemEdit {
  id: number,
  areaId: number,
  category: string,
  categoryId: number,
  description: string,
  quantity: number,
  unitCost: number,
  ours: boolean,
  deleted: boolean,
  row: number
}

export interface Log{
  id: number,
  logLeve: string,
  message: string,
}
