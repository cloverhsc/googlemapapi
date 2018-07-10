import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  private url = 'https://data.cityofnewyork.us/api/geospatial/arq3-7z49?method=export&format=GeoJSON';
  constructor(private http: HttpClient) { }

  GetDataService(): Observable<any> {
    return this.http.get(this.url);
  }
}
