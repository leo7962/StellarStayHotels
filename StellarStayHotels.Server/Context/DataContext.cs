﻿using Core.Models;
using Microsoft.EntityFrameworkCore;

namespace StellarStayHotels.Server.Context
{
    public class DataContext : DbContext
    {
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Reservation> Reservations { get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Room>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Type).IsRequired().HasMaxLength(50);
                entity.Property(e => e.BaseRate).IsRequired().HasColumnType("decimal(18,2)");
            });

            modelBuilder.Entity<Reservation>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.CheckInDate).IsRequired().HasColumnType("date");
                entity.Property(e => e.TotalPrice).IsRequired().HasColumnType("decimal(18,2)");
                entity.HasOne(e => e.Room).WithMany().HasForeignKey(e => e.RoomId).OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}
