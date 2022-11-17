import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CostumerComponent } from './components/costumer/costumer.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {path:'home',component: HomeComponent},
  {path:'costumer/:id',component: CostumerComponent},
  {path:'', redirectTo:'/home', pathMatch:'full'},
  {path:'**', redirectTo:'/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
