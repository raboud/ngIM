export interface Summary {
  jobId: number,
  preliminary: boolean,
  items: SummaryItem[]
}

export interface SummaryItem {
  id: number,
  categoryId: number,
  description: string,
  itemAreas: SummaryItemArea[]
}

export interface SummaryItemEdit {
id: number,
categoryId: number,
description: string
}

export interface SummaryItemArea
{
  bidAreaId: number,
  bidItemId: number,
  ours: boolean,
  deleted: boolean,
  quantity: number,
  unitCost: number,
  row: number,
  area: SummaryArea
}

export interface SummaryItemAreaEdit
{
  bidAreaId: number,
  bidItemId: number,
  ours: boolean,
  deleted: boolean,
  quantity: number,
  unitCost: number,
  row: number,
  area: SummaryAreaEdit
}

export interface SummaryArea {
  id: number,
  name: string,
  description: string,
  notes: string,
  row: number,
  deleted: boolean
}

export interface SummaryAreaEdit {
  id: number,
  name: string,
  description: string,
  notes: string,
  row: number,
  deleted: boolean
}
