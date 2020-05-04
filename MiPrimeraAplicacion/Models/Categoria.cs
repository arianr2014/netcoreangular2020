using System;
using System.Collections.Generic;

namespace MiPrimeraAplicacion.Models
{
    public partial class Categoria
    {
        public Categoria()
        {
            Producto = new HashSet<Producto>();
        }

        public int Iidcategoria { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public int? Bhabilitado { get; set; }

        public ICollection<Producto> Producto { get; set; }
    }
}
