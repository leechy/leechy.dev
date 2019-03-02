import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  constructor() {}

  /**
   * Searches in route snapshot parameters and all the parent routes
   * for a parameter with specific name and returns it's value or null
   * if there is no such parameter
   *
   * @param routeSnapshot  route snapshot from ActivatedRoute object
   * @param paramName      name of the parameter we're looking for
   */
  static findRouteParam(routeSnapshot, paramName: string) {
    let paramValue = null;
    while (!paramValue && routeSnapshot.parent) {
      if (routeSnapshot.params[paramName]) {
        paramValue = routeSnapshot.params[paramName];
      } else {
        routeSnapshot = routeSnapshot.parent;
      }
    }
    return paramValue;
  }
}
