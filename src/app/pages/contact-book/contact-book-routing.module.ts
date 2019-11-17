import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactBookPage } from './contact-book.page';

const routes: Routes = [
  {
    path: '',
    component: ContactBookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactBookPageRoutingModule {}
