using System;
using System.Collections.Generic;

namespace MiPrimeraAplicacion.Models
{
    public partial class TipoUsuario
    {
        public TipoUsuario()
        {
            PaginaTipoUsuario = new HashSet<PaginaTipoUsuario>();
            Usuario = new HashSet<Usuario>();
        }

        public int Iidtipousuario { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public int? Bhabilitado { get; set; }

        public ICollection<PaginaTipoUsuario> PaginaTipoUsuario { get; set; }
        public ICollection<Usuario> Usuario { get; set; }
    }
}
