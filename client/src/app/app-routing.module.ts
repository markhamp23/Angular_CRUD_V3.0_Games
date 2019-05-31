import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesListComponent } from './components/games-list/games-list.component';
import { GameFormComponent } from './components/game-form/game-form.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { GameViewComponent } from './components/game-view/game-view.component';
import { GamesApiComponent } from './components/games-api/games-api.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/games',
    pathMatch: 'full'
  },
  {
    path: 'games',
    component: GamesListComponent
  },
  {
    path: 'games/add',
    component: GameFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'games/edit/:id',
    component: GameFormComponent
  }, 
  {
    path: 'games/view/:id',
    component: GameViewComponent
  },
  {
    path: 'games/api',
    component: GamesApiComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: NavigationComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})

export class AppRoutingModule {}
