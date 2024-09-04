import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { BookService } from '../../core/services/book.service';
import { HttpClientModule } from '@angular/common/http';
import { Book } from '../../core/models/book';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
})
export class HomeComponent {
  books: Book[] = [];
  constructor(private bookService: BookService, private router: Router) {
    this.bookService.getBooks().subscribe((response) => {
      this.books = response;
    });
  }

  getBooks() {
    this.bookService.getBooks().subscribe((response) => {
      console.log(response);
    });
  }

  getViewBook(id: string) {
    this.router.navigate(['book/' + id]);
  }
}
