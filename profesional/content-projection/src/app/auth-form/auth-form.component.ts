import { Component, Output, EventEmitter, ContentChild, AfterContentInit } from '@angular/core';

import { User } from './auth-form.interface';
import { AuthRememberComponent } from './auth-remember.component';

@Component({
  selector: 'auth-form',
  template: `
    <div>
      <form (ngSubmit)="onSubmit(form.value)" #form="ngForm">
        <ng-content select="h3"></ng-content>
        <label>
          Email address
          <input type="email" name="email" ngModel>
        </label>
        <label>
          Password
          <input type="password" name="password" ngModel>
        </label>
        <ng-content select="auth-remember"></ng-content>

        <div *ngIf="showMessage">
          You will be logged by 30 days
        </div>

        <ng-content select="button"></ng-content>
      </form>
    </div>
  `
})
export class AuthFormComponent implements AfterContentInit {


  showMessage: boolean;

  //¿Como accedo al contenido de auth-remember desde aca?
  @ContentChild(AuthRememberComponent) remember : 
                                                AuthRememberComponent;

  @Output() submitted: EventEmitter<User> = new EventEmitter<User>();

  ngAfterContentInit(): void {
    if(this.remember){
      this.remember.checked.subscribe( 
        (checked: boolean) => this.showMessage=checked);
    }
  }


  onSubmit(value: User) {
    this.submitted.emit(value);
  }

}
