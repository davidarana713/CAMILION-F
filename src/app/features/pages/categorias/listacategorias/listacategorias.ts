import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { HttpCategory } from '../../../../core/services/http-category';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-listacategorias',
  imports: [RouterLink,AsyncPipe,JsonPipe],
  templateUrl: './listacategorias.html',
  styleUrl: './listacategorias.css',
})
export class Listacategorias {

  public categorias: Observable <any[]> = new Observable <any[]>();

  private refreshTriggerCategorias$ = new BehaviorSubject<void>(undefined);

 constructor(private httpCategory:HttpCategory){}

 ngOnInit(){
  this.categorias = this.refreshTriggerCategorias$.pipe(
    switchMap( () => this.httpCategory.getCategories())
  )
 }

}
