import { Injectable } from '@angular/core';
import { UserCredential } from '@angular/fire/auth';
import { defer, from, Observable, switchMap } from 'rxjs';

export interface FirebaseError {
  code: string;
  customData: Record<string, unknown>;
  name: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class FireAuthService {
  #loadFirebaseAuth() {
    return from(
      import('firebase/auth').then((firebase) => {
        return firebase;
      })
    );
  }

  public createUserWithEmailAndPassword$(
    email: string,
    password: string
  ): Observable<UserCredential> {
    return this.#loadFirebaseAuth().pipe(
      switchMap(({ getAuth, createUserWithEmailAndPassword }) => {
        const auth = getAuth();
        // Use 'from' to convert the promise to an observable
        return defer(() =>
          createUserWithEmailAndPassword(auth, email, password)
        );
      })
    );
  }
  // Check if the provided email link is a valid sign-in link.
  public signInWithGoogle$(): Observable<UserCredential> {
    return this.#loadFirebaseAuth().pipe(
      switchMap(({ getAuth, signInWithPopup, GoogleAuthProvider }) => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        return from(signInWithPopup(auth, provider));
      })
    );
  }

  // Sign in with email and password.
  public signInWithEmailAndPassword$(
    email: string,
    password: string
  ): Observable<UserCredential> {
    return this.#loadFirebaseAuth().pipe(
      switchMap(({ getAuth, signInWithEmailAndPassword }) => {
        const auth = getAuth();

        const userCredential = signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        return defer(() => userCredential);
      })
    );
  }

  // Send password reset email.
  public sendPasswordResetEmail(email: string): Observable<void> {
    return this.#loadFirebaseAuth().pipe(
      switchMap((firebase) => {
        const auth = firebase.getAuth();
        return defer(() => firebase.sendPasswordResetEmail(auth, email));
      })
    );
  }

  // Confirm password reset.
  public confirmPasswordReset(
    oobCode: string,
    newPassword: string
  ): Observable<void> {
    return this.#loadFirebaseAuth().pipe(
      switchMap((firebase) => {
        const auth = firebase.getAuth();
        return defer(() =>
          firebase.confirmPasswordReset(auth, oobCode, newPassword)
        );
      })
    );
  }

  // public confirmPasswordResetEager(
  //   oobCode: string,
  //   newPassword: string
  // ): Observable<void> {
  //   return from(confirmPasswordReset(this.auth, oobCode, newPassword));
  // }
}
