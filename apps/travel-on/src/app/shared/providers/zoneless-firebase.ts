import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import { Auth, connectAuthEmulator, getAuth } from 'firebase/auth';
import { createNoopInjectionToken } from 'ngxtension/create-injection-token';

export const [firebaseApp, provideFirebaseApp] =
  createNoopInjectionToken<FirebaseApp>('[Firebase] App');

export const [firebaseAuth, provideFirebaseAuth] =
  createNoopInjectionToken<Auth>('[Firebase] Auth');

export interface FirebaseConfig {
  options: FirebaseOptions;
  features?: Partial<{
    auth: {
      emulators?: { host: string; port: number };
    };
    firestore: {
      emulators?: { host: string; port: number };
    };
  }>;
}

export function provideZonelessFirebase({ options, features }: FirebaseConfig) {
  const app = initializeApp(options);
  const providers = [provideFirebaseApp(app)];

  for (const feature in features) {
    switch (feature) {
      case 'auth': {
        const auth = getAuth(app);
        providers.push(provideFirebaseAuth(auth));

        const emulators = features[feature]?.emulators;

        if (emulators) {
          connectAuthEmulator(
            auth,
            `http://${emulators.host}:${emulators.port}`
          );
        }

        break;
      }
    }
  }

  return providers;
}
