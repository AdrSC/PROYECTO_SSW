import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recepcion',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './recepcion.html',
  styleUrl: '../cliente/cliente.css'
})
export class Recepcion implements OnInit {
  vistaActual: string = 'listado';
  modoEdicion: boolean = false;
  ordenActual: any = null;

  recepcionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.recepcionForm = this.fb.group({
      num_solicitud: ['', Validators.required],
      COD_SEGUIMIENTO: ['', Validators.required],
      fecha_hora_recepcion: ['', Validators.required],
      estado_visual: ['', Validators.required],
      accesorios_entregados: ['', Validators.required],
      IDTECNICO: ['', Validators.required],
      IDEMPREC: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  mostrarListado() {
    this.vistaActual = 'listado';
    this.modoEdicion = false;
    this.recepcionForm.reset();
  }

  mostrarFormulario() {
    this.vistaActual = 'formulario';
    this.modoEdicion = false;
    this.recepcionForm.reset();
  }

  guardarOrden() {
    this.ordenActual = this.recepcionForm.value;
    this.vistaActual = 'detalle';
    this.modoEdicion = false;
  }

  editarOrden() {
    this.vistaActual = 'formulario';
    this.modoEdicion = true;

    if (this.ordenActual) {
      this.recepcionForm.patchValue(this.ordenActual);
    }
  }

  verDetalle() {
    this.vistaActual = 'detalle';
  }
}