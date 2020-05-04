import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

//registrar componente creado
import { DiasSemana } from './components/DiasSemana/diasSemana.components'
import { ButtonAgregar } from './components/button/Button.component';
import { TablaProductoComponent } from './components/tabla-producto/tabla-producto.component'

import { ProductoService } from './services/Producto.Service'
import { CategoriaService } from './services/categoria.service'
import { PersonaService } from './services/persona.service'
import { UsuarioService } from './services/usuario.service'



import { HttpModule } from '@angular/http';
import { BuscadorProductoNombreComponent } from './components/buscador-producto-nombre/buscador-producto-nombre.component';
import { FiltradoProductoNombreComponent } from './components/filtrado-producto-nombre/filtrado-producto-nombre.component';
import { BuscadorProductoCategoriaComponent } from './components/buscador-producto-categoria/buscador-producto-categoria.component';
import { FiltradoProductoCategoriaComponent } from './components/filtrado-producto-categoria/filtrado-producto-categoria.component';
import { TablaPersonaComponent } from './components/tabla-persona/tabla-persona.component';
import { BuscadorPersonaNombreCompletoComponent } from './components/buscador-persona-nombre-completo/buscador-persona-nombre-completo.component';
import { FiltradoPersonaNombreCompletoComponent } from './components/filtrado-persona-nombre-completo/filtrado-persona-nombre-completo.component';
import { BuscadorUsuarioTipoUsuarioComponent } from './components/buscador-usuario-tipo-usuario/buscador-usuario-tipo-usuario.component';
import { FiltradoUsuarioTipoUsuarioComponent } from './components/filtrado-usuario-tipo-usuario/filtrado-usuario-tipo-usuario.component';
import { TablaUsuarioComponent } from './components/tabla-usuario/tabla-usuario.component';
import { MantenimientoPersonaComponent } from './components/mantenimiento-persona/mantenimiento-persona.component';
import { PersonaFormMantenimientoComponent } from './components/persona-form-mantenimiento/persona-form-mantenimiento.component';
import { MantenimientoProductoComponent } from './components/mantenimiento-producto/mantenimiento-producto.component';
import { ProductoFormMantenimientoComponent } from './components/producto-form-mantenimiento/producto-form-mantenimiento.component'


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ButtonAgregar,
    DiasSemana,
    TablaProductoComponent,
    BuscadorProductoNombreComponent,
    FiltradoProductoNombreComponent,
    BuscadorProductoCategoriaComponent,
    FiltradoProductoCategoriaComponent,
    TablaPersonaComponent,
    BuscadorPersonaNombreCompletoComponent,
    FiltradoPersonaNombreCompletoComponent,
    BuscadorUsuarioTipoUsuarioComponent,
    FiltradoUsuarioTipoUsuarioComponent,
    TablaUsuarioComponent,
    MantenimientoPersonaComponent,
    PersonaFormMantenimientoComponent,
    MantenimientoProductoComponent,
    ProductoFormMantenimientoComponent
  ],
  imports: [
    HttpModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'filtradoproductonombre', component: FiltradoProductoNombreComponent },
      { path: 'filtradoproductocategoria', component: FiltradoProductoCategoriaComponent },
      { path: 'filtradopersonanombrecompleto', component: FiltradoPersonaNombreCompletoComponent },
      { path: 'filtradotipousuario', component: FiltradoUsuarioTipoUsuarioComponent },
      { path: 'mantenimientopersona', component: MantenimientoPersonaComponent },
      { path: 'persona-form-mantenimiento/:id', component: PersonaFormMantenimientoComponent },
      { path: 'mantenimiento-producto', component: MantenimientoProductoComponent },
      { path: 'producto-form-mantenimiento/:id', component: ProductoFormMantenimientoComponent },

      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'diasemana', component: DiasSemana },
    ])
  ],
  providers: [ProductoService, CategoriaService, PersonaService, UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
