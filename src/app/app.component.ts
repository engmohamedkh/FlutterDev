import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PostService } from './Services/post.service';
import { HttpClientModule } from '@angular/common/http';
import { NewpostComponent } from './Components/newpost/newpost.component';
import { RisingpostComponent } from './Components/risingpost/risingpost.component';
import { HotpostComponent } from './Components/hotpost/hotpost.component';
import { ErrorComponent } from './Components/error/error.component';
import { HeaderComponent } from "./Components/header/header.component";


@Component({
    selector: 'app-root',
    standalone: true,
    providers: [PostService],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, HotpostComponent, RouterOutlet, HttpClientModule, NewpostComponent,
        RisingpostComponent, ErrorComponent, HeaderComponent]
})
export class AppComponent implements OnInit {
  constructor(private postService: PostService) {}
  title = 'postapp';
  ngOnInit(): void {
    // Call the method to fetch and store data in Firebase when the app starts and 
    //comment it to avoid dublicate data
    //this.postService.FetchDataAndStorePostsInFirebase(); 

  }
  activeTab: string = 'active';

  isActive(tab: string): boolean {
    return this.activeTab === tab;
  }

  setActive(tab: string): void {
    this.activeTab = tab;
  }
}
