using System;
using System.Collections.Generic;

namespace MiPrimeraAplicacion.Models
{
    public partial class Pagina
    {
        public Pagina()
        {
            PaginaTipoUsuario = new HashSet<PaginaTipoUsuario>();
        }

        public int Iidpagina { get; set; }
        public string Mensaje { get; set; }
        public string Accion { get; set; }
        public int? Bhabilitado { get; set; }

        public ICollection<PaginaTipoUsuario> PaginaTipoUsuario { get; set; }
    }
}
