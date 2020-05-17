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
import { NgxPaginationModule } from 'ngx-pagination';
import { MantenimientoUsuarioComponent } from './components/mantenimiento-usuario/mantenimiento-usuario.component';
import { UsuarioFormMantenimientoComponent } from './components/usuario-form-mantenimiento/usuario-form-mantenimiento.component';
import { LoginComponent } from './components/login/login.component';
import { PaginaErrorLoginComponent } from './components/pagina-error-login/pagina-error-login.component';
import { PermisoErrorPaginaComponent } from './components/permiso-error-pagina/permiso-error-pagina.component';

//Guards
import { SeguridadGuard } from './components/guards/seguridad.guard';
import { ComponenteBienvenidaComponent } from './components/componente-bienvenida/componente-bienvenida.component'

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
    ProductoFormMantenimientoComponent,
    MantenimientoUsuarioComponent,
    UsuarioFormMantenimientoComponent,
    LoginComponent,
    PaginaErrorLoginComponent,
    PermisoErrorPaginaComponent,
    ComponenteBienvenidaComponent
  ],
  imports: [
    HttpModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'filtradoproductonombre', component: FiltradoProductoNombreComponent, canActivate: [SeguridadGuard] }, //areyes canActivate: [SeguridadGuard] se usa para agregar seguridad de ingreso a la pagina
      { path: 'filtradoproductocategoria', component: FiltradoProductoCategoriaComponent, canActivate: [SeguridadGuard] },//areyes canActivate: [SeguridadGuard] se usa para agregar seguridad de ingreso a la pagina
      { path: 'filtradopersonanombrecompleto', component: FiltradoPersonaNombreCompletoComponent, canActivate: [SeguridadGuard] },//areyes canActivate: [SeguridadGuard] se usa para agregar seguridad de ingreso a la pagina
      { path: 'filtradotipousuario', component: FiltradoUsuarioTipoUsuarioComponent, canActivate: [SeguridadGuard]},
      { path: 'mantenimientopersona', component: MantenimientoPersonaComponent, canActivate: [SeguridadGuard]},
      { path: 'persona-form-mantenimiento/:id', component: PersonaFormMantenimientoComponent, canActivate: [SeguridadGuard]},
      { path: 'mantenimiento-producto', component: MantenimientoProductoComponent, canActivate: [SeguridadGuard]},
      { path: 'producto-form-mantenimiento/:id', component: ProductoFormMantenimientoComponent },
      { path: 'mantenimiento-usuario', component: MantenimientoUsuarioComponent, canActivate: [SeguridadGuard] },
      { path: 'usuario-form-mantenimiento/:id', component: UsuarioFormMantenimientoComponent, canActivate: [SeguridadGuard]},
      { path: 'login', component: LoginComponent },

      { path: 'pagina-error', component: PaginaErrorLoginComponent },
      { path: 'pagina-error-permiso', component: PermisoErrorPaginaComponent },
      { path: 'componente-bienvenida', component: ComponenteBienvenidaComponent },

      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'diasemana', component: DiasSemana },
    ])
  ],
  providers: [ProductoService, CategoriaService, PersonaService, UsuarioService, SeguridadGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
