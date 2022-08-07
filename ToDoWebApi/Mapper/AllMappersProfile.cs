using AutoMapper;
using ToDo.DAL.Entities;
using ToDoWebApi.DTOs;

namespace ToDoWebApi.Mapper
{
    public class AllMappersProfile : Profile
    {
        public AllMappersProfile()
        {
            CreateMap<Board, BoardDTO>().ReverseMap();
            CreateMap<Objective, ObjectiveDTO>().ReverseMap();
        }
    }
}
