import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from "./login/login.component";
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home', component: HomeComponent, children: [
      { path: '', redirectTo: '/home/list', pathMatch: 'full' },
      { path: 'list', component: BlogListComponent },
      { path: 'detail/:id', component: BlogDetailComponent },
    ]
  },
  { path: 'edit', component: EditComponent },
]
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
