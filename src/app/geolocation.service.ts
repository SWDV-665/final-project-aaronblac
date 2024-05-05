import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

   async getCurrentPosition(): Promise<GeolocationPosition>{
    try{
      const coordinates = await Geolocation.getCurrentPosition();
      return coordinates;
    }catch(error){
      console.error('Error getting current position: ', error);
      throw error;
    }
  }

  async watchPosition(): Promise<void>{
    const options = {enableHighAccuracy: true, timeout: 5000, maximumAge: 0, backgroundMode: 'require'};
    try{
      await Geolocation.watchPosition(options, (position: GeolocationPosition)=>{
        this.geolocationSubject.next(position);
      })
    }catch(error){
      console.error('Watch Position Error: ', error);
      throw error;
    }
  }

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the earth in km
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceInKm = R * c; // Distance in km
    return distanceInKm * 0.621371; // Convert to miles
  }

  toRad(x: number): number {
    return x * Math.PI / 180;
  }

  private geolocationSubject = new Subject<GeolocationPosition>();

  public getPositonUpdates(): Observable<GeolocationPosition>{
    return this.geolocationSubject.asObservable();
  }
}
