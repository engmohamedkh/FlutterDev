import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Post } from '../../Helpers/post';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  @Input({required: true}) post!: Post;
  @Output() loaded = new EventEmitter<number>();

  ngOnInit() {
    this.loaded.emit(this.post.id);
  }
}


