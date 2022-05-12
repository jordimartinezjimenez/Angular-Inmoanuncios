import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { IAnuncio } from '../interfaces/ianuncio';
import { ITipo } from '../interfaces/itipo';
import { IMunicipio } from '../interfaces/imunicipio';
import { IGeneral } from '../interfaces/igeneral';

@Injectable({
  providedIn: 'root'
})
export class DataAnunciosService {

  apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  getData(): Observable<IAnuncio[]> {
    let result = this._http.get<IAnuncio[]>(`${this.apiUrl}/api/anuncios`);
    return result;
  }

  getAnuncio(id: number): Observable<IAnuncio> {
    let result = this._http.get<IAnuncio>(`${this.apiUrl}/api/anuncio/${id}`);
    return result;
  }

  getTipoAnuncio(id: number): Observable<ITipo> {
    let result = this._http.get<ITipo>(`${this.apiUrl}/api/anuncio/tipo/${id}`);
    return result;
  }

  getMunicipioAnuncio(id: number): Observable<IMunicipio> {
    let result = this._http.get<IMunicipio>(`${this.apiUrl}/api/anuncio/municipio/${id}`);
    return result;
  }

  getProvinciaAnuncio(id: number): Observable<IGeneral> {
    let result = this._http.get<IGeneral>(`${this.apiUrl}/api/anuncio/provincia/${id}`);
    return result;
  }

  getVendedorAnuncio(id: number): Observable<IGeneral> {
    let result = this._http.get<IGeneral>(`${this.apiUrl}/api/anuncio/vendedor/${id}`);
    return result;
  }

  // getLatLng(municipio: string, provincia: string, calle: string, num: number, cp: number) {
  //   let apiKey = '9461f1f9a3766f44b90bdffd4466830a';
  //   return this._http.get(`http://api.positionstack.com/v1/forward?access_key=${apiKey}&query=${calle}${num}${cp}${municipio}${provincia}`)
  // }

  getLatLng(municipio: string, provincia: string, calle: string, num: number, cp: number) {
    return this._http.get(`https://nominatim.openstreetmap.org/?addressdetails=1&q=${calle}${num}${cp}${municipio}${provincia}&format=json&limit=1`)
  }

  public postAnuncio(formData: FormData): Observable<any> {
    return this._http.post(`${this.apiUrl}/api/anuncio`, formData);
  }

  contactarVendedor(data: Object): Observable<any> {
    let result = this._http.post<any>(`${this.apiUrl}/api/contactar-vendedor`, data);
    return result;
  }
  
  public deleteAnuncio(id:number): Observable<any> {
    return this._http.delete(`${this.apiUrl}/api/anuncio/`+ id);
  }
}
