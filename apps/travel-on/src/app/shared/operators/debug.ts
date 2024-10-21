import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// Helper function to get stack trace metadata
function getCallerInfo(): string {
  const error = new Error();
  const stack = error.stack?.split('\n');

  if (stack && stack.length > 3) {
    // Typically, the fourth line in the stack trace gives us the caller information
    const callerLine = stack[3].trim();

    // Extracting relevant file, line, and function info from stack trace
    const match = callerLine.match(/\((.*)\)/);
    return match ? match[1] : callerLine;
  }

  return 'Unknown caller';
}

// Custom debugTap operator with additional metadata logging
export function debugTap<T>(
  message: string
): (source: Observable<T>) => Observable<T> {
  return (source: Observable<T>) =>
    source.pipe(
      tap((value) => {
        if (!environment.production) {
          const callerInfo = getCallerInfo();
          console.log(
            `${message} | Value:`,
            value,
            `| Called from: ${callerInfo}`
          );
        }
      })
    );
}
