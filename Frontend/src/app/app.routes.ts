import { Routes } from '@angular/router';
import { EcommerceComponent } from './pages/dashboard/ecommerce/ecommerce.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FormElementsComponent } from './pages/forms/form-elements/form-elements.component';
import { NaturalezaPage } from './pages//naturaleza/naturaleza.page';
import { LineaPage } from './pages/linea/linea.page';
import { SublineaPage } from './pages/sublinea/sublinea.page';
import { UnidadmedidaPage } from './pages/unidadmedida/unidadmedida.page';
import { ColorPage } from './pages/color/color.page';
import { ProductosPage } from './pages/productos/productos.page';
import { AlmacenPage } from './pages/almacen/almacen.page';
import { IngresosPage } from './pages/ingresos/ingresos.page';
import { EmpresatransportePage } from './pages/empresatransporte/empresatransporte.page';
import { ClientesPage } from './pages/clientes/clientes.page';
import { ProveedoresPage } from './pages/proveedores/proveedores.page';
import { VendedorPage } from './pages/vendedor/vendedor.page';
import { TransportistaPage } from './pages/transportista/transportista.page';
import { CondicionventaPage } from './pages/condicionventa/condicionventa.page';
import { ConceptoventaPage } from './pages/conceptoventa/conceptoventa.page';
import { DocumentosPage } from './pages/documentos/documentos.page';
import { SeriesPage } from './pages/series/series.page';
import { TipocambioPage } from './pages/tipocambio/tipocambio.page';
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
        component: AlmacenPage,
        title: 'Angular Almacenes Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path: 'empresa_transporte',
        component: EmpresatransportePage,
        title: 'Angular Almacenes Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path: 'transportista',
        component: TransportistaPage,
        title: 'Angular Almacenes Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path: 'naturaleza',
        component: NaturalezaPage,
        title: 'Angular Naturaleza Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path: 'linea',
        component: LineaPage,
        title: 'Angular Linea Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path: 'sublinea',
        component: SublineaPage,
        title: 'Angular Naturaleza Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path: 'unidadmedida',
        component: UnidadmedidaPage,
        title: 'Angular Unidad de Medida Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path: 'color',
        component: ColorPage,
        title: 'Angular Color Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path: 'productos',
        component: ProductosPage,
        title: 'Angular Productos Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path: 'clientes',
        component: ClientesPage,
        title: 'Angular Clientes Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path: 'proveedores',
        component: ProveedoresPage,
        title: 'Angular Proveedores Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path: 'vendedor',
        component: VendedorPage,
        title: 'Angular Vendedor Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path: 'condicion',
        component: CondicionventaPage,
        title: 'Angular Condicion Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path: 'concepto',
        component: ConceptoventaPage,
        title: 'Angular Concepto Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path: 'documentos',
        component: DocumentosPage,
        title: 'Angular Documentos Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path: 'series',
        component: SeriesPage,
        title: 'Angular Series Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path: 'tipocambio',
        component: TipocambioPage,
        title: 'Angular Tipo cambio Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path: 'ingresos',
        component: IngresosPage,
        title: 'Angular Ingresos Dashboard | TailAdmin - Angular Admin Dashboard Template'
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
  
];
