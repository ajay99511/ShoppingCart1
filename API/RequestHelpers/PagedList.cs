using API.RequestHelpers;
using Microsoft.EntityFrameworkCore;

public class PagedList<T> : List<T>
{
    public MetaData metaData{get;set;}
    public PagedList(List<T> items,int count,int pageNumber,int pageSize)
    {
        metaData = new MetaData
        {
            TotalCount = count,
            CurrentPage = pageNumber,
            PageSize = pageSize,
            TotalPages = (int)Math.Ceiling(count/(double)pageSize),
        };
        AddRange(items);
    }
    public static async Task<PagedList<T>> ToPagedList(IQueryable<T> query,int pageNumber,int pageSize)
    {
        var count = await query.CountAsync();
        var items = await query.Skip((pageNumber-1)*pageSize).Take(pageSize).ToListAsync();
        return new PagedList<T>(items,count,pageNumber,pageSize);
    }
}