import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UnitComponent} from "./components/unit/unit.component";
import {MainComponent} from "./components/main/main.component";

const routes: Routes = [
  {path:'', component: MainComponent},
  {path:'unit', component:UnitComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
