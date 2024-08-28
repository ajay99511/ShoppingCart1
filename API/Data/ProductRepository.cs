using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ProductRepository(StoreContext context) : IProductRepository
    {
        public void AddProduct(Product product)
        {
            context.Products.Add( product );
        }

        public void DeleteProduct(Product product)
        {
            context.Products.Remove(product);
        }

        public async Task<List<string>> GetFilters()
        {
            var brands = await context.Products.Select(p=>p.Brand).Distinct().ToListAsync();
            var types = await context.Products.Select(p=>p.Type).Distinct().ToListAsync();
            return brands;
        }

        public async Task<Product> GetProductById(int id)
        {
            var product = await context.Products.FindAsync(id);
            return product;
        }

        public async Task<PagedList<Product>> GetProductsAll(ProductParams productParams)
        {
            var query = context.Products
            .Sort(productParams.OrderBy)
            .Search(productParams.SearchTerm)
            .Filter(productParams.Brands, productParams.Types)
            .AsQueryable();
            var products = await PagedList<Product>.ToPagedList(query,productParams.PageNumber,productParams.PageSize);
            // Response.Headers.Append("Pagination",JsonSerializer.Serialize(products.metaData));
            
            return products;
        }
    }
}