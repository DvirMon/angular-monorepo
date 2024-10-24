import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User as FirebaseUser } from 'firebase/auth';
import { Observable, of, switchMap, throwError } from 'rxjs';
import {
  Credential,
  FireAuthService,
  mapUser,
  SignInEvent,
  SignInMethod,
  User,
} from '../../auth';
import { UserService } from '../../auth/utils/user.service';
import { API_URL } from '../../shared/tokens';

interface EmailPasswordData {
  email: string;
  password: string;
}

type SignInStrategy = (data?: unknown) => Observable<Credential>;

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  readonly #fireAuthService = inject(FireAuthService);

  readonly #userService = inject(UserService);

  readonly #signInStrategies: Map<SignInMethod, SignInStrategy> = new Map();

  readonly #http = inject(HttpClient);

  readonly #apiUrl = inject(API_URL);

  constructor() {
    this.#setSignInMap();
  }
  // Sign in with different authentication methods based on the provided event.
  public signIn$(event: SignInEvent): Observable<User> {
    const { method, data } = event;
    return of(method).pipe(
      switchMap((method: SignInMethod) =>
        this.executeSignInStrategy(method, data).pipe(
          switchMap((credential: Credential) =>
            this.processUserCredential(credential)
          )
        )
      )
    );
  }

  /**
   * Executes the sign-in strategy based on the provided method and data.
   */
  private executeSignInStrategy(
    method: SignInMethod,
    data: unknown
  ): Observable<Credential> {
    const strategy = this.#signInStrategies.get(method);
    if (strategy) {
      return strategy(data);
    } else {
      return throwError(() => new Error('Unsupported sign-in method'));
    }
  }

  /**
   * Processes the user credential: fetches the user from the database or creates a new entry if necessary.
   */
  private processUserCredential(credential: Credential): Observable<User> {
    const firebaseUser = credential.user;
    const providerId = credential.providerId;

    return this.#fetchOrCreateUser$(firebaseUser, providerId);
  }

  /**
   * Fetches the user from the database or creates a new user if they don't exist.
   */
  #fetchOrCreateUser$(
    firebaseUser: FirebaseUser,
    providerId: string | null
  ): Observable<User> {
    return this.#userService.getUserById(firebaseUser.uid).pipe(
      switchMap((existingUser: User | null) => {
        if (existingUser) {
          return of(existingUser);
        } else {
          // Create a new user if it doesn't exist (for Google sign-in)
          if (providerId === 'google.com') {
            const newUser = mapUser(firebaseUser);
            return this.#userService.saveUser(newUser);
          }
          // Handle other cases or throw an error
          return throwError(() => new Error('User does not exist'));
        }
      })
    );
  }

  #setSignInMap() {
    this.#signInStrategies.set(SignInMethod.GOOGLE, () =>
      this.#fireAuthService.signInWithGoogle$()
    );

    this.#signInStrategies.set(SignInMethod.EMAIL_PASSWORD, (data: unknown) => {
      const { email, password } = data as EmailPasswordData;
      return this.#fireAuthService.signInWithEmailAndPassword$(email, password);
    });
  }

  #signInWithGoogle() {
    this.#fireAuthService.signInWithGoogle$();
  }
}

// Google sign in
// 1. Sign in with Google
// 2. find out if the user exists in database
// 3. if not, create a new user
