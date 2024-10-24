import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, handle) => {
  return handle(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (!navigator.onLine) {
        // Check if it's a connection error (offline)
        alert('You are offline. Please check your internet connection.');
      } else if (error.status === 0) {
        // This indicates a network connection error
        alert('Connection error! Please try again later.');
      } else {
        // Handle other types of errors
        console.error('Error Status:', error.status);
        console.error('Error Details:', error);
      }
      // Throw the error to be handled elsewhere if needed

      return throwError(() => error);
    })
  );
};
