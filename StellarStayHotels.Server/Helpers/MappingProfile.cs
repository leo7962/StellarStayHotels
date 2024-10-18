using AutoMapper;
using Core.Models;
using StellarStayHotels.Server.Dtos;

namespace StellarStayHotels.Server.Helpers;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Room, RoomDto>().ReverseMap();
        CreateMap<CreateReservationDto, Reservation>().ReverseMap();
        CreateMap<Reservation, ReservationDto>().ReverseMap();
        CreateMap<RoomSearchDto, Room>();
    }
}