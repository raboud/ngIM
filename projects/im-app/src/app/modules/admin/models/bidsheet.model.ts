export interface BidSheet
{
    jobId: number,
    areas: BidArea[],
}

export interface BidArea{
  id: number,
  name: string,
  desscription: string,
  notes: string,
  row: number
  items: BidItem[]
}

export interface BidItem{

}
