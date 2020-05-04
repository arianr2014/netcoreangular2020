using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MiPrimeraAplicacion.Clases;
using MiPrimeraAplicacion.Models;


namespace MiPrimeraAplicacion.Controllers
{
    public class UsuarioController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("api/Usuario/listarTipoUsuario")]
        public IEnumerable<TipoUsuarioCLS> ListarTipoUsuario()
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {

                List<TipoUsuarioCLS> lista = (from tipousuario in bd.TipoUsuario
                                              where tipousuario.Bhabilitado == 1
                                              select new TipoUsuarioCLS
                                              {
                                                  iidtipousuario = tipousuario.Iidtipousuario,
                                                  nombre = tipousuario.Nombre

                                              }).ToList();
                return lista;
            }
        }


        [HttpGet]
        [Route("api/Usuario/listarUsuario")]
        public IEnumerable<UsuarioCLS> ListarUsuario()
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {

                List<UsuarioCLS> lista = (from usuario in bd.Usuario
                                          join persona in bd.Persona
                                          on usuario.Iidpersona equals persona.Iidpersona
                                          join tipousuario in bd.TipoUsuario
                                          on usuario.Iidtipousuario equals tipousuario.Iidtipousuario
                                          where usuario.Bhabilitado == 1
                                          select new UsuarioCLS
                                          {
                                              iidusuario = usuario.Iidusuario,
                                              nombrePersona = persona.Nombre + " " + persona.Apmaterno + " " + persona.Apmaterno,
                                              nombreUsuario = usuario.Nombreusuario,
                                              nombreTipoUsuario=tipousuario.Nombre


                                              }).ToList();
                return lista;
            }
        }

        [HttpGet]
        /*
         cuando se pone signo de interrogacion el envio del parametro es
         opcional se tiene que colocar un valor por defecto
        */
        [Route("api/Usuario/listarUsuarioPorTipo/{idTipo?}")]
        public IEnumerable<UsuarioCLS> ListarUsuarioPorTipo(int idTipo=0)
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {

                List<UsuarioCLS> lista = (from usuario in bd.Usuario
                                          join persona in bd.Persona
                                          on usuario.Iidpersona equals persona.Iidpersona
                                          join tipousuario in bd.TipoUsuario
                                          on usuario.Iidtipousuario equals tipousuario.Iidtipousuario
                                          where usuario.Bhabilitado == 1
                                          && usuario.Iidtipousuario==idTipo
                                          select new UsuarioCLS
                                          {
                                              iidusuario = usuario.Iidusuario,
                                              nombrePersona = persona.Nombre + " " + persona.Apmaterno + " " + persona.Apmaterno,
                                              nombreUsuario = usuario.Nombreusuario,
                                              nombreTipoUsuario = tipousuario.Nombre


                                          }).ToList();
                return lista;
            }
        }
    }


  
}