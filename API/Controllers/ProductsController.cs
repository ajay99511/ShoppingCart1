using System.Text.Json;
using API.Data;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController(StoreContext _context,IUnitOfWork unitOfWork):BaseApiController
    {


        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery]ProductParams productParams)
        {
            var products = await unitOfWork.ProductRepository.GetProductsAll(productParams);
            // Response.Headers.Append("Pagination",JsonSerializer.Serialize(products.metaData));
            Response.AddPaginationHeader(products.metaData);
            return Ok(products);
        } 

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id )
        {
            // var product = await _context.Products.FindAsync(id);
            // if(product == null) return NotFound();
            // return product;
            var product = await unitOfWork.ProductRepository.GetProductById(id);
            if(product == null) return NotFound();
            return Ok(product);
        }
        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await _context.Products.Select(p=>p.Brand).Distinct().Take(50).ToListAsync();
            var types = await _context.Products.Select(p=>p.Type).Distinct().ToListAsync();
            return Ok(new {brands,types});
            // return await unitOfWork.ProductRepository.GetFilters();
        }
    }
}


        // private readonly StoreContext _context;
        // private readonly IUnitOfWork _unitOfWork;
        // public ProductsController (StoreContext context,IUnitOfWork unitOfWork)
        // {
        //     _context = context;
        //     _unitOfWork = unitOfWork;
        // }


//  public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery]ProductParams productParams)
//         {
//             var query = _context.Products
//             .Sort(productParams.OrderBy)
//             .Search(productParams.SearchTerm)
//             .Filter(productParams.Brands, productParams.Types)
//             .AsQueryable();
//             var products = await PagedList<Product>.ToPagedList(query,productParams.PageNumber,productParams.PageSize);
//             // Response.Headers.Append("Pagination",JsonSerializer.Serialize(products.metaData));
//             Response.AddPaginationHeader(products.metaData);
//             return Ok(products);
//         } 