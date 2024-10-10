using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;

namespace API.Extensions
{
    public static class ProductExtensions
    {
        public static IQueryable<Product> Sort (this IQueryable<Product> query,string OrderBy)
        {
            if(string.IsNullOrWhiteSpace(OrderBy)) return query.OrderBy(p=>p.Name);
            query = OrderBy switch
            {
                "price" => query.OrderBy(p=>p.Price),
                "priceDesc" => query.OrderByDescending(p=>p.Price),
                _ => query.OrderBy(p=>p.Name),
            };
            return query;
        } 
        
        public static IQueryable<Product> Search (this IQueryable<Product> query,string SearchTerm)
        {
            if(string.IsNullOrEmpty(SearchTerm)) return query;
            var lowercaseSearchTerm = SearchTerm.Trim().ToLower();
            query = query.Where(p=>p.Name.ToLower().Contains(lowercaseSearchTerm)
            ||p.Brand.ToLower().Contains(lowercaseSearchTerm));
            return query;
        }
        public static IQueryable<Product> Filter (this IQueryable<Product> query,string brands,string types)
        {
            var brandsList = new List<string>();
            var typesList = new List<string>();
            if(!string.IsNullOrEmpty(brands))
            {
                brandsList.AddRange(brands.Split(",").ToList());
            }
            if(!string.IsNullOrEmpty(types))
            {
                typesList.AddRange(types.Split(",").ToList());
            }
            query = query.Where(p=>brandsList.Count == 0 || brandsList.Contains(p.Brand));
            query = query.Where(p=>typesList.Count == 0 || typesList.Contains(p.Type));
            return query;
        }
    }
}