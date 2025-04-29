import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { PostslistComponent } from './components/posts/postslist/postslist.component';
import { PostsdetailsComponent } from './components/posts/postsdetails/postsdetails.component';
import { CreatePostComponent } from './components/posts/create-post/create-post.component';
import { CadastroComponent } from './components/layout/cadastro/cadastro.component';
import { EditPostComponent } from './components/posts/edit-post/edit-post.component';
import { PerfilComponent } from './components/layout/perfil/perfil.component';

export const routes: Routes = [
    {path: "", redirectTo: "login", pathMatch: 'full'},
    {path: "login", component: LoginComponent},
    {path: "register", component: CadastroComponent},
    {path: "admin", component: PrincipalComponent, children: [
        {path: "perfil", component: PerfilComponent},
        {path: "posts", component: PostslistComponent},
        {path: "posts/new", component: CreatePostComponent},
        {path: "posts/:id", component: PostsdetailsComponent},
        {path: "posts/edit/:id", component: EditPostComponent},
    ]}
];
