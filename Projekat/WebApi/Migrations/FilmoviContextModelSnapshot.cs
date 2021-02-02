﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebApi.Models;

namespace WebApi.Migrations
{
    [DbContext(typeof(FilmoviContext))]
    partial class FilmoviContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.2");

            modelBuilder.Entity("WebApi.Models.Film", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID")
                        .UseIdentityColumn();

                    b.Property<int>("Godina")
                        .HasColumnType("int")
                        .HasColumnName("Godina");

                    b.Property<string>("Ime")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Ime");

                    b.Property<int?>("IzglediD")
                        .HasColumnType("int");

                    b.Property<int>("Ocena")
                        .HasColumnType("int")
                        .HasColumnName("Ocena");

                    b.Property<string>("Reziser")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Reziser");

                    b.Property<string>("Slika")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Slika");

                    b.HasKey("ID");

                    b.HasIndex("IzglediD");

                    b.ToTable("Film");
                });

            modelBuilder.Entity("WebApi.Models.Izgled", b =>
                {
                    b.Property<int>("iD")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID")
                        .UseIdentityColumn();

                    b.HasKey("iD");

                    b.ToTable("Izgled");
                });

            modelBuilder.Entity("WebApi.Models.Kategorija", b =>
                {
                    b.Property<int>("IDKategorije")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("IDKategorije")
                        .UseIdentityColumn();

                    b.Property<int?>("FilmID")
                        .HasColumnType("int");

                    b.Property<string>("ImeKategorije")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("ImeKategorije");

                    b.HasKey("IDKategorije");

                    b.HasIndex("FilmID");

                    b.ToTable("Kategorije");
                });

            modelBuilder.Entity("WebApi.Models.Film", b =>
                {
                    b.HasOne("WebApi.Models.Izgled", "Izgled")
                        .WithMany("Filmovi")
                        .HasForeignKey("IzglediD");

                    b.Navigation("Izgled");
                });

            modelBuilder.Entity("WebApi.Models.Kategorija", b =>
                {
                    b.HasOne("WebApi.Models.Film", null)
                        .WithMany("Kategorije")
                        .HasForeignKey("FilmID");
                });

            modelBuilder.Entity("WebApi.Models.Film", b =>
                {
                    b.Navigation("Kategorije");
                });

            modelBuilder.Entity("WebApi.Models.Izgled", b =>
                {
                    b.Navigation("Filmovi");
                });
#pragma warning restore 612, 618
        }
    }
}
