import { Injectable } from '@angular/core';
import { ContactModel } from '../models/contact-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactBookService {

  listContacts: ContactModel[] = [];

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
        }
      });
  }

  public newContact(contact: ContactModel) {
    this.http.post('https://agendaapp-6b8bf.firebaseio.com/contacts.json', contact)
      .subscribe(
        (id: string) => {
          contact.id = id;
          this.listContacts.push(contact);
        },
        response => {
          console.log('ERROR POST:', response);
        });
  }

  public updateContact(id: string, contactUpdate: ContactModel) {
    this.http.put(`https://agendaapp-6b8bf.firebaseio.com/contacts/${id}.json`, contactUpdate)
      .subscribe(
        () => {
          for (const contact of this.listContacts) {
            if (contact.id === id) {
              contactUpdate.id = id;
              this.listContacts.splice(this.listContacts.indexOf(contact), 1, contactUpdate);
            }
          }
        },
        response => {
          console.log('ERROR PUT: ', response);
        });
  }

  public deleteContact(id: string) {
    this.http.delete(`https://agendaapp-6b8bf.firebaseio.com/contacts/${id}.json`)
      .subscribe(
        () => {
          for (const contact of this.listContacts) {
            if (contact.id === id) {
              this.listContacts.splice(this.listContacts.indexOf(contact), 1);
            }
          }
        });
  }
}
