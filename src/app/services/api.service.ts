import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  UsuariosLista: any;

  constructor( private http : HttpClient) { }

  postUsuario(data : any){
    return this.http.post<any>("http://localhost:3000/UsuariosLista/", data);
  }

  getUsuario(){
    return this.http.get<any>("http://localhost:3000/UsuariosLista/");
  }

  putUsuario(data:any, id :number){
    return this.http.put<any>("http://localhost:3000/UsuariosLista/"+id,data);
  }
  eliminarUsuario(id:number){
    return this.http.delete<any>("http://localhost:3000/UsuariosLista/"+id);
  }
}
