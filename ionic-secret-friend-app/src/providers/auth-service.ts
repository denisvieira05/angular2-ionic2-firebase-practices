import { Injectable } from '@angular/core';
import { Events, Platform } from 'ionic-angular';
import { Facebook } from 'ionic-native';
import firebase from 'firebase';

import { AuthProviders, FirebaseAuth, FirebaseAuthState, AuthMethods } from 'angularfire2';

@Injectable()
export class AuthService {
  private authState: FirebaseAuthState;
  public users: any

  constructor(
    private platform: Platform,
    public auth$: FirebaseAuth,
    public events: Events
  ) {
    this.users = firebase.database().ref('/users');
    this.authState = auth$.getAuth();
    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });
  }

  displayName(): string {
    if (this.authState != null) {
      console.log(this.authState);
      return this.authState.facebook.displayName;
    } else {
      return '';
    }
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  signInWithFacebook(): firebase.Promise<FirebaseAuthState> {
    if (this.platform.is('cordova')) {
      Facebook.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential);
      });
    } else {
      return this.auth$.login({
        provider: AuthProviders.Facebook,
        method: AuthMethods.Popup
      });
    }
  }

  signOut(): void {
    this.auth$.logout();
    this.events.publish('user:logout');
  }
}
