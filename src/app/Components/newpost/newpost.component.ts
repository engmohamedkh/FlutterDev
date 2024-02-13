
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, NgZone, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';
import { PostService } from '../../Services/post.service';
import { CardComponent } from '../card/card.component';
import { CommonModule, JsonPipe } from '@angular/common';


@Component({
  selector: 'app-newpost',
  standalone: true,
  imports: [JsonPipe, CommonModule, CardComponent],
  providers:[PostService],
  templateUrl: './newpost.component.html',
  styleUrl: './newpost.component.css',
  styles: [
  
  ]

})
export class NewpostComponent  implements OnInit  {
 
 
  posts: any[] = [];

  constructor(private postService: PostService){}


  ngOnInit(): void {

    this.loadPosts();
}
loading=false;
private loadPosts() {
  if (this.loading) {
    return; // Don't load more posts if already loading
  }

  this.loading = true;

  this.postService.GetAllNewPosts2().then(
    (data: any[]) => {
      // Ensure you are not adding duplicate posts
      const uniquePosts = this.getUniquePosts([...this.posts, ...data]);
      this.posts = uniquePosts;
      this.loading = false;
    },
    (error: any) => {
      console.error('Error loading posts', error);
    }
  );
}

private getUniquePosts(posts: any[]): any[] {
  // Use a Set to remove duplicate posts based on some unique identifier, for example, post id
  const uniquePostsSet = new Set(posts.map(post => post.id));
  // Convert the Set back to an array
  const uniquePostsArray = Array.from(uniquePostsSet);
  // Map the unique identifiers back to the actual posts
  return uniquePostsArray.map(id => posts.find(post => post.id === id));
}


    @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    const pos = document.documentElement.scrollTop || document.body.scrollTop || 0;
    const max = document.documentElement.scrollHeight || document.body.scrollHeight || 0;
  
    console.log('Scroll position:', pos);
  console.log('Max scroll position:', max);
    if (pos < max && !this.loading) {
      // Load more posts when scrolled to the bottom and there are more posts available
      console.log('scrolling ');
     
      this.loadPosts();
    }
  }

    loaded(id: number) {
      if (this.posts.length < 200 && this.posts.at(-2)?.id === id)
       {
      //  this.loadPosts();
      }
    }
  }

  

    
   
  



 /* @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight - 1) {
      // Load more posts when scrolling near the bottom
      this.page++;
      this.loadPosts();
    }
  }
  loadPosts(): void {
    this.loading = true;
    this.postService.GetAllNewPosts().subscribe((newPosts) => {
      this.posts = [...this.posts, ...newPosts];
      this.loading = false;
    });
  }*/
  
