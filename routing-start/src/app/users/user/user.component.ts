import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: { id: number, name: string };

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    //  this.route.snapshot.params will only be excuted the first initialization
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name'],
    }
    // to react to subsequent changes happening in this component, subscribe to route params and set the users id and name.
    this.route.params
      .subscribe((params: Params) => {
        this.user.id = params['id'];
        this.user.name = params['name'];
      })
  }
}
