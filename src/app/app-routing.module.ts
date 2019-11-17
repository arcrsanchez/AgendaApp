import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'contact-book', pathMatch: 'full' },
  {
    path: 'contact-book',
    loadChildren: './pages/contact-book/contact-book.module#ContactBookPageModule'
  },
  {
    path: 'contact/:id',
    loadChildren: './pages/contact/contact.module#ContactPageModule'
  },
  {
    path: 'add-contact',
    loadChildren: './pages/add-contact/add-contact.module#AddContactPageModule'
  },
  {
    path: 'edit-contact/:id',
    loadChildren: './pages/edit-contact/edit-contact.module#EditContactPageModule'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
