import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'contact-book', pathMatch: 'full' },
  {
    path: 'contact-book',
    loadChildren: () => import('./pages/contact-book/contact-book.module').then( m => m.ContactBookPageModule)
  },
  {
    path: 'contact/:id',
    loadChildren: () => import('./pages/contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'add-contact',
    loadChildren: () => import('./pages/add-contact/add-contact.module').then( m => m.AddContactPageModule)
  },
  {
    path: 'edit-contact/:id',
    loadChildren: () => import('./pages/edit-contact/edit-contact.module').then( m => m.EditContactPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
