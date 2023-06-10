import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval, pipe } from 'rxjs';
import { Observable } from 'rxjs-compat';
import { filter, map } from 'rxjs/operators';

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

        if (count === 3) {
          observer.complete();
        }

        if (count > 3) {
          observer.error(new Error('Count is greater 3!'));
        }
        count++
      }, 1000);
    });

    this.observerSubscription = customIntervalObservable
      .pipe(
        filter((count: number) => count > 1),
        map((count: number) => 'Round: ' + (count + 1)),
      )
      .subscribe(count => {
        console.log(count);
      }, error => {
        alert(error.message);
      }, () => {
        console.log('customintervalobservable completed');
      });
  }

  ngOnDestroy(): void {
    this.observerSubscription.unsubscribe();
  }
}
