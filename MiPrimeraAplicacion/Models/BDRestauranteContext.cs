using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace MiPrimeraAplicacion.Models
{
    public partial class BDRestauranteContext : DbContext
    {
        public BDRestauranteContext()
        {
        }

        public BDRestauranteContext(DbContextOptions<BDRestauranteContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Categoria> Categoria { get; set; }
        public virtual DbSet<DetalleVentaReserva> DetalleVentaReserva { get; set; }
        public virtual DbSet<Marca> Marca { get; set; }
        public virtual DbSet<Pagina> Pagina { get; set; }
        public virtual DbSet<PaginaTipoUsuario> PaginaTipoUsuario { get; set; }
        public virtual DbSet<Persona> Persona { get; set; }
        public virtual DbSet<Producto> Producto { get; set; }
        public virtual DbSet<Reserva> Reserva { get; set; }
        public virtual DbSet<Sede> Sede { get; set; }
        public virtual DbSet<TipoUsuario> TipoUsuario { get; set; }
        public virtual DbSet<Usuario> Usuario { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("server=SERVIDOR;database=BDRestaurante;Integrated Security=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Categoria>(entity =>
            {
                entity.HasKey(e => e.Iidcategoria);

                entity.Property(e => e.Iidcategoria).HasColumnName("IIDCATEGORIA");

                entity.Property(e => e.Bhabilitado).HasColumnName("BHABILITADO");

                entity.Property(e => e.Descripcion)
                    .HasColumnName("DESCRIPCION")
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Nombre)
                    .HasColumnName("NOMBRE")
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<DetalleVentaReserva>(entity =>
            {
                entity.HasKey(e => e.Iiddetalleventa);

                entity.Property(e => e.Iiddetalleventa).HasColumnName("IIDDETALLEVENTA");

                entity.Property(e => e.Cantidad).HasColumnName("CANTIDAD");

                entity.Property(e => e.Iidproducto).HasColumnName("IIDPRODUCTO");

                entity.Property(e => e.Iidreserva).HasColumnName("IIDRESERVA");

                entity.Property(e => e.Precio).HasColumnName("PRECIO");

                entity.Property(e => e.Subtotal).HasColumnName("SUBTOTAL");

                entity.HasOne(d => d.IidproductoNavigation)
                    .WithMany(p => p.DetalleVentaReserva)
                    .HasForeignKey(d => d.Iidproducto)
                    .HasConstraintName("FK_DetalleVentaReserva_Producto");

                entity.HasOne(d => d.IidreservaNavigation)
                    .WithMany(p => p.DetalleVentaReserva)
                    .HasForeignKey(d => d.Iidreserva)
                    .HasConstraintName("FK__DetalleVe__IIDRE__3B75D760");
            });

            modelBuilder.Entity<Marca>(entity =>
            {
                entity.HasKey(e => e.Iidmarca);

                entity.Property(e => e.Iidmarca)
                    .HasColumnName("IIDMARCA")
                    .ValueGeneratedNever();

                entity.Property(e => e.Bhabilitado).HasColumnName("BHABILITADO");

                entity.Property(e => e.Nombre)
                    .HasColumnName("NOMBRE")
                    .HasMaxLength(150)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Pagina>(entity =>
            {
                entity.HasKey(e => e.Iidpagina);

                entity.Property(e => e.Iidpagina).HasColumnName("IIDPAGINA");

                entity.Property(e => e.Accion)
                    .HasColumnName("ACCION")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Bhabilitado).HasColumnName("BHABILITADO");

                entity.Property(e => e.Mensaje)
                    .HasColumnName("MENSAJE")
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<PaginaTipoUsuario>(entity =>
            {
                entity.HasKey(e => e.Iidpaginatipousuario);

                entity.Property(e => e.Iidpaginatipousuario).HasColumnName("IIDPAGINATIPOUSUARIO");

                entity.Property(e => e.Bhabilitado).HasColumnName("BHABILITADO");

                entity.Property(e => e.Iidpagina).HasColumnName("IIDPAGINA");

                entity.Property(e => e.Iidtipousuario).HasColumnName("IIDTIPOUSUARIO");

                entity.HasOne(d => d.IidpaginaNavigation)
                    .WithMany(p => p.PaginaTipoUsuario)
                    .HasForeignKey(d => d.Iidpagina)
                    .HasConstraintName("FK__PaginaTip__IIDPA__267ABA7A");

                entity.HasOne(d => d.IidtipousuarioNavigation)
                    .WithMany(p => p.PaginaTipoUsuario)
                    .HasForeignKey(d => d.Iidtipousuario)
                    .HasConstraintName("FK__PaginaTip__IIDTI__276EDEB3");
            });

            modelBuilder.Entity<Persona>(entity =>
            {
                entity.HasKey(e => e.Iidpersona);

                entity.Property(e => e.Iidpersona).HasColumnName("IIDPERSONA");

                entity.Property(e => e.Apmaterno)
                    .HasColumnName("APMATERNO")
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Appaterno)
                    .HasColumnName("APPATERNO")
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Bhabilitado).HasColumnName("BHABILITADO");

                entity.Property(e => e.Btieneusuario).HasColumnName("BTIENEUSUARIO");

                entity.Property(e => e.Correo)
                    .HasColumnName("CORREO")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Fechanacimiento)
                    .HasColumnName("FECHANACIMIENTO")
                    .HasColumnType("date");

                entity.Property(e => e.Nombre)
                    .HasColumnName("NOMBRE")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Telefono)
                    .HasColumnName("TELEFONO")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Producto>(entity =>
            {
                entity.HasKey(e => e.Iidproducto);

                entity.Property(e => e.Iidproducto).HasColumnName("IIDPRODUCTO");

                entity.Property(e => e.Bhabilitado).HasColumnName("BHABILITADO");

                entity.Property(e => e.Iidcategoria).HasColumnName("IIDCATEGORIA");

                entity.Property(e => e.Iidmarca).HasColumnName("IIDMARCA");

                entity.Property(e => e.Nombre)
                    .HasColumnName("NOMBRE")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Precio).HasColumnName("PRECIO");

                entity.Property(e => e.Stock).HasColumnName("STOCK");

                entity.HasOne(d => d.IidcategoriaNavigation)
                    .WithMany(p => p.Producto)
                    .HasForeignKey(d => d.Iidcategoria)
                    .HasConstraintName("FK_Producto_Categoria");

                entity.HasOne(d => d.IidmarcaNavigation)
                    .WithMany(p => p.Producto)
                    .HasForeignKey(d => d.Iidmarca)
                    .HasConstraintName("FK__Producto__IIDMAR__3F466844");
            });

            modelBuilder.Entity<Reserva>(entity =>
            {
                entity.HasKey(e => e.Iidreserva);

                entity.Property(e => e.Iidreserva).HasColumnName("IIDRESERVA");

                entity.Property(e => e.Bhabilitado).HasColumnName("BHABILITADO");

                entity.Property(e => e.Cantidadpersonas).HasColumnName("CANTIDADPERSONAS");

                entity.Property(e => e.Fechareserva)
                    .HasColumnName("FECHARESERVA")
                    .HasColumnType("datetime");

                entity.Property(e => e.Iidpersonaregistra).HasColumnName("IIDPERSONAREGISTRA");

                entity.Property(e => e.Iidpersonasolicita).HasColumnName("IIDPERSONASOLICITA");

                entity.Property(e => e.Iidsede).HasColumnName("IIDSEDE");

                entity.Property(e => e.Observaciones)
                    .HasColumnName("OBSERVACIONES")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Telefonocontacto)
                    .HasColumnName("TELEFONOCONTACTO")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Total).HasColumnName("total");

                entity.HasOne(d => d.IidpersonaregistraNavigation)
                    .WithMany(p => p.ReservaIidpersonaregistraNavigation)
                    .HasForeignKey(d => d.Iidpersonaregistra)
                    .HasConstraintName("FK__Reserva__IIDPERS__3C69FB99");

                entity.HasOne(d => d.IidpersonasolicitaNavigation)
                    .WithMany(p => p.ReservaIidpersonasolicitaNavigation)
                    .HasForeignKey(d => d.Iidpersonasolicita)
                    .HasConstraintName("FK_Reserva_Persona");

                entity.HasOne(d => d.IidsedeNavigation)
                    .WithMany(p => p.Reserva)
                    .HasForeignKey(d => d.Iidsede)
                    .HasConstraintName("FK_Reserva_Sede");
            });

            modelBuilder.Entity<Sede>(entity =>
            {
                entity.HasKey(e => e.Iidsede);

                entity.Property(e => e.Iidsede).HasColumnName("IIDSEDE");

                entity.Property(e => e.Bhabilitado).HasColumnName("BHABILITADO");

                entity.Property(e => e.Descripcion)
                    .HasColumnName("DESCRIPCION")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Nombre)
                    .HasColumnName("NOMBRE")
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TipoUsuario>(entity =>
            {
                entity.HasKey(e => e.Iidtipousuario);

                entity.Property(e => e.Iidtipousuario).HasColumnName("IIDTIPOUSUARIO");

                entity.Property(e => e.Bhabilitado).HasColumnName("BHABILITADO");

                entity.Property(e => e.Descripcion)
                    .HasColumnName("DESCRIPCION")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Nombre)
                    .HasColumnName("NOMBRE")
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.Iidusuario);

                entity.Property(e => e.Iidusuario).HasColumnName("IIDUSUARIO");

                entity.Property(e => e.Bhabilitado).HasColumnName("BHABILITADO");

                entity.Property(e => e.Contra)
                    .HasColumnName("CONTRA")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Iidpersona).HasColumnName("IIDPERSONA");

                entity.Property(e => e.Iidtipousuario).HasColumnName("IIDTIPOUSUARIO");

                entity.Property(e => e.Nombreusuario)
                    .HasColumnName("NOMBREUSUARIO")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.IidpersonaNavigation)
                    .WithMany(p => p.Usuario)
                    .HasForeignKey(d => d.Iidpersona)
                    .HasConstraintName("FK_Usuario_Persona");

                entity.HasOne(d => d.IidtipousuarioNavigation)
                    .WithMany(p => p.Usuario)
                    .HasForeignKey(d => d.Iidtipousuario)
                    .HasConstraintName("FK__Usuario__IIDTIPO__1CF15040");
            });
        }
    }
}
