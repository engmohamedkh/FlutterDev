import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../../Services/post.service';

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Post } from '../../Helpers/post';
import { CardComponent } from "../card/card.component";

@Component({
  selector: 'app-risingpost',
  standalone: true,
  imports: [CommonModule,MatCardModule,CardComponent],
  providers:[PostService],
  templateUrl: './risingpost.component.html',
  styleUrl: './risingpost.component.css'
})
export class RisingpostComponent  implements OnInit{
  allPosts: Post[] = []; // Assuming you have an array of Post objects
  displayedPosts: Post[] = [];
  pageSize = 10;
  page = 1;
  constructor(private risingPostService: PostService ) {}
  ngOnInit(): void {
   this.risingPostService.GetAllRisingPosts().subscribe((posts) => {
    this.allPosts=posts;
     console.log("Displayed posts",this.allPosts);
  });

}

}


