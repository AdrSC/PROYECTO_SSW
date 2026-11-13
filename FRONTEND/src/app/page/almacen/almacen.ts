import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-almacen',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './almacen.html',
  styleUrls: ['./almacen.css', '../cliente/cliente.css']
})
export class Almacen implements OnInit {
  vistaActual: string = 'listado'; // 'listado', 'formulario', 'detalle'
  subTabActiva: string = 'requerimientos'; // 'requerimientos', 'inventario', 'ingresos'
  modoEdicion: boolean = false;
  itemActual: any = null;

  almacenForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.almacenForm = this.fb.group({
      ordenServicio: ['', Validators.required],
      repuestoRequerido: ['', Validators.required],
      cantidadSolicitada: ['', [Validators.required, Validators.min(1)]],
      observaciones: ['']
    });
  }

  ngOnInit(): void {}

  cambiarSubTab(tab: string) {
    this.subTabActiva = tab;
    this.vistaActual = 'listado';
  }

  mostrarListado() {
    this.vistaActual = 'listado';
    this.modoEdicion = false;
    this.almacenForm.reset();
  }

  mostrarFormulario() {
    this.vistaActual = 'formulario';
    this.modoEdicion = false;
    this.almacenForm.reset();
  }

  guardarItem() {
    this.itemActual = this.almacenForm.value;
    this.vistaActual = 'detalle';
    this.modoEdicion = false;
  }

  editarItem() {
    this.vistaActual = 'formulario';
    this.modoEdicion = true;
    if (this.itemActual) {
      this.almacenForm.patchValue(this.itemActual);
    }
  }

  verDetalle() {
    this.vistaActual = 'detalle';
  }
}