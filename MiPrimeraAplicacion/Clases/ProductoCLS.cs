using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiPrimeraAplicacion.Clases
{
    public class ProductoCLS
    {
        public int idproducto { get; set; }
        public string nombre { get; set; }
        public decimal precio { get; set; }
        public int stock { get; set; }
        public string nombreCategoria { get; set; }

        public int idmarca { get; set; }

        public int idcategoria { get; set; }

    }
}
