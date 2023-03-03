import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {MainPageComponent} from "./components/main-page/main-page.component";
import {ChatComponent} from "./components/chat/chat.component";
import {NewsFeedComponent} from "./components/news-feed/news-feed.component";
import {UserListComponent} from "./components/user-list/user-list.component";
import {UserInfoComponent} from "./components/user-info/user-info.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', component: MainPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: SignUpComponent},
  {path: 'feed', component: NewsFeedComponent},
  {path: 'users', component: UserListComponent},
  {path: 'profile', component: UserInfoComponent},
  {path: 'chat/:id', component: ChatComponent},
  {path: '**', component: NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
