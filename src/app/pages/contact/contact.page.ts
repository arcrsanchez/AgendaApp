import { Component, OnInit } from '@angular/core';
import { ContactModel } from '../../models/contact-model';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactBookService } from '../../services/contact-book-service.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  contact: ContactModel;

  constructor(private route: ActivatedRoute,
              public contactBookService: ContactBookService,
              public alertController: AlertController,
              private router: Router) { }

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

  async deleteContactAlert() {
    const alert = await this.alertController.create({
      message: 'Segur que vols esborrar aquest contacte?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            this.deleteContact();
          }
        }, {
          text: 'No',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }

  async deleteContact() {
    await this.contactBookService.deleteContact(this.contact.id);
    this.router.navigate(['/contact-book']);
  }

}
