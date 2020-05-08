using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MiPrimeraAplicacion.Clases;
using MiPrimeraAplicacion.Models;

namespace MiPrimeraAplicacion.Controllers
{
    public class PersonaController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("api/Persona/listarPersonas")]
        public IEnumerable<PersonaCLS> ListarPersonas()
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {

                List<PersonaCLS> lista = (from persona in bd.Persona
                                           where persona.Bhabilitado == 1
                                           select new PersonaCLS
                                           {
                                               iidpersona = persona.Iidpersona,
                                               nombreCompleto = persona.Nombre + " "+persona.Appaterno + " " + persona.Apmaterno,
                                               telefono = persona.Telefono,
                                               correo = persona.Correo,
                                               //fechaNacimiento = (DateTime)persona.Fechanacimiento

                                           }).ToList();
                return lista;
            }
        }


        [HttpGet]
        [Route("api/Persona/filtarPersona/{nombrecompleto?}")]
        public IEnumerable<PersonaCLS> FiltarPersona(string nombrecompleto="")
        {
            List<PersonaCLS> lista;
            if ("".Equals(nombrecompleto))
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {

                    lista = (from persona in bd.Persona
                             where persona.Bhabilitado == 1

                             select new PersonaCLS
                             {
                                 iidpersona = persona.Iidpersona,
                                 nombreCompleto = persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno,
                                 telefono = persona.Telefono,
                                 correo = persona.Correo,
                                 fechaNacimiento = (DateTime)persona.Fechanacimiento

                             }).ToList();

                }
            }
            else {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {

                    lista = (from persona in bd.Persona
                             where persona.Bhabilitado == 1
                             && (persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno).ToUpper().Contains(nombrecompleto.ToUpper())
                             select new PersonaCLS
                             {
                                 iidpersona = persona.Iidpersona,
                                 nombreCompleto = persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno,
                                 telefono = persona.Telefono,
                                 correo = persona.Correo,
                                 fechaNacimiento = (DateTime)persona.Fechanacimiento

                             }).ToList();

                }
            }
           

            return lista;
        }


        [HttpPost]
        [Route("api/Persona/guardarPersona")]
        public int GuardarPersona([FromBody]PersonaCLS oPersonaCLS)
        {
            int rpta = 0;
            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    if (oPersonaCLS.iidpersona == 0)
                    {
                        Persona oPersona = new Persona();
                        oPersona.Iidpersona = oPersonaCLS.iidpersona;
                        oPersona.Nombre = oPersonaCLS.nombre;
                        oPersona.Appaterno = oPersonaCLS.apPaterno;
                        oPersona.Apmaterno = oPersonaCLS.apMaterno;
                        oPersona.Correo = oPersonaCLS.correo;
                        oPersona.Telefono = oPersonaCLS.telefono;
                        oPersona.Fechanacimiento = oPersonaCLS.fechaNacimiento;
                        oPersona.Bhabilitado = 1;
                        bd.Persona.Add(oPersona);
                        bd.SaveChanges();
                        rpta = 1;
                    }
                    else {
                        Persona oPersona = bd.Persona.Where(p => p.Iidpersona == oPersonaCLS.iidpersona).First();
                        oPersona.Nombre = oPersonaCLS.nombre;
                        oPersona.Appaterno = oPersonaCLS.apPaterno;
                        oPersona.Apmaterno = oPersonaCLS.apMaterno;
                        oPersona.Correo = oPersonaCLS.correo;
                        oPersona.Telefono = oPersonaCLS.telefono;
                        oPersona.Fechanacimiento = oPersonaCLS.fechaNacimiento;
                        bd.SaveChanges();
                        rpta = 1;
                    }
                }

            }
            catch (Exception ex) {
                rpta = 0;
            }
            return rpta;
        }

        [HttpGet]
        [Route("api/Persona/recuperarPersona/{idPersona}")]
        public PersonaCLS RecuperarPersona(int idPersona)
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {

                PersonaCLS personaClS =(from persona in bd.Persona
                                   where persona.Bhabilitado == 1
                                   && persona.Iidpersona==idPersona
                                        select new PersonaCLS
                                    {
                                        iidpersona = persona.Iidpersona,
                                        nombre = persona.Nombre ,
                                        apPaterno = persona.Appaterno,
                                        apMaterno= persona.Apmaterno,
                                        telefono = persona.Telefono,
                                        correo = persona.Correo,
                                        fechaCadena= persona.Fechanacimiento!=null?((DateTime)persona.Fechanacimiento).ToString("yyyy-MM-dd"):""
                                    }).First();
                return personaClS;
            }
        }



        [HttpGet]
        [Route("api/Persona/eliminarPersona/{idPersona}")]
        public int EliminarPersona(int idPersona)
        {
            int rpta = 0;
            try {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {

                    Persona oPersona = bd.Persona.Where(p => p.Iidpersona == idPersona).First();
                    oPersona.Bhabilitado = 0;
                    bd.SaveChanges();
                    rpta = 1;
                }
            }
            catch (Exception ex) {
                rpta = 0;
            }
            return rpta;

        }


        [HttpGet]
        [Route("api/Persona/validarCorreo/{id}/{correo}")]
        public int ValidarCorreo(int id, string correo)
        {
            int rpta = 0;
            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    if (id == 0) {
                        //cuando id es 0 es un registro nuevo
                        rpta = bd.Persona.Where(p => p.Correo.ToUpper() == correo.ToUpper()).Count();
                    }
                    else
                    {
                        //contar cuantos hay sin contar el mismo registro
                        rpta = bd.Persona.Where(p => p.Correo.ToUpper() == correo.ToUpper() && p.Iidpersona!=id).Count();

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
        [Route("api/Persona/listarPersonasCombo")]
        public IEnumerable<PersonaCLS> ListarPersonasCombo()
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {

                List<PersonaCLS> lista = (from persona in bd.Persona
                                          where persona.Bhabilitado == 1
                                          && persona.Btieneusuario==0
                                          select new PersonaCLS
                                          {
                                              iidpersona = persona.Iidpersona,
                                              nombreCompleto = persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno,
                                              
                                          }).ToList();
                return lista;
            }
        }



    }
}