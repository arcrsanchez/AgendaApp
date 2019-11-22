import { Component, OnInit } from '@angular/core';
import { ContactModel } from '../../models/contact-model';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactBookService } from '../../services/contact-book-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.page.html',
  styleUrls: ['./edit-contact.page.scss'],
})
export class EditContactPage implements OnInit {

  contact: ContactModel;

  constructor(private route: ActivatedRoute,
              public contactBookService: ContactBookService,
              private router: Router) { }

  async onSubmit(f: NgForm) {
    if (f.valid) {
      const contactId = await this.contactBookService.updateContact(this.contact.id, f.value);
      this.router.navigate(['/contact', contactId]);
    }
  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.getContact(params.id);
      });
  }

  async getContact(id: string) {
    this.contact = await this.contactBookService.getContactById(id);
    this.contact.id = id;
  }

}
