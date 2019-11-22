import { Injectable } from '@angular/core';
import { ContactModel, ContactId } from '../models/contact-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactBookService {

  mapContacts: Map<string, ContactModel[]>;

  constructor(private http: HttpClient) {
    this.mapContacts = new Map<string, ContactModel[]>();
    this.getContacts();
  }

  private groupContactsByLastNameFirstLetter(listContacts: ContactModel[]) {
    listContacts.sort((a, b) => {
      return a.lastName.localeCompare(b.lastName);
    });
    let auxFirstLetter: string;
    for (const contact of listContacts) {
      const firstLetter = contact.lastName.substr(0, 1);
      if (!this.mapContacts.has(firstLetter)) {
        auxFirstLetter = firstLetter;
        this.mapContacts.set(firstLetter, [contact]);
      } else {
        this.mapContacts.get(auxFirstLetter).push(contact);
      }
    }
  }

  public async getContactById(id: string) {
    return await this.http.get<ContactModel>(`https://agendaapp-6b8bf.firebaseio.com/contacts/${id}.json`).toPromise();
  }

  private async getContacts() {
    const res = await this.http.get('https://agendaapp-6b8bf.firebaseio.com/contacts.json').toPromise();
    let i = 0;
    const listContacts: ContactModel[] = [];
    Object.keys(res).forEach((id: string) => {
      const contact: ContactModel = Object.values(res)[i];
      contact.id = id;
      i++;
      listContacts.push(contact);
    });
    this.groupContactsByLastNameFirstLetter(listContacts);
  }

  public async newContact(contact: ContactModel) {
    const id = await this.http.post<ContactId>('https://agendaapp-6b8bf.firebaseio.com/contacts.json', contact).toPromise();
    contact.id = id.name;
    const firstLetter = contact.lastName.substr(0, 1);
    if (this.mapContacts.has(firstLetter)) {
      this.mapContacts.get(firstLetter).push(contact);
    } else {
      this.mapContacts.set(firstLetter, [contact]);
    }
  }

  public async updateContact(id: string, contactUpdate: ContactModel) {
    await this.http.put<ContactModel>(`https://agendaapp-6b8bf.firebaseio.com/contacts/${id}.json`, contactUpdate).toPromise();
    this.mapContacts.forEach((values) => {
      const contact = values.find(value => value.id === id);
      if (contact !== undefined) {
        contactUpdate.id = id;
        const firstLetter = contact.lastName.substr(0, 1);
        if (contact.lastName === contactUpdate.lastName) {
          this.mapContacts.get(firstLetter).splice(this.mapContacts.get(firstLetter).indexOf(contact), 1, contactUpdate);
        } else {
          const firstLetterUpdate = contactUpdate.lastName.substr(0, 1);
          this.mapContacts.get(firstLetter).splice(this.mapContacts.get(firstLetter).indexOf(contact), 1);
          if (this.mapContacts.get(firstLetter).length === 0) {
            this.mapContacts.delete(firstLetter);
          }
          if (this.mapContacts.has(firstLetterUpdate)) {
            this.mapContacts.get(firstLetterUpdate).push(contactUpdate);
          } else {
            this.mapContacts.set(firstLetterUpdate, [contactUpdate]);
          }
        }
      }
    });
    return id;
  }

  public async deleteContact(id: string) {
    await this.http.delete(`https://agendaapp-6b8bf.firebaseio.com/contacts/${id}.json`).toPromise();
    this.mapContacts.forEach((values: ContactModel[]) => {
      const contact = values.find(value => value.id === id);
      if (contact !== undefined) {
        const firstLetter = contact.lastName.substr(0, 1);
        this.mapContacts.get(firstLetter).splice(this.mapContacts.get(firstLetter).indexOf(contact), 1);
        if (this.mapContacts.get(firstLetter).length === 0) {
          this.mapContacts.delete(firstLetter);
        }
      }
    });
  }

}
