import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  title = 'clussroom';
  myThumbnail = "https://wittlock.github.io/ngx-image-zoom/assets/thumb.jpg";

  constructor(
    public router: Router) {
    var data = localStorage.getItem('isLogin');
    if (data == '1') {
      // this.router.navigate(['/sample04']);
    }
  }
}
