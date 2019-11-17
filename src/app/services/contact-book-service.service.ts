import { Injectable } from '@angular/core';
import { ContactModel, ContactId, MapContactModel } from '../models/contact-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactBookService {

  listContacts: ContactModel[] = [];
  mapContacts: MapContactModel[] = [];

  constructor(private http: HttpClient) {
    this.getContacts();
  }

  public getContactById(id: string) {
    return this.http.get(`https://agendaapp-6b8bf.firebaseio.com/contacts/${id}.json`);
  }

  public getContacts() {
    this.http.get('https://agendaapp-6b8bf.firebaseio.com/contacts.json')
      .subscribe((res) => {
        if (res !== null) {
          let i = 0;
          Object.keys(res).forEach((id: string) => {
            const contact: ContactModel = Object.values(res)[i];
            contact.id = id;
            i++;
            this.listContacts.push(contact);
          });
          this.groupContactsByLastNameFirstLetter();
        }
      });
  }

  private groupContactsByLastNameFirstLetter() {
    this.listContacts.sort((a, b) => {
      return a.lastName.localeCompare(b.lastName);
    });
    this.mapContacts = [];
    for (const contact of this.listContacts) {
      let containsFirstLetter = false;
      const firstLetter = contact.lastName.substr(0, 1);
      const mapContactAux = { firstLetter, contacts: [contact] };
      if (this.mapContacts.length > 0) {
        for (const mapContact of this.mapContacts) {
          if (mapContact.firstLetter === mapContactAux.firstLetter) {
            containsFirstLetter = true;
            mapContact.contacts.push(contact);
          }
        }
        if (!containsFirstLetter) {
          this.mapContacts.push(mapContactAux);
        }
      } else {
        this.mapContacts.push(mapContactAux);
      }
    }
  }

  public newContact(contact: ContactModel) {
    this.http.post('https://agendaapp-6b8bf.firebaseio.com/contacts.json', contact)
      .subscribe(
        (id: ContactId) => {
          contact.id = id.name;
          this.listContacts.push(contact);
          this.groupContactsByLastNameFirstLetter();
        },
        response => {
          console.log('ERROR POST:', response);
        });
  }

  public updateContact(id: string, contactUpdate: ContactModel) {
    return new Promise((resolve, reject) => {
      this.http.put(`https://agendaapp-6b8bf.firebaseio.com/contacts/${id}.json`, contactUpdate)
        .subscribe(() => {
          setTimeout(() => {
            for (const contact of this.listContacts) {
              if (contact.id === id) {
                contactUpdate.id = id;
                this.listContacts.splice(this.listContacts.indexOf(contact), 1, contactUpdate);
                this.groupContactsByLastNameFirstLetter();
              }
            }
            resolve(id);
          }, 1000);
        },
          response => {
            console.log('ERROR PUT: ', response);
          });
    });
  }

  public deleteContact(id: string) {
    this.http.delete(`https://agendaapp-6b8bf.firebaseio.com/contacts/${id}.json`)
      .subscribe(
        () => {
          for (const contact of this.listContacts) {
            if (contact.id === id) {
              this.listContacts.splice(this.listContacts.indexOf(contact), 1);
              this.groupContactsByLastNameFirstLetter();
            }
          }
        });
  }
}
