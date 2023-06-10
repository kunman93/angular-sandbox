import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  private observerSubscription: Subscription
  
  constructor() { }

  ngOnInit() {
    this.observerSubscription = interval(1000).subscribe(count => {
      console.log(count);
    });
  }

  ngOnDestroy(): void {
    this.observerSubscription.unsubscribe();
  }
}
