using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;

namespace API.Data
{
    public class UnitOfWork(StoreContext storeContext,IProductRepository productRepository,IUserRepository userRepository) : IUnitOfWork
    {
        public IProductRepository ProductRepository => productRepository;
        public IUserRepository UserRepository => userRepository;
        public async Task<bool> complete()
        {
            return await storeContext.SaveChangesAsync()>0;
        }

        public bool hasChanges()
        {
            return storeContext.ChangeTracker.HasChanges();
        }
    }

    // public class UnitOfWork(StoreContext _storeContext,IProductRepository productRepository) : IUnitOfWork
    // {
    // // private readonly StoreContext _storeContext;
    // // private readonly IProductRepository _productRepository;

    // // public UnitOfWork(StoreContext storeContext, IProductRepository productRepository)
    // // {
    // //     _storeContext = storeContext;
    // //     _productRepository = productRepository;
    // // }

    // public IProductRepository ProductRepository => productRepository;

    //     public async Task<bool> complete()
    // {
    //     return await _storeContext.SaveChangesAsync() > 0;
    // }

    // public bool hasChanges()
    // {
    //     return _storeContext.ChangeTracker.HasChanges();
    // }
    // }

}