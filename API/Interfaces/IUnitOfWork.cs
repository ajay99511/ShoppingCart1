using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        public IProductRepository ProductRepository { get; }
        public Task<bool> complete();
        public bool hasChanges();

    }
}