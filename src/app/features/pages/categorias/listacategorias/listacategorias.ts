import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, switchMap } from 'rxjs';
import { HttpCategory } from '../../../../core/services/http-category';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-listacategorias',
  imports: [RouterLink,AsyncPipe,JsonPipe],
  templateUrl: './listacategorias.html',
  styleUrl: './listacategorias.css',
})
export class Listacategorias {

  public estadoSubcripcionEliminar!: Subscription;

  public categorias: Observable <any[]> = new Observable <any[]>();

  private refreshTriggerCategorias$ = new BehaviorSubject<void>(undefined);

 constructor(
  private httpCategory:HttpCategory,
  private router: Router

 ){}

 ngOnInit(){
  this.categorias = this.refreshTriggerCategorias$.pipe(
    switchMap( () => this.httpCategory.getCategories())
  )
 }

 ngDestroy() {
    if( this.estadoSubcripcionEliminar ){
      this.estadoSubcripcionEliminar.unsubscribe();
    }
  }

  onEditar(id: string) {
    console.log( 'Editar la categoria por el ID ', id );
    this.router.navigate(['/editacategoria', id]);
  }

 onEliminar(id:string){
  console.log('Eliminar la categoria por ID',id);
  this.estadoSubcripcionEliminar=this.httpCategory.deleteCategoria(id).subscribe({

    next:(data) =>{
      console.log(data);
      this.refreshTriggerCategorias$.next();
    },
    error:(err)=>{
      console.error(err);
    }
  });

 }

}
