using Core.Models;

namespace StellarStayHotels.Server.Interfaces
{
    public interface IPricingService
    {
        Task<decimal> CalculatePrice(Room room, DateTime checkIn, DateTime checkOut, int numberOfGuests, bool includeBreakFast);
    }
}
