import { Routes } from '@angular/router';
import { EcommerceComponent } from './pages/dashboard/ecommerce/ecommerce.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FormElementsComponent } from './pages/forms/form-elements/form-elements.component';
import { BlankComponent } from './pages/blank/blank.component';
import { NaturalezaComponent } from './shared/components/naturaleza/naturaleza.component';
import { LineaComponent } from './shared/components/linea/linea.component';
import { SublineaComponent } from './shared/components/sublinea/sublinea.component';
import { UnidadMedidaComponent } from './shared/components/unidadmedida/unidadmedida.component';
import { ColorComponent } from './shared/components/color/color.component';
import { ProductosComponent } from './shared/components/productos/productos.component';
import { AlmacenesComponent } from './shared/components/almacenes/almacenes.component';
import { Empresa_transporteComponent } from './shared/components/empresa_transporte/empresa_transporte.component';
import { ClientesComponent } from './shared/components/clientes/clientes.component';
import { ProveedoresComponent } from './shared/components/proveedores/proveedores.component';
import { VendedorComponent } from './shared/components/vendedor/vendedor.component';
import { TransportistaComponent } from './shared/components/transportista/transportista.component';
import { CondicionComponent } from './shared/components/condicion/condicion.component';
import { ConceptoComponent } from './shared/components/concepto/concepto.component';
import { NotFoundComponent } from './pages/other-page/not-found/not-found.component';
import { AppLayoutComponent } from './shared/layout/app-layout/app-layout.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { BadgesComponent } from './pages/ui-elements/badges/badges.component';
import { SignInComponent } from './pages/auth-pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/auth-pages/sign-up/sign-up.component';
import { CalenderComponent } from './pages/calender/calender.component';
import { AuthGuard } from './core/guards/auth.guard'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'almacenes',
        component: AlmacenesComponent,
        title: 'Angular Almacenes Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path: 'empresa_transporte',
        component: Empresa_transporteComponent,
        title: 'Angular Almacenes Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path: 'transportista',
        component: TransportistaComponent,
        title: 'Angular Almacenes Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path: 'naturaleza',
        component: NaturalezaComponent,
        title: 'Angular Naturaleza Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path: 'linea',
        component: LineaComponent,
        title: 'Angular Linea Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path: 'sublinea',
        component: SublineaComponent,
        title: 'Angular Naturaleza Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path: 'unidadmedida',
        component: UnidadMedidaComponent,
        title: 'Angular Unidad de Medida Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path: 'color',
        component: ColorComponent,
        title: 'Angular Color Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path: 'productos',
        component: ProductosComponent,
        title: 'Angular Productos Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path: 'clientes',
        component: ClientesComponent,
        title: 'Angular Clientes Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path: 'proveedores',
        component: ProveedoresComponent,
        title: 'Angular Proveedores Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path: 'vendedor',
        component: VendedorComponent,
        title: 'Angular Vendedor Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path: 'condicion',
        component: CondicionComponent,
        title: 'Angular Condicion Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path: 'concepto',
        component: ConceptoComponent,
        title: 'Angular Concepto Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path: 'dashboard',
        component: EcommerceComponent,
       
        pathMatch: 'full',
        title:
          'Angular Ecommerce Dashboard | TailAdmin - Angular Admin Dashboard Template',
      },
      {
        path: 'calendar',
        component: CalenderComponent,
        title: 'Angular Calender | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path: 'profile',
        component: ProfileComponent,
        title: 'Angular Profile Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path: 'form-elements',
        component: FormElementsComponent,
        title: 'Angular Form Elements Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path: 'blank',
        component: BlankComponent,
        title: 'Angular Blank Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      // support tickets
      {
        path: 'invoice',
        component: InvoicesComponent,
        title: 'Angular Invoice Details Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path: 'badge',
        component: BadgesComponent,
        title: 'Angular Badges Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
    ]
  },
  // auth pages
  {
    path: 'signin',
    component: SignInComponent,
    title: 'Angular Sign In Dashboard | TailAdmin - Angular Admin Dashboard Template'
  },
  {
    path: 'signup',
    component: SignUpComponent,
    title: 'Angular Sign Up Dashboard | TailAdmin - Angular Admin Dashboard Template'
  },
  // error pages
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Angular NotFound Dashboard | TailAdmin - Angular Admin Dashboard Template'
  },
  
];
