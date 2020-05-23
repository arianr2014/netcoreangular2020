using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using Microsoft.AspNetCore.Mvc;
using MiPrimeraAplicacion.Clases;
using MiPrimeraAplicacion.Models;



using Microsoft.AspNetCore.Session;
using Microsoft.AspNetCore.Http;


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
                                              nombreTipoUsuario = tipousuario.Nombre


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
        public IEnumerable<UsuarioCLS> ListarUsuarioPorTipo(int idTipo = 0)
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {

                List<UsuarioCLS> lista = (from usuario in bd.Usuario
                                          join persona in bd.Persona
                                          on usuario.Iidpersona equals persona.Iidpersona
                                          join tipousuario in bd.TipoUsuario
                                          on usuario.Iidtipousuario equals tipousuario.Iidtipousuario
                                          where usuario.Bhabilitado == 1
                                          && usuario.Iidtipousuario == idTipo
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


        [HttpGet]
        [Route("api/usuario/validarUsuario/{idUsuario}/{nombre}")]
        public int ValidarUsuario(int idUsuario, string nombre)
        {

            int rpta = 0;
            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    if (idUsuario == 0) {

                        rpta = bd.Usuario.Where(p => p.Nombreusuario.ToUpper() == nombre.ToUpper()).Count();
                    }
                    else
                    {
                        rpta = bd.Usuario.Where(p => p.Nombreusuario.ToUpper() == nombre.ToUpper() && p.Iidpersona != idUsuario).Count();
                    }
                }
            }
            catch (Exception ex)
            {
                rpta = 0;
            }

            return rpta;
        }


        [HttpGet]
        [Route("api/usuario/recuperarUsuario/{iidUsuario}")]
        public UsuarioCLS RecuperarUsuario(int iidUsuario)
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                UsuarioCLS oUsuarioCLS = new UsuarioCLS();
                Usuario oUsuario = bd.Usuario.Where(p => p.Iidusuario == iidUsuario).First();
                oUsuarioCLS.iidusuario = oUsuario.Iidusuario;
                oUsuarioCLS.nombreUsuario = oUsuario.Nombreusuario;
                oUsuarioCLS.iidTipoUsuario = (int)oUsuario.Iidtipousuario;

                return oUsuarioCLS;

            }


        }

        [HttpPost]
        [Route("api/usuario/guardarDatos")]
        public int GuardarDatos([FromBody]UsuarioCLS oUsuarioCLS) {

            int rpta = 0;
            try {

                using (BDRestauranteContext bd = new BDRestauranteContext())
                {

                    using (var transaccion = new TransactionScope())
                    {
                        if (oUsuarioCLS.iidusuario == 0)
                        {
                            Usuario oUsuario = new Usuario();
                            oUsuario.Nombreusuario = oUsuarioCLS.nombreUsuario;
                            //cifra clave
                            SHA256Managed sha = new SHA256Managed();
                            string clave = oUsuarioCLS.contra;
                            byte[] dataNoCifrada = Encoding.Default.GetBytes(clave);

                            byte[] dataCifrada = sha.ComputeHash(dataNoCifrada);
                            string claveCifrada = BitConverter.ToString(dataCifrada).Replace("-", "");
                            oUsuario.Contra = claveCifrada;
                            oUsuario.Iidpersona = oUsuarioCLS.iidPersona;
                            oUsuario.Iidtipousuario = oUsuarioCLS.iidTipoUsuario;
                            oUsuario.Bhabilitado = 1;
                            bd.Usuario.Add(oUsuario);


                            Persona opersona = bd.Persona.Where(p => p.Iidpersona == oUsuarioCLS.iidPersona).First();
                            opersona.Btieneusuario = 1;

                            bd.SaveChanges();

                            transaccion.Complete();

                            rpta = 1;

                        }
                        else {


                            Usuario oUsuario = bd.Usuario.Where(p => p.Iidusuario == oUsuarioCLS.iidusuario).First();

                            oUsuario.Nombreusuario = oUsuarioCLS.nombreUsuario;
                            oUsuario.Iidtipousuario = oUsuarioCLS.iidTipoUsuario;
                            bd.SaveChanges();

                            transaccion.Complete();

                            rpta = 1;
                        }
                    }

                }
            }
            catch (Exception ex) {
                rpta = 0;
            }

            return rpta;
        }


        [HttpGet]
        [Route("api/usuario/eliminarTipoUsuario/{idTipoUsuario}")]
        public int EliminarTipoUsuario(int idTipoUsuario)
        {

            int rpta = 0;
            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {

                    TipoUsuario oTipoUsuario = bd.TipoUsuario.Where(p => p.Iidtipousuario == idTipoUsuario).First();
                    oTipoUsuario.Bhabilitado = 0;
                    bd.SaveChanges();
                }

                rpta = 1;
            }
            catch (Exception ex)
            {
                rpta = 0;
            }
            return rpta;
        }


        [HttpGet]
        [Route("api/usuario/eliminarUsuario/{idUsuario}")]
        public int EliminarUsuario(int idUsuario) {

            int rpta = 0;
            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext()) {

                    Usuario oUsuario = bd.Usuario.Where(p => p.Iidusuario == idUsuario).First();
                    oUsuario.Bhabilitado = 0;
                    bd.SaveChanges();
                }

                rpta = 1;
            }
            catch (Exception ex) {
                rpta = 0;
            }
            return rpta;
        }

        [HttpPost]
        [Route("api/usuario/login")]
        public UsuarioCLS login([FromBody]UsuarioCLS oUsuarioCLS)
        {

            int rpta = 0;
            UsuarioCLS ousuario = new UsuarioCLS();
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {


                SHA256Managed sha = new SHA256Managed();
                byte[] dataNoCifrada = Encoding.Default.GetBytes(oUsuarioCLS.contra);
                byte[] dataCifrada = sha.ComputeHash(dataNoCifrada);
                string claveCifrada = BitConverter.ToString(dataCifrada).Replace("-", "");

                rpta = bd.Usuario.Where(p => p.Nombreusuario.ToUpper() == oUsuarioCLS.nombreUsuario.ToUpper() && p.Contra == claveCifrada).Count();

                if (rpta == 1)
                {
                    Usuario oUsuario = bd.Usuario.Where(p => p.Nombreusuario.ToUpper() == oUsuarioCLS.nombreUsuario.ToUpper() && p.Contra == claveCifrada).First();

                    HttpContext.Session.SetString("usuario", oUsuario.Iidusuario.ToString());
                    HttpContext.Session.SetString("tipoUsuario", oUsuario.Iidtipousuario.ToString());

                    ousuario.iidusuario = oUsuario.Iidusuario;
                    ousuario.nombreUsuario = oUsuario.Nombreusuario;

                }
                else {
                    ousuario.iidusuario = 0;
                    ousuario.nombreUsuario = "";
                }
            }
            return ousuario;
        }

        [HttpGet]
        [Route("api/usuario/obtenerVariableSesion")]
        public SeguridadCLS ObtenerVariableSesion() {
            SeguridadCLS oSeguridadCLS = new SeguridadCLS();
            

            string variableSession = HttpContext.Session.GetString("usuario");
           
            if (variableSession == null)
            {
                oSeguridadCLS.valor = "";
            }
            else {
                oSeguridadCLS.valor = variableSession;

                List<PaginaCLS> listaPagina = new List<PaginaCLS>();
                int idTipoUsuario = int.Parse(HttpContext.Session.GetString("tipoUsuario"));
                int idUsuario = int.Parse(HttpContext.Session.GetString("usuario"));

                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    listaPagina = (from usuario in bd.Usuario
                                     join tipoUsuario in bd.TipoUsuario
                                     on usuario.Iidtipousuario equals tipoUsuario.Iidtipousuario
                                     join paginaTipo in bd.PaginaTipoUsuario
                                     on usuario.Iidtipousuario equals paginaTipo.Iidtipousuario
                                     join pagina in bd.Pagina
                                     on paginaTipo.Iidpagina equals pagina.Iidpagina
                                     where usuario.Iidusuario == idUsuario
                                     && usuario.Iidtipousuario == idTipoUsuario
                                     select new PaginaCLS
                                     {


                                         accion = pagina.Accion.Substring(1)//areyes no consideramos el primer caracter

                                     }).ToList();

                    oSeguridadCLS.lista = listaPagina;

                }

            }
            return oSeguridadCLS;
        }


        [HttpGet] 
        [Route("api/usuario/listarPaginas")]
        public List<PaginaCLS> ListarPaginas() {

            List<PaginaCLS> listaPagina = new List<PaginaCLS>();
            int idTipoUsuario =int.Parse(HttpContext.Session.GetString("tipoUsuario"));

            using (BDRestauranteContext bd = new BDRestauranteContext()) {
                listaPagina = (from paginaTipo in bd.PaginaTipoUsuario
                               join pagina in bd.Pagina
                               on paginaTipo.Iidpagina equals pagina.Iidpagina
                               where paginaTipo.Bhabilitado == 1
                               && paginaTipo.Iidtipousuario == idTipoUsuario
                               select new PaginaCLS
                               {
                                   iidPagina = pagina.Iidpagina,
                                   accion = pagina.Accion,
                                   mensaje = pagina.Mensaje,
                                   bhabilitado = (int)pagina.Bhabilitado

                               }).ToList();

            }
            return listaPagina;
        }

        [HttpGet]
        [Route("api/usuario/cerrarSesion")]
        public SeguridadCLS CerraSesion() {
            SeguridadCLS oSeguridadCLS = new SeguridadCLS();
            try
            {
                HttpContext.Session.Remove("usuario");
                HttpContext.Session.Remove("tipoUsuario");
                oSeguridadCLS.valor = "OK";

            }
            catch (Exception ex) {
                oSeguridadCLS.valor = "";
            }

            return oSeguridadCLS;
        }


    }


  
}