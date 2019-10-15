import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Blogpost } from '../models/blogpost';
import { BlogpostService } from '../blogpost.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  // blogposts$: Observable<Blogpost[]>; // utilisation de | async côté template
  allBlogposts: Blogpost[]; // utilisation de subscribe() côté TS
  errorFromServer = '';

  constructor(private blogpostService: BlogpostService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if(!this.authService.isAuthenticated) {
      this.router.navigate(['/auth']);
    }
    // this.blogposts$ = this.blogpostService.getBlogposts(); // utilisation de | async côté template
    // utilisation de subscribe() 
    this.blogpostService
        .getBlogposts()
        .subscribe(data => this.refresh(data));  
    
    this.blogpostService
        .handleBlogpostCreated()
        .subscribe(data => {
          console.log('AdminComponent received', data);
          this.refresh(data);
        });
  }

  deleteBlogposts(selectedOptions) {
    const ids = selectedOptions.map(so => so.value);
    if(ids.length === 1) {
      this.blogpostService
          .deleteSingleBlogpost(ids[0])
          .subscribe(data => this.refresh(data), err => this.handleError(err));
    } else {
      return this.blogpostService
                 .deleteBlogposts(ids)
                 .subscribe(data => this.refresh(data), err => this.handleError(err));
    }
  }
 
  refresh(data) {
    console.log('data', data);
    this.blogpostService
        .getBlogposts()
        .subscribe(data => {
          this.allBlogposts = data;
        })
  }

  handleError(error) {
    this.errorFromServer = `Error ${error.status} - ${error.statusText}`;
    console.error(error);
  }

  logout() {
    this.authService
      .logout()
      .subscribe(data => {
        console.log(data);
        this.router.navigate(['/auth']);
      }, err => console.error(err));
  }

}


