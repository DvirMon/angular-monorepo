import {
  animate,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Injector, inject, runInInjectionContext } from '@angular/core';
import { OperatorFunction, catchError, map, throwError } from 'rxjs';
import { StorageKey } from './constants';
import { Router } from '@angular/router';

function setRecordItem(
  record: Record<string, boolean>,
  item: string
): Record<string, boolean> {
  return { ...record, [item]: true };
}

export function arrayToRecord(array: string[]): Record<string, boolean> {
  return array.reduce(
    (record, item) => setRecordItem(record, item),
    {} as Record<string, boolean>
  );
}

interface StorageOptions {
  useSessionStorage: boolean;
}

export function setToStorage(
  key: StorageKey,
  value: unknown,
  options: StorageOptions = { useSessionStorage: true }
): void {
  const storage = options.useSessionStorage ? sessionStorage : localStorage;
  storage.setItem(key, JSON.stringify(value));
}

export function getFromStorage<T>(
  key: StorageKey,
  options: StorageOptions = { useSessionStorage: true },
  remove = false
): T | null {
  const storage = options.useSessionStorage ? sessionStorage : localStorage;
  const item = storage.getItem(key);

  if (remove) {
    storage.removeItem(key);
  }

  return item ? (JSON.parse(item) as T) : null;
}

export function clearStorage(
  options: StorageOptions = { useSessionStorage: true }
) {
  const storage = options.useSessionStorage ? sessionStorage : localStorage;
  storage.clear();
}

// Define the custom RxJS operator


export function navigate(path: string, injector?: Injector): void {
  runInInjectionContext(injector || inject(Injector), () => {
    inject(Router).navigateByUrl(path);
  });
}

export const scrollAnimation = trigger('scrollAnimation', [
  transition('* => *', [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
          opacity: 0,
          transform: 'translateY(100px)',
        }),
      ],
      { optional: true }
    ),
    query(
      ':enter',
      [
        animate(
          '1500ms ease',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ],
      { optional: true }
    ),
  ]),
]);
