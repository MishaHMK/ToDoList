﻿using Microsoft.EntityFrameworkCore;
using ToDo.DAL.Entities;

namespace ToDo.DAL
{
    public class ToDoListContext : DbContext
    {
        public ToDoListContext(DbContextOptions<ToDoListContext> options) : base(options)
        { }

        public DbSet<Objective> Objectives { get; set; }
        public DbSet<Board> Boards { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data Source=DESKTOP-M78QGAQ;Initial Catalog=ToDoListDB;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Board>().HasKey(board => board.Id);
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Objective>().HasKey(obj => obj.Id);
            base.OnModelCreating(modelBuilder);
        }
    }
}