import { Component, Input, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { Book } from '../../core/models/book';
import { BookService } from '../../core/services/book.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './book.component.html',
  styleUrl: './book.component.sass',
})
export class BookComponent implements OnInit {
  book: Book = {
    _id: '',
    images: [],
  };
  bookId: string = '';

  constructor(
    private activedRouter: ActivatedRoute,
    private bookService: BookService
  ) {
    this.activedRouter.params.subscribe((params)=>{
      this.bookId = params['id']
    })
  }

  ngOnInit(): void {
    this.bookService.getBookId(this.bookId).subscribe((response)=>{
    this.book = response;      
    })
  }
}
