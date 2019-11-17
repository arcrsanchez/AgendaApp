import { Component, OnInit, NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactBookService } from '../../services/contact-book-service.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.page.html',
  styleUrls: ['./add-contact.page.scss'],
})
export class AddContactPage implements OnInit {

  constructor(public contactBookService: ContactBookService,
              public alertController: AlertController,
              private router: Router) { }

  public onSubmit(f: NgForm) {
    if (f.valid) {
      this.contactBookService.newContact(f.value);
      this.router.navigate(['/contact-book']);
    }
  }

  async cancelNewContact() {
    const alert = await this.alertController.create({
      message: 'Segur que vols cancelar?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            this.router.navigate(['/contact-book']);
          }
        }, {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary'
        }
      ]
    });
    await alert.present();
  }

  ngOnInit() {
  }

}
