import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//instanciar al servicio
import { PersonaService } from '../../services/persona.service';
import { Router,ActivatedRoute }  from '@angular/router'

@Component({
  selector: 'app-persona-form-mantenimiento',
  templateUrl: './persona-form-mantenimiento.component.html',
  styleUrls: ['./persona-form-mantenimiento.component.css']
})
export class PersonaFormMantenimientoComponent implements OnInit {

  persona: FormGroup;
  titulo: string="";
  parametro: string;
  

  constructor(private personaService: PersonaService, private route: Router,
              private activatedRoute:ActivatedRoute) {
    this.persona = new FormGroup(
      {
        'iidpersona': new FormControl('0'),
        'nombre': new FormControl('',[Validators.required,Validators.maxLength(100)]),
        'apPaterno': new FormControl('',[Validators.required,Validators.maxLength(150)]),
        'apMaterno': new FormControl('',[Validators.required,Validators.maxLength(150)]),
        'telefono': new FormControl('',[Validators.required, Validators.maxLength(10)]),
        'correo': new FormControl('', [Validators.required, Validators.maxLength(100), Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]),
        'fechaNacimiento': new FormControl('', [Validators.required])
      }
      
    );
    this.activatedRoute.params.subscribe(_parametro=> {
      this.parametro = _parametro["id"];
      if (this.parametro == "nuevo") {
        this.titulo = "Agregando nueva persona";
      } else {
        this.titulo = "Editando Persona"


      }
    });

  }

  ngOnInit() {
    //Programar
    if (this.parametro != "nuevo")
    {
    
      this.personaService.recuperarPersona(this.parametro).subscribe(param => {
        this.persona.controls["iidpersona"].setValue(param.iidpersona);
        this.persona.controls["nombre"].setValue(param.nombre);
        this.persona.controls["apPaterno"].setValue(param.apPaterno);
        this.persona.controls["apMaterno"].setValue(param.apMaterno);
        this.persona.controls["telefono"].setValue(param.telefono);
        this.persona.controls["correo"].setValue(param.correo);
        this.persona.controls["fechaNacimiento"].setValue(param.fechaCadena);
      });
    }
  }

  guardarDatos() {
 
    if (this.persona.valid == true)
    {

      //YYYY-MM-DD
      var fechaNac = this.persona.controls["fechaNacimiento"].value.split("-");
      var anio = fechaNac[0];
      var mes = fechaNac[1];
      var dia = fechaNac[2];
      this.persona.controls["fechaNacimiento"].setValue(mes+"/"+dia+"/"+anio);
      this.personaService.agregarPersona(this.persona.value).subscribe(data => { this.route.navigate(["/mantenimientopersona"]) });
      //Validamos si es nuevo o editar

      /*if (this.parametro == "nuevo") {
        this.personaService.agregarPersona(this.persona.value).subscribe(data => { this.route.navigate(["/mantenimientopersona"]) });
      } else {

      }*/


      
    }
  }
}
