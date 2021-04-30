import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-midterm-preview',
  templateUrl: './midterm-preview.component.html',
  styleUrls: ['./midterm-preview.component.css']
})
export class MidtermPreviewComponent implements OnInit {
  isLoadingBool: boolean = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  nextPage() {
    this.router.navigate(['/test/midterm-preview-2']);
  }

}
