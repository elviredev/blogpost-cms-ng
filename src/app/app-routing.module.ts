import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogpostListComponent } from './blogpost-list/blogpost-list.component';
import { BlogpostComponent } from './blogpost/blogpost.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { AdminComponent } from './admin/admin.component';
import { BlogpostEditComponent } from './blogpost-edit/blogpost-edit.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: '', component: BlogpostListComponent }, // liste de tous les blog posts
  { path: 'blog-posts/:id', component: BlogpostComponent }, // détail d'un blog post
  { path: 'auth', component: AuthComponent }, // localhost:4200/auth
  { path: 'admin', component: AdminComponent },
  { path: 'admin/blog-posts/:id', component: BlogpostEditComponent },
  { path: '**', component: ErrorpageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
