import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Places, DestinationItem, Activity } from '../../places/places.model';

export class EditPlacesService {
  constructor(private http: HttpClient) {}

  /**
   * Loads a specific place by ID using an HTTP GET request.
   */
  public loadPlace(id: string): Observable<Places> {
    const url = `https://your-api.com/vacations/${id}`;
    return this.http.get<Places>(url);
  }

  /**
   * Loads the list of destinations using an HTTP GET request.
   */
  public loadDestinationList(): Observable<DestinationItem[]> {
    const url = `https://your-api.com/destinations`;
    return this.http.get<DestinationItem[]>(url).pipe(
      shareReplay(1) // Cache the result for future subscribers
    );
  }

  /**
   * Loads the collection of activities using an HTTP GET request.
   */
  public loadActivitiesCollection(): Observable<Activity[]> {
    const url = `https://your-api.com/activities`;
    return this.http.get<Activity[]>(url).pipe(
      map((activities: Activity[]) =>
        activities.map((activity) => ({
          ...activity,
          // Ensure ID is included if not already
          id: activity.id || '',
        }))
      )
    );
  }
}
