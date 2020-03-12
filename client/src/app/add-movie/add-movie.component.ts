import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Movie } from '../movie';
import { DalService } from '../dal.service';
import { ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as $ from "jquery";


@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private Dal: DalService, private http: HttpClient) { }
  @Output() addItem = new EventEmitter<string>();

  movie: Movie;
  msg: string;
  movies: Movie[];


  public catgories = ["אקשן", "דרמה", "קומדיה", "אחר"];

  async loadAllMovies() {
    await this.Dal.getAll().subscribe(data => this.movies = data);
    console.log(this.movies)
  }


  ngOnInit(): void {
    this.loadAllMovies();
    this.movie = {
      name: '',
      category: this.catgories[0],
      imdbLink: '',
      img: '',
      date: Date.now()
    }
  }

  addMovie(valid) {
    this.Dal.addMovie(this.movie).subscribe(data => console.log(data));
    this.addItem.emit('add video');
    location.reload();
  }

  public imgNotValid = true;

  validateImg() {
    if (this.movie.img.includes("https://m.media-amazon.com/") && this.movie.img.match(/\.(jpeg|jpg|gif|png)$/))
      this.imgNotValid = true;
    else {
      this.imgNotValid = false;
    }
  }

  imgValid() {
    if (this.validateImg == null) {
      this.imgNotValid = true
    }
    this.imgNotValid = false;
  }
  public linkNotValid = true;
  validation() {

    if (!this.movie.imdbLink.includes("https://www.imdb.com"))
      this.linkNotValid = false;
    else
      this.linkNotValid = true;


    /*    this.http.get<any>(this.movie.imdbLink).subscribe(resp => {
         if (resp.status == 200)
           this.linkNotValid = true;
         else
           this.linkNotValid = false;
       },
         err => {
           console.log(err);
         }); */
  }




  public nameNotValid: string = null;
  movieNamevalidation() {
    this.nameNotValid = null;

    if (this.movie.name.length == 0)
      return;

    if (this.movie.name.length <= 30) {
      var letters = /^[A-Za-z]+$/;
      if (this.movie.name.match(letters)) {

        //check this name not exist

        if (this.movies.filter((movie) => movie.name == this.movie.name).length > 0)
          this.nameNotValid = "שם סרט זה קיים כבר"
        else
          this.nameNotValid = null;
        return;
      }
      else
        this.nameNotValid = "חובה לכתוב רק באנגלית";
    }
    else
      this.nameNotValid = "מספר אותיות מקסימלי 30";
  }





  /*   isURLReal() {
      var URL = encodeURIComponent(this.movie.imdbLink),
        dfd = $.Deferred(),
        checkURLPromise = $.getJSON('http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20htmlstring%20where%20url%3D%22' + URL + '%22&format=json');
  
      checkURLPromise.done(function (response) {
        // results should be null if the page 404s or the domain doesn't work
        if (response.query.results) {
          dfd.resolve(true);
        } else {
          dfd.reject(false);
        }
      })
        .fail(function () {
          dfd.reject('failed');
        });
  
      return dfd.promise();
    } */


}



