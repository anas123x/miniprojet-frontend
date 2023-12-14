
import { AdminLayoutComponent } from './admin-layout.component';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { BlocComponent } from 'src/app/bloc/bloc.component';
import { ChambreComponent } from 'src/app/chambre/chambre.component';
import { UpdateChambreComponent } from 'src/app/chambre/updatechambre/updatechambre.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AddchambreComponent } from 'src/app/chambre/addchambre/addchambre.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'blocs', component:BlocComponent },
    /*{
      path: 'chambre',
      component: ChambreComponent,
      children: [
        {
          path: 'updatechambres',
          loadChildren: () => import('../chambre/UpdateChambreComponent ').then(m => m.UpdateChambreComponent)
        }
      ]
    },*/
    
    { path: 'chambres', component:ChambreComponent},
    { path: 'chambres/updatechambres/:idChambre' , component:UpdateChambreComponent},
    { path: 'chambres/addchambre' , component:AddchambreComponent},
    { path: 'chambres/:nomBloc' , component:ChambreComponent}


]
