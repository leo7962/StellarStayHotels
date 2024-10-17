using AutoMapper;
using Core.Models;
using Microsoft.EntityFrameworkCore;
using StellarStayHotels.Server.Context;
using StellarStayHotels.Server.Dtos;
using StellarStayHotels.Server.Interfaces;

namespace StellarStayHotels.Server.Services
{
    public class ReservationService : IReservationService
    {
        private readonly DataContext _context;
        private readonly IPricingService _pricingService;
        private readonly IMapper _mapper;

        public ReservationService(DataContext context, IPricingService pricingService, IMapper mapper)
        {
            _context = context;
            _pricingService = pricingService;
            _mapper = mapper;
        }
        public async Task<bool> CancelReservationAsync(int reservationId)
        {
            var reservation = await _context.Reservations.FindAsync(reservationId);

            if (reservation == null) return false;

            _context.Reservations.Remove(reservation);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<ReservationDto> CreateReservationAsync(CreateReservationDto reservationDto)
        {
            var room = await _context.Rooms.FindAsync(reservationDto.RoomId);
            if (room == null) throw new Exception("Room not found.");

            var pricingRequest = new PricingRequestDto
            {
                Id = reservationDto.RoomId,
                CheckInDate = reservationDto.CheckInDate,
                CheckOutDate = reservationDto.CheckOutDate,
                NumberOfGuests = reservationDto.NumberOfGuests,
                IncludesBreakfast = reservationDto.IncludesBreakfast
            };

            var totalPrice = await _pricingService.CalculatePriceAsync(pricingRequest);

            var reservation = _mapper.Map<Reservation>(reservationDto);
            reservation.TotalPrice = totalPrice;

            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();

            return _mapper.Map<ReservationDto>(reservation);
        }

        public async Task<IEnumerable<ReservationDto>> GetAllReservationsAsync()
        {
            var reservations = await _context.Reservations
            .Include(r => r.Room)
            .ToListAsync();

            return _mapper.Map<IEnumerable<ReservationDto>>(reservations);
        }

        public async Task<ReservationDto> GetReservationDetailsAsync(int reservationId)
        {
            var reservation = await _context.Reservations.Include(r => r.Room).FirstOrDefaultAsync(r => r.Id == reservationId);

            return _mapper.Map<ReservationDto>(reservation);
        }
    }
}
