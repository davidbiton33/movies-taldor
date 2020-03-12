import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddMovieComponent } from '../add-movie/add-movie.component';
import { DalService } from '../dal.service';
import { Movie } from '../movie';
import { ActivatedRoute } from "@angular/router";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  categories: string[] = [];
  movies: Movie[]
  currentCat: string;
  user: string;
  constructor(private modalService: NgbModal, private DalService: DalService, private route: ActivatedRoute, private AuthService: AuthService) { }

  open() {
    const modalRef = this.modalService.open(AddMovieComponent);
    modalRef.componentInstance.addItem.subscribe(($e) => {
      modalRef.close();
      this.getCategoriesList();

    })
  }

  get sortData() {
    if (this.movies && this.movies.length > 0)
      return this.movies.sort((a, b) => {
        return <any>new Date(b.date) - <any>new Date(a.date);
      });
  }

  loadAllMovies() {
    this.DalService.getAll().subscribe(data => this.movies = data);
  }

  loadMovies(cat) {
    this.currentCat = cat;
    this.DalService.getByCategory(cat).subscribe(data => this.movies = data)
  }


  getCategoriesList() {
    this.DalService.getCategories().subscribe(data => {
      this.categories = [];
      this.categories.push(data[0]);
      let flag = true;

      for (let i = 0; i < data.length; i++) {
        flag = true;

        for (let j = 0; j < this.categories.length; j++)
          if (this.categories[j] == data[i]) {
            flag = false;
            break;
          }

        if (flag)
          this.categories.push(data[i]);
      }
    });


  }

  reloadEditor() {
    this.loadMovies(this.currentCat);
    this.getCategoriesList();
    this.loadAllMovies();
  }

  logOut() {
    this.AuthService.logoutUser();
  }
  ngOnInit(): void {
    this.loadAllMovies();
    this.user = this.route.snapshot.paramMap.get("user");
    this.getCategoriesList();
  }
}
