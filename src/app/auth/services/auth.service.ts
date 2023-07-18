import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface'
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})

export class AuthService {

    private baseUrl = enviroments.baseUrl;
    private user?: User;

    constructor(private http: HttpClient) { }
    
get currentUser(): User|undefined {
    if( !this.user ) return undefined;
    return structuredClone( this.user ); 

}

   
 login( email: String, password: string ): Observable<User>{
   // http.post('login', {email, password})

   return this.http.get<User>(`${ this.baseUrl}/users/1`)
   .pipe(
     tap( user=>{ this.user = user    }
     ),
     tap( user=>{ localStorage.setItem('token', '6576567.asdasdsas.assdq3e3' );
     }
   )
   )

 }  

checkAuthentication():Observable<boolean> {

  if( !localStorage.getItem('token')){
    return of(false);
  }

  const token = localStorage.getItem('token');

  return this.http.get<User>(`${this.baseUrl}/users/1`)
  .pipe(
    tap(user => this.user = user ),
    map( user => !!user),
    catchError( err => of(false))
  );
}


 logout(){
   this.user = undefined;
   localStorage.clear();
 }

}