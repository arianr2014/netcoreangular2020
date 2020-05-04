using System;
using System.Collections.Generic;

namespace MiPrimeraAplicacion.Models
{
    public partial class Marca
    {
        public Marca()
        {
            Producto = new HashSet<Producto>();
        }

        public int Iidmarca { get; set; }
        public string Nombre { get; set; }
        public int? Bhabilitado { get; set; }

        public ICollection<Producto> Producto { get; set; }
    }
}
