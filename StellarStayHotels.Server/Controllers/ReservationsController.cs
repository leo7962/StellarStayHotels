using Microsoft.AspNetCore.Mvc;
using StellarStayHotels.Server.Dtos;
using StellarStayHotels.Server.Interfaces;

namespace StellarStayHotels.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly IReservationService _reservationService;
        private readonly IPricingService _pricingService;

        public ReservationsController(IReservationService reservationService, IPricingService pricingService)
        {
            _reservationService = reservationService;
            _pricingService = pricingService;
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetReservationDetails(int id)
        {
            var reservation = await _reservationService.GetReservationDetailsAsync(id);
            if (reservation == null) return NotFound(new { message = "Reservation not found." });
            return Ok(reservation);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllReservations()
        {
            var reservations = await _reservationService.GetAllReservationsAsync();
            return Ok(reservations);
        }

        [HttpPost]
        public async Task<IActionResult> CreateReservation([FromBody] CreateReservationDto reservationDto)
        {
            try
            {
                var reservation = await _reservationService.CreateReservationAsync(reservationDto);
                return CreatedAtAction(nameof(GetReservationDetails), new { id = reservation.ReservationId }, reservation);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("calculate-price")]
        public async Task<IActionResult> CalculatePrice([FromBody] PricingRequestDto pricingRequest)
        {
            try
            {
                var totalPrice = await _pricingService.CalculatePriceAsync(pricingRequest);
                return Ok(new { TotalPrice = totalPrice });
            }
            catch (Exception ex)
            {

                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> CancelReservation(int id)
        {
            var success = await _reservationService.CancelReservationAsync(id);
            if (!success) return NotFound(new { message = "Reservation not found or could not be canceled." });

            return NoContent();
        }
    }
}
