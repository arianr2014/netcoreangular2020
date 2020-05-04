using System;
using System.Collections.Generic;

namespace MiPrimeraAplicacion.Models
{
    public partial class Sede
    {
        public Sede()
        {
            Reserva = new HashSet<Reserva>();
        }

        public int Iidsede { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public int? Bhabilitado { get; set; }

        public ICollection<Reserva> Reserva { get; set; }
    }
}
