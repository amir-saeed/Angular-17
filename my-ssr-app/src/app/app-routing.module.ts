import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelloServerComponent } from './hello-server/hello-server.component';
import { HelloClientComponent } from './hello-client/hello-client.component';

const routes: Routes = [
  { path: 'server', component: HelloServerComponent, pathMatch: 'full' },
  { path: 'client', component: HelloClientComponent, pathMatch: 'full' },
  { path: '', redirectTo: '/server', pathMatch: 'full' },
  { path: '**', redirectTo: '/server', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    // HelloServerComponent,
    // HelloClientComponent
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }