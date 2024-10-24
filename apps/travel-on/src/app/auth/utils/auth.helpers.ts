import { Location } from '@angular/common';
import { Injector, inject, runInInjectionContext } from '@angular/core';
import { UserCredential, User as UserFirebase } from 'firebase/auth';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormServerError } from '@dom/components/form/types';
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './auth.model';

// Function to generate a valid URL for the email verification link
export function generateVerificationLink(
  injector: Injector,
  param?: Params
): string {
  return runInInjectionContext(injector, () => {
    const baseUrl = inject(Location).normalize(location.origin);

    // Create the URL tree with the desired route and any necessary query parameters
    const urlTree = inject(Router).createUrlTree(['/verify-email'], {
      queryParams: { token: 'verification_token', ...param },
    });

    // Convert the URL tree to a string
    const url = inject(Router).serializeUrl(urlTree);

    const verificationLink = baseUrl + url;

    return verificationLink;
  });
}

export function getUserEmailFromUrl(
  injector: Injector,
  param: string
): string | null {
  const activatedRoute = inject(ActivatedRoute);
  return runInInjectionContext(injector, () =>
    activatedRoute.snapshot.queryParamMap.get(param)
  );
}

export function mapToUID() {
  return (source: Observable<UserCredential>): Observable<string> =>
    source.pipe(map((credential: UserCredential) => credential.user.uid));
}

export function mapFirebaseCredentials(): OperatorFunction<
  UserCredential,
  User
> {
  return (source: Observable<UserCredential>): Observable<User> =>
    source.pipe(
      map((credential: UserCredential) => credential.user),
      map((userFirebase: UserFirebase) => {
        const user = mapUser(userFirebase); // Replace with your _mapUser logic
        return user;
      })
    );
}

export function mapUser(user: UserFirebase): User {
  return {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    emailVerified: user.emailVerified,
    photoURL: user.photoURL,
  } as User;
}

export function mapAuthServerError(code: string): FormServerError {
  const authErrorMessages: { [errorCode: string]: FormServerError } = {
    'auth/user-not-found': {
      control: 'email',
      message: 'This email is not register.',
    },
    'auth/too-many-requests': {
      control: 'email',
      message: 'You reach your limit requests.',
    },

    'auth/email-already-exists': {
      control: 'email',
      message: 'This email is already exist.',
    },

    'auth/invalid-email': {
      control: 'email',
      message: 'The email address is not valid.',
    },
    'auth/invalid-password': {
      control: 'password',
      message: 'The password is not valid.',
    },
    'auth/missing-password': {
      control: 'password',
      message: 'The password is not valid.',
    },
    'auth/wrong-password': {
      control: 'password',
      message: 'Password is not match.',
    },

    'auth/invalid-action-code': {
      control: 'newPassword',
      message: 'action code provided may have expired or already been used.',
    },
  };

  return authErrorMessages[code] || { control: '', message: '' };
}
