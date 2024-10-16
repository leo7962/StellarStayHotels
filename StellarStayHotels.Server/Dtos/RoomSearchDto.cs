namespace StellarStayHotels.Server.Dtos
{
    public class RoomSearchDto
    {
        public DateTime ChekInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public int NumberOfGuests { get; set; }
        public bool IncludesBreakfast { get; set; }
        public string RoomType { get; set; }
    }
}
