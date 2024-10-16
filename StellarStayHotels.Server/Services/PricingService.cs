using Core.Models;
using Microsoft.EntityFrameworkCore;
using StellarStayHotels.Server.Context;
using StellarStayHotels.Server.Interfaces;

namespace StellarStayHotels.Server.Services
{
    public class PricingService : IPricingService
    {
        private readonly DataContext _context;

        public PricingService(DataContext context)
        {
            _context = context;
        }
        public async Task<decimal> CalculatePrice(Room room, DateTime checkIn, DateTime checkOut, int numberOfGuests, bool includesBreakfast)
        {
            int totalDays = (checkOut - checkIn).Days;
            decimal totalPrice = 0;

            // Obtener cualquier configuración adicional que pueda influir en el precio de la base de datos (simulado).
            //var pricingAdjustments = await _context.PricingAdjustments
            //    .Where(p => p.RoomType == room.Type)
            //    .ToListAsync();

            for (var date = checkIn; date < checkOut; date = date.AddDays(1))
            {
                decimal dailyRate = room.BaseRate;

                // Incremento de precio en fines de semana
                if (date.DayOfWeek == DayOfWeek.Saturday || date.DayOfWeek == DayOfWeek.Sunday)
                {
                    dailyRate *= 1.25m; // Aumento del 25%
                }

                // Ajustes de tarifa por duración de la estancia
                if (totalDays >= 4 && totalDays <= 6)
                {
                    dailyRate -= 4;
                }
                else if (totalDays >= 7 && totalDays <= 9)
                {
                    dailyRate -= 8;
                }
                else if (totalDays >= 10)
                {
                    dailyRate -= 12;
                }

                totalPrice += dailyRate;
            }

            // Cálculo del costo de desayuno de manera asíncrona si se necesita consultar alguna información.
            //if (includesBreakfast)
            //{
            //    var breakfastCost = await GetBreakfastCostAsync(numberOfGuests, totalDays);
            //    totalPrice += breakfastCost;
            //}

            return totalPrice;
        }
    }
}
