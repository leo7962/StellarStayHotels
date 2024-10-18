using StellarStayHotels.Server.Dtos;

namespace StellarStayHotels.Server.Interfaces;

public interface IRoomService
{
    Task<IEnumerable<RoomDto>> GetAvailableRoomsAsync(RoomSearchDto searchDto);
    Task<RoomDto> GetRoomByIdAsync(int id);
}