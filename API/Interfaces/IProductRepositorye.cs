using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;

namespace API.Interfaces
{
    public interface IProductRepository
    {
        public void AddProduct(Product product);
        public void DeleteProduct(Product product);
        public Task<PagedList<Product>> GetProductsAll(ProductParams productParams);
        public Task<Product> GetProductById(int id);
        public Task<List<string>> GetFilters();
    }
}