import { Component, HostListener, OnInit, signal } from '@angular/core';
import { PostService } from '../../Services/post.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { Post } from '../../Helpers/post';
import { CardComponent } from "../card/card.component";

@Component({
    selector: 'app-hotpost',
    standalone: true,
    providers: [PostService],
    templateUrl: './hotpost.component.html',
    styleUrl: './hotpost.component.css',
    imports: [JsonPipe, CommonModule, CardComponent]
})
export class HotpostComponent  implements OnInit {


  constructor(private postService: PostService) {
  
  }
  posts: Post[] = []; 
  private total = 0;
  private currentPage = 0;
  private pageSize = 10; // Adjust as needed
  loading = false; 

  ngOnInit(): void {
    this.loadPosts(this.currentPage);
  }
  private loadPosts(page: number) {
    this.loading=true;
    this.postService.getHotPostsfunc(page).subscribe((hotPosts: any) => {
      this.total = hotPosts.data.children.length;
      hotPosts.data.children.forEach((post: any) => {
        const addpost = {
          id: post.data.id,
          title: post.data.title,
          auther:post.data.author_fullname

        };
        this.posts.push(addpost);
    });
    this.loading = false; 
    console.log('Loaded post ',  this.posts);

   
  })
  }
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    const pos = document.documentElement.scrollTop || document.body.scrollTop || 0;
    const max = document.documentElement.scrollHeight || document.body.scrollHeight || 0;
  
    console.log('Scroll position:', pos);
  console.log('Max scroll position:', max);
    if (pos < max && this.posts.length <= this.total && !this.loading) {
      // Load more posts when scrolled to the bottom and there are more posts available
      console.log('scrolling ');
      this.currentPage++;
      this.loadPosts(this.currentPage);
    }
  }
  
  loaded(id: number) {
    if (this.posts.length < this.total && this.posts.at(-2)?.id === id) {
      this.loadPosts(this.posts.length / 5);
    }
  }
}

