import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from "./login/login.component";
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { SourceComponent } from './source/source.component';


const routes: Routes = [
  { path: '', redirectTo: '/web/login', pathMatch: 'full' },
  { path: 'web', redirectTo: '/web/login', pathMatch: 'full' },
  { path: 'web/login', component: LoginComponent },
  {
    path: 'web/home', component: HomeComponent, children: [
      { path: '', redirectTo: '/web/home/list', pathMatch: 'full' },
      { path: 'list', component: BlogListComponent },
      { path: 'detail/:id', component: BlogDetailComponent },
    ]
  },
  { path: 'web/edit/:id', component: EditComponent },
  { path: 'web/source', component: SourceComponent },
]
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
