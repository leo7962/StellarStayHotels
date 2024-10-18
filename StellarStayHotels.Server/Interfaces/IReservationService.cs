using StellarStayHotels.Server.Dtos;

namespace StellarStayHotels.Server.Interfaces;

public interface IReservationService
{
    Task<ReservationDto> CreateReservationAsync(CreateReservationDto reservationDto);
    Task<ReservationDto> GetReservationDetailsAsync(int reservationId);
    Task<IEnumerable<ReservationDto>> GetAllReservationsAsync();
    Task<bool> CancelReservationAsync(int reservationId);
}