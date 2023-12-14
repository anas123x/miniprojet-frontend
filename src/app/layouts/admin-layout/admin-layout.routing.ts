import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { ListFoyerComponent } from 'src/app/Foyer/list-foyer/list-foyer.component';
import { AddFoyerComponent } from 'src/app/Foyer/add-foyer/add-foyer.component';
import { ModifierFoyerComponent } from 'src/app/Foyer/modifier-foyer/modifier-foyer.component';
import {AfficherblocsComponent} from "../../Foyer/afficherblocs/afficherblocs.component";

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
  { path: 'maps', component: MapsComponent },
  { path: 'foyers', component: ListFoyerComponent },
  { path: 'add-foyer', component: AddFoyerComponent },
  {path:'edit-foyer/:foyer-id', component: ModifierFoyerComponent},
  {path:'afficher-bloc/:foyer-id', component: AfficherblocsComponent}
]
