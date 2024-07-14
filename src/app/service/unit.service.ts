import {EventEmitter, Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {WahaType} from "../../types/waha.type";
import {HttpClient} from "@angular/common/http";
import {WahaOtherType} from "../../types/wahaOther.type";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UnitService {


  constructor(private http: HttpClient) {

  }

  getMainUnit(): Observable<WahaType[]> {
    return this.http.get<WahaType[]>(environment.apiUnits + '/waha')
  }

  getWahaOther(unit: string): Observable<WahaOtherType[]> {
    return this.http.get<WahaOtherType[]>(environment.apiUnits + '/wahaOther?unit=' + unit)
  }

  addDuplicate(unit: WahaType): Observable<WahaType> {

    const body = {
      name: unit.name,
      pts: unit.pts,
      image: unit.image,
      power: unit.power,
      description: unit.description,
      status: unit.status

    }
    return this.http.post<WahaType>(environment.apiUnits + '/waha', body)
  }

  deleteUnit(id: string): Observable<WahaType> {
    return this.http.delete<WahaType>(environment.apiUnits + `/waha/${id}`)
  }

  addNewUnit(u: WahaOtherType, idUnitLeader: string): Observable<any> {

    const addUnitToLeader = {
      unit: u.unit,
      name: u.name,
      pts: u.pts,
      image: u.image,
      power: u.power,
      description: u.description,
      user: u.user,
      leader: idUnitLeader
    }
    return this.http.post<WahaOtherType>(environment.apiUnits + '/addedUnits', addUnitToLeader)
  }

  getOtherUnit(): Observable<WahaOtherType[]> {
    return this.http.get<WahaOtherType[]>(environment.apiUnits + '/addedUnits')
  }

  deleteOtherUnit(id:string):Observable<WahaOtherType>{
    return this.http.delete<WahaOtherType>(environment.apiUnits + `/addedUnits/${id}`)
  }
}
