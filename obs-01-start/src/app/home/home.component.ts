import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { Observable } from 'rxjs-compat';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  private observerSubscription: Subscription
  
  constructor() { }

  ngOnInit() {
    /*this.observerSubscription = interval(1000).subscribe(count => {
      console.log(count);
    });*/

    const customIntervalObservable = new Observable(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);

        if (count === 2) {
          observer.complete();
        }

        if (count > 3) {
          observer.error(new Error('Count is greater 3!'));
        }
        count++
      }, 1000);
    });

    this.observerSubscription = customIntervalObservable.subscribe(count => {
      console.log(count);
    }, error => {
      alert(error.message);
    }, () => {
      console.log('customIntervalObservable completed');
    });
  }

  ngOnDestroy(): void {
    this.observerSubscription.unsubscribe();
  }
}
