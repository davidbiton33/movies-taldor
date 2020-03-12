import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../movie';
import { DalService } from '../dal.service';
@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {
  @Input() movie:Movie;
  @Output() deletedItem = new EventEmitter();
  constructor(private DalService:DalService) { }

  ngOnInit(): void {
  }

  deleteItem(){
    console.log(this.movie._id)
    this.DalService.deleteItem(this.movie._id).subscribe((data)=>{
    this.deletedItem.emit();
    }
    )
  }
}
