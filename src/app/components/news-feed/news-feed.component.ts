import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { socketConnect } from '../../socket';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent {
  public posts: Post[] = [];
  public createPostHidden = true;
  public postContent = '';
  public socket: any;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('/api/auth/posts').subscribe((posts: any) => {
      this.posts = posts.reverse();

      this.http.get('/api/auth/profile/info').subscribe((user: any) => {
        this.socket = socketConnect(user.id);

        this.socket.on('post', (post: any) => {
          this.posts.unshift(post);
        });
      });
    });
  }

  addPost() {
    this.http
      .post('/api/auth/posts', { content: this.postContent })
      .subscribe((post: any) => {
        this.posts.unshift(post);
        this.socket.emit('post', post);
        this.postContent = '';
        this.createPostHidden = true;
      });
  }

  openCreatePost() {
    this.createPostHidden = !this.createPostHidden;
  }
}

type Post = {
  id: number;
  author: string;
  content: string;
  date: string;
  // imgSrc: string;
  // active: boolean;
};
