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
            using (BDRestauranteContext bd= new BDRestauranteContext())
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
        public int GuardarDatos(UsuarioCLS oUsuarioCLS) {

            int rpta = 0;
            try {

                using (BDRestauranteContext bd= new BDRestauranteContext())
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

                            byte[] dataCifrada= sha.ComputeHash(dataNoCifrada);
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



    }


  
}