/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let app: AppComponent;
  
  beforeEach(() => {
    app = new AppComponent();
  });

  it('should set new message', () => {
    expect(app.isSuccessLoggin).toBe(false);
  });

});
