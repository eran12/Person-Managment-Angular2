import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-errorpage',
  template: `
    <div class="jumbotron">
  <h1>Error Page</h1>
  <p>If you get to this page then some thing went worng
    <br>
  We apologesi for the in convinent.</p>
<br>
<p> You will be redircted to the home page</p>
  <p><a class="btn btn-primary btn-lg" [routerLink]="['/']" role="button">Home</a></p>
</div>
  `,
  styles: []
})
export class ErrorpageComponent implements OnInit, OnDestroy {

  constructor(private router: Router) { }

  ngOnInit() {
    console.log("onInit");
    setInterval(this.router.navigate(['/']), 5000);
  }
  ngOnDestroy(): void {
    console.log('OnDestroy');
  }

}
