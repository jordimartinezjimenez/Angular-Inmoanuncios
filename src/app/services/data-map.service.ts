import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { IMap } from '../interfaces/imap';
import { IAnuncio } from '../interfaces/ianuncio';
import { IMunicipio } from '../interfaces/imunicipio';
import { IProvincia } from '../interfaces/iprovincia';
import { DataAnunciosService } from '../services/data-anuncios.service';

@Injectable({
  providedIn: 'root'
})
export class DataMapService {

  apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient, private anuncioService: DataAnunciosService) { }

  getMap(anuncio: IAnuncio): Observable<IMap> {
    let url = 'http://api.positionstack.com/v1/forward', apiKey = '9461f1f9a3766f44b90bdffd4466830a';
    return this._http.get<IMap>(`${url}?access_key=${apiKey}&query=${anuncio.calle}, ${anuncio.num}, ${anuncio.cp} Spain`);
  }

  getMap2(): Observable<IMap> {
    let url = 'http://api.positionstack.com/v1/forward', apiKey = '9461f1f9a3766f44b90bdffd4466830a';
    return this._http.get<IMap>(`${url}?access_key=${apiKey}&query=Carrer del Camp de les Moreres, 14, 08401 Granollers, Barcelona`);
  }
}
