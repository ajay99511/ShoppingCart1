using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Extensions
{
    public class AutoMapper : Profile
    {
        public AutoMapper()
        {
            CreateMap<User,UserDto>();
            CreateMap<Basket,BasketDto>();
        }
    }
}