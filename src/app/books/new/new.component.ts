import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BookService } from '../../core/services/book.service';
import { BookCreate } from '../../core/models/book';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule],
  templateUrl: './new.component.html',
  styleUrl: './new.component.sass',
})
export class NewComponent {
  imagePreview: string | null = '';
  imageFile: File | null = null;

  bookForm: FormGroup;
  constructor(
    private bookService: BookService,
    private formBulder: FormBuilder,
    private router: Router
  ) {
    this.bookForm = this.formBulder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: [null],
    });
  }

  onSubmit() {
    if (this.bookForm.invalid) return;

    const { title, description } = this.bookForm.value;
    let imageUrl = '';
    if (this.imageFile) {
      this.bookService.getUploadImg(this.imageFile).subscribe({
        next: (response) => {
          imageUrl = response.secureUrl;
          console.log(imageUrl);

          const book: BookCreate = {
            title,
            description,
            images: [imageUrl],
          };
          console.log(book);

          this.bookService.createBook(book).subscribe({
            next: (response) => {
              console.log(response);
              this.router.navigate(['book/home']);
            },
            error: (error) => {
              console.log(error);
            },
          });
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
      this.bookForm.patchValue({
        image: file,
      });

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
