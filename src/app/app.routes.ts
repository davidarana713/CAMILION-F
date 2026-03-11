import { Routes } from '@angular/router';

import { Home } from './features/pages/home/home';
import { Login } from './features/pages/login/login';
import { Register } from './features/pages/usuarios/register/register';
import { Ofertas } from './features/pages/oferta/ofertas/ofertas';
import { Creaoferta } from './features/pages/oferta/creaoferta/creaoferta';
import { Listaoferta } from './features/pages/oferta/listaoferta/listaoferta';
import { Contacto } from './features/pages/contacto/contacto';
import { Nosotros } from './features/pages/nosotros/nosotros';
import { Craproducto } from './features/pages/productos/craproducto/craproducto';
import { Creacategoria } from './features/pages/categorias/creacategoria/creacategoria';
import { Listaproducto } from './features/pages/productos/listaproducto/listaproducto';
import { Listacategorias } from './features/pages/categorias/listacategorias/listacategorias';
import { Editacategoria } from './features/pages/categorias/editacategoria/editacategoria';



export const routes: Routes = [
  {path:'home', component:Home},
  {path:'login',component:Login},
  {path:'register',component:Register},
  {path:'ofertas',component:Ofertas},
  {path:'creaoferta',component:Creaoferta},
  {path:'listaoferta',component:Listaoferta},
  {path:'contacto',component:Contacto},
  {path:'nosotros',component:Nosotros},
  {path:'craproducto',component:Craproducto},
  {path:'creacategoria',component:Creacategoria},
  {path:'listaproducto',component:Listaproducto},
  {path:'listacategoria',component:Listacategorias},
  {path:'editacategoria', component: Editacategoria},
  {path:'', redirectTo: "home", pathMatch: "full"},
  {path:"**", redirectTo: "home", pathMatch: "full"},
];
