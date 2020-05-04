using System;
using System.Collections.Generic;

namespace MiPrimeraAplicacion.Models
{
    public partial class Persona
    {
        public Persona()
        {
            ReservaIidpersonaregistraNavigation = new HashSet<Reserva>();
            ReservaIidpersonasolicitaNavigation = new HashSet<Reserva>();
            Usuario = new HashSet<Usuario>();
        }

        public int Iidpersona { get; set; }
        public string Nombre { get; set; }
        public string Appaterno { get; set; }
        public string Apmaterno { get; set; }
        public string Telefono { get; set; }
        public string Correo { get; set; }
        public DateTime? Fechanacimiento { get; set; }
        public int? Bhabilitado { get; set; }
        public int? Btieneusuario { get; set; }

        public ICollection<Reserva> ReservaIidpersonaregistraNavigation { get; set; }
        public ICollection<Reserva> ReservaIidpersonasolicitaNavigation { get; set; }
        public ICollection<Usuario> Usuario { get; set; }
    }
}
