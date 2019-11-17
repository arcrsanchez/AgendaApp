import { Component, OnInit } from '@angular/core';
import { ContactBookService } from '../../services/contact-book-service.service';

@Component({
  selector: 'app-contact-book',
  templateUrl: './contact-book.page.html',
  styleUrls: ['./contact-book.page.scss'],
})
export class ContactBookPage implements OnInit {

  constructor(public contactBookService: ContactBookService) { }

  ngOnInit() {
  }

}
