import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { BookService } from '../../core/services/book.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
})
export class HomeComponent {
  books: any = [];
  constructor(private bookService: BookService) {
    this.bookService.getBooks().subscribe((response) => {
      console.log(response);
    });
  }

  getBooks() {
    this.bookService.getBooks().subscribe((response) => {
      console.log(response);
    });
  }
}
