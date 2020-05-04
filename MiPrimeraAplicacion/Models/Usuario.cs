using System;
using System.Collections.Generic;

namespace MiPrimeraAplicacion.Models
{
    public partial class Usuario
    {
        public int Iidusuario { get; set; }
        public string Nombreusuario { get; set; }
        public string Contra { get; set; }
        public int? Iidpersona { get; set; }
        public int? Bhabilitado { get; set; }
        public int? Iidtipousuario { get; set; }

        public Persona IidpersonaNavigation { get; set; }
        public TipoUsuario IidtipousuarioNavigation { get; set; }
    }
}
