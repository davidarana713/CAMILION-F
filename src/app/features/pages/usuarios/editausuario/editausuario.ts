import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editausuario',
  imports: [],
  templateUrl: './editausuario.html',
  styleUrl: './editausuario.css',
})
export class Editausuario {
  idSeleccionado!: string | null;

  constructor( private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.idSeleccionado = this.activatedRoute.snapshot.paramMap.get('id');
    console.log( this.idSeleccionado );
  }
}
