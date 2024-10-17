using StellarStayHotels.Server.Dtos;

namespace StellarStayHotels.Server.Interfaces
{
    public interface IPricingService
    {
        Task<decimal> CalculatePriceAsync(PricingRequestDto pricingRequest);
    }
}
