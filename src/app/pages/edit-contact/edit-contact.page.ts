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

  public onSubmit(f: NgForm) {
    if (f.valid) {
      this.contactBookService.updateContact(this.contact.id, f.value);
      this.router.navigate(['/contact', this.contact.id]);
    }
  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.contactBookService.getContactById(params.id)
          .subscribe((contact: ContactModel) => {
            contact.id = params.id;
            this.contact = contact;
          });
      });
  }

}
