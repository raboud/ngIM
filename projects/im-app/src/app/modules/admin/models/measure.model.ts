export interface Measure
{
    jobId: number
    items: MeasureItem[]
}

export interface MeasureItem
{
    id: number;
    room: string;
    description: string;
    category: string;
    subCategory: string
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
