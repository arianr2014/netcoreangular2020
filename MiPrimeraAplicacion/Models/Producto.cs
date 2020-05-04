using System;
using System.Collections.Generic;

namespace MiPrimeraAplicacion.Models
{
    public partial class Producto
    {
        public Producto()
        {
            DetalleVentaReserva = new HashSet<DetalleVentaReserva>();
        }

        public int Iidproducto { get; set; }
        public string Nombre { get; set; }
        public decimal? Precio { get; set; }
        public int? Iidcategoria { get; set; }
        public int? Bhabilitado { get; set; }
        public int? Stock { get; set; }
        public int? Iidmarca { get; set; }

        public Categoria IidcategoriaNavigation { get; set; }
        public Marca IidmarcaNavigation { get; set; }
        public ICollection<DetalleVentaReserva> DetalleVentaReserva { get; set; }
    }
}
