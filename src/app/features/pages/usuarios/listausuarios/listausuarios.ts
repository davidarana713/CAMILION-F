import { Component } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, switchMap } from 'rxjs';
import { HttpRegister } from '../../../../core/services/http-register';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-listausuarios',
  imports: [AsyncPipe,RouterLink],
  templateUrl: './listausuarios.html',
  styleUrl: './listausuarios.css',
})
export class Listausuarios {
  public estadoSubcripcionEliminar!: Subscription;

  public usuarios:Observable<any[]> = new Observable<any[]>();

  private refreshTriggerUsuario$ = new BehaviorSubject<void>(undefined);

  constructor(
    private httpusuario:HttpRegister,
    private router: Router
  ){}

  ngOnInit(){
    this.usuarios = this.refreshTriggerUsuario$.pipe(switchMap(() => this.httpusuario.getUsuario()))
  }

  ngDestroy() {
    if( this.estadoSubcripcionEliminar ){
      this.estadoSubcripcionEliminar.unsubscribe();
    }
  }

  onEditar(id: string) {
    console.log( 'Editar usuario por el ID ', id );
    this.router.navigate(['/editausuario', id]);
  }

  onEliminar(id:string) {
    console.log( 'Elimina usuario por el ID ', id );

    this.estadoSubcripcionEliminar = this.httpusuario.deleteUsuario(id).subscribe({
      next: ( data ) => {
        console.log( data );
        this.refreshTriggerUsuario$.next();
      },
      error: ( err ) => {
        console.error( err );
      }
    });
  }

}
