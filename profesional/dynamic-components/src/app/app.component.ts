import { Component, AfterContentInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

import { User } from './auth-form/auth-form.interface';
import { AuthFormComponent } from './auth-form/auth-form.component';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <div #entry></div>
    </div>
  `
})
export class AppComponent implements AfterContentInit {

  @ViewChild('entry', { read: ViewContainerRef}) entry: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver){}


  ngAfterContentInit(): void {
    const authFormFactory = this.resolver.resolveComponentFactory(AuthFormComponent);
    const component = this.entry.createComponent(authFormFactory);
    component.instance.title='Create Account';

  }
  loginUser(user: User) {
    console.log('Login', user);
  }

}