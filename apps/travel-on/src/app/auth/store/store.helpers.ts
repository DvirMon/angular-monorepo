import { UserCredential } from '@angular/fire/auth';
import { tapResponse } from '@ngrx/operators';
import { patchState, WritableStateSource } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, map, Observable, pipe, switchMap } from 'rxjs';
import { SignInService } from '../../pages/login/sign-in.service';
import { RegisterService } from '../../pages/register/register.service';
import { ResetService } from '../../pages/reset/reset.service';
import { DialogService } from '../../shared/dialog/dialog.service';
import { AuthDialogEvent, authDialogMap } from '../auth-dialogs';
import {
  AuthEvent,
  FirebaseError,
  mapFirebaseCredentials,
  Register,
  SignInEvent,
  User,
} from '../utils';
import { UserService } from '../utils/user.service';
import { AuthState } from './auth.state';
import { setAuthError, setUser } from './store.setters';

export function signIn(
  service: SignInService,
  store: WritableStateSource<AuthState>,
  event: AuthEvent
) {
  return rxMethod<SignInEvent>(
    pipe(
      switchMap((value) =>
        service.signIn$(value).pipe(
          map((credential: UserCredential) => credential.user.uid),
          switchMap((uid: string) =>

            // TODO : save user after gmail login?
            service.getUser(uid).pipe(handleLoadUserResponse(store, event))
          )
        )
      )
    )
  );
}
//   return rxMethod<SignInEvent>(
//     pipe(
//       switchMap((value) =>
//         service.signIn$(value).pipe(
//           switchMap((value: UserCredential) =>
//             from(value.user.getIdToken()).pipe(
//               debugTap('Token'),
//               switchMap((token: string) => service.getUser(token))
//             )
//           )
//         )
//       )
//     )
//   );
// }

export function register(
  service: RegisterService,
  store: WritableStateSource<AuthState>,
  event: AuthEvent
) {
  return rxMethod<Register>(
    pipe(
      switchMap((value) =>
        service.register$(value).pipe(handleLoadUserResponse(store, event))
      )
    )
  );
}
export function loadUserById(
  service: UserService,
  store: WritableStateSource<AuthState>,
  event: AuthEvent
) {
  return rxMethod<string>(
    pipe(
      switchMap((userId) =>
        service.loadUserById$(userId).pipe(handleLoadUserResponse(store, event))
      )
    )
  );
}

/*************  ✨ Codeium Command ⭐  *************/
/**
 * TapResponse operator that handles the response from loading a user.
 *
 * In case of a successful response, it sets the user in the store.
 * In case of an error, it sets the error in the store.
 *
 * @param store The auth store.
 * @param event The event that triggered the user load.
 * @returns A tapResponse operator that handles the response.
 */
/******  a84524d5-839e-4495-b35c-9e400f1e0a07  *******/

export function handleLoadUserResponse(
  store: WritableStateSource<AuthState>,
  event: AuthEvent
) {
  return tapResponse({
    next: (user: User) => patchState(store, setUser(user)),
    error: (err: FirebaseError) => {
      patchState(store, setAuthError(err.code, event));
    },
  });
}

export function confirmPasswordReset(
  store: WritableStateSource<AuthState>,
  authEvent: AuthEvent,
  service: ResetService,
  dialog: DialogService
) {
  return rxMethod<{
    newPassword: string;
    oobCode: string;
    event: AuthDialogEvent;
  }>(
    pipe(
      exhaustMap(({ newPassword, oobCode, event }) =>
        service.confirmPasswordReset$({ newPassword, oobCode }).pipe(
          tapResponse({
            next: () =>
              dialog.openDialog(authDialogMap[event], { email: '', event }),
            error: (err: FirebaseError) =>
              patchState(store, setAuthError(err.code, authEvent)),
          })
        )
      )
    )
  );
}

export function authenticate<T>(
  store: WritableStateSource<AuthState>,
  event: AuthEvent,
  authActionFn: (value: T) => Observable<UserCredential>
) {
  return rxMethod<T>(
    pipe(
      switchMap((value) =>
        authActionFn(value).pipe(
          mapFirebaseCredentials(),
          handleLoadUserResponse(store, event)
        )
      )
    )
  );
}
