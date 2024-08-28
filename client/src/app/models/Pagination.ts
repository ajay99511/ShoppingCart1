export interface MetaData{
    currentPage:number
    totalPages:number
    pageSize:number
    totalCount:number
}

export class PaginationResponse<T>
{
    items:T;
    metaData:MetaData;
    constructor(items:T,metaData:MetaData)
    {
        this.items= items;
        this.metaData = metaData;
    }
}