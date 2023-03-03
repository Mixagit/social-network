import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  public err = '';
  public isAdmin = false;
  public id = 0;
  public form = {
    name: '',
    date: '',
    image: '',
  };


  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.http.get('/api/auth/profile/info').subscribe((user: any) => {
      this.id = user.id;
      this.form = { name: user.name, date: user.date, image: user.imgSrc};
      this.isAdmin = user.role.toLowerCase() === 'admin';
      // this.image = user.imgSrc;
    });
  }

  onSubmit() {
    this.http.put('/api/auth/profile', { ...this.form }).subscribe((res: any) => {
      if (res.error) this.err = res.error;
    });
  }

  deleteAcc(e: MouseEvent) {
    e.preventDefault();
    if (window.confirm('Do you really want to delete your account?'))
      this.http
        .delete('/api/auth/profile')
        .subscribe(() => this.router.navigateByUrl('/login'));
  }

  logout() {
    this.http.get('/api/auth/profile/logout').subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }

  goAdmin() {
    window.open('https://localhost:3000/', '_blank')!.focus();
  }
}
