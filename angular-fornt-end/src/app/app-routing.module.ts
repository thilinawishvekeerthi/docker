import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridSettingComponent } from './grid-setting/grid-setting.component';
import { HomeComponent } from './home/home.component';
import { NavigationCenterComponent } from './navigation-center/navigation-center.component';

const routes: Routes = [
  {
    path:'',
    component: NavigationCenterComponent,
    children:[
      {
        path:'',
        component: HomeComponent
      },
      {
        path:'grid-setting',
        component: GridSettingComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
