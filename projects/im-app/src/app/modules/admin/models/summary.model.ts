export class Summary {
  public items: SummaryItem[]

  constructor(
    public jobId: number,
    public preliminary: boolean,
    items: SummaryItem[]
  ){
    this.items = [];
    items.forEach((item) => {
      this.items.push( new SummaryItem(
        item.id, item.categoryId, item.description, item.itemAreas)
      )
    });
  }
}


export class SummaryItem {

  constructor(
    public id: number,
    public categoryId: number,
    public description: string,
    public itemAreas: SummaryItemArea[]

  ){
    console.log("Constructor");
  }

  public get totalQuanity(): number {
    console.log(this);
    const sum = this.itemAreas
      .filter(item => item.ours && !item.deleted)
      .reduce((sum, current) =>
        sum + current.quantity, 0
      );
    return sum;
  }

  public get totalCost(): number {
    console.log(this);
    const sum = this.itemAreas
      .filter(item => item.ours && !item.deleted)
      .reduce((sum, current) =>
        sum + current.quantity * current.unitCost, 0
      );
    return sum;
  }}

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
