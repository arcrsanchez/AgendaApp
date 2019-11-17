export interface ContactId {
    name?: string;
}

export interface MapContactModel {
    firstLetter: string;
    contacts: ContactModel[];
}

export interface ContactModel {
    id?: string;
    name?: string;
    lastName?: string;
    email?: string;
    address?: string;
    telephone?: string;
    phone?: string;
}

