import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // setting an empty object for user value means that the user is not yet initialized
  // we can show a spinner or useful info before we know which interface to show
  data = new BehaviorSubject({});

  constructor(public afAuth: AngularFireAuth) {
    // subscribe to the changes of the Firebase user to update the local variable
    // TODO: expose Firebase observable instead?
    this.afAuth.user.subscribe(user => {
      this.data.next(user);
    });
  }

  /**
   * Tries to sign in the user with given credentials
   *
   * @param email     user's email
   * @param password  user's password
   */
  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  /**
   * Sends an email to the user's email with the password reset link
   * TODO: for a mobile app, maybe a password reset code will be more appropriate!
   *
   * @param email  user's email
   */
  sendCode(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  /**
   * Changes the password for the user with specific code
   *
   * @param email  user's email
   * @param code   one time code sent in the email
   */
  resetPassword(code: string, newPassword: string) {
    return this.afAuth.auth.confirmPasswordReset(code, newPassword);
  }

  /**
   * Registers new user with given credentials
   *
   * @param email     user's email
   * @param password  user's password
   */
  register(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  /**
   * Creates an anonimous user and signs it in.
   * The user credentials are stored in the localStorage.
   * If they are lost the data will be lost forever.
   */
  anonimousLogin() {
    return this.afAuth.auth.signInAnonymously();
  }

  /**
   * Logs the user out the system
   */
  logout() {
    this.afAuth.auth.signOut();
  }
}
