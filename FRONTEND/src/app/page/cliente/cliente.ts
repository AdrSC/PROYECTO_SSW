import {Routes} from '@angular/router';
import {RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { Principal } from '../principal/principal';
@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './cliente.html',
  styleUrl: './cliente.css'
})

export class ClienteFormComponent {
  vistaActual: string = 'listado';
  modoEdicion: boolean = false;
  ordenActual: any = null; // Variable para almacenar la orden en memoria
  mensajeExito = 'Registro creado.';


  ngOnInit(): void {}

  mostrarListado() {
    this.vistaActual = 'listado';
    this.modoEdicion = false;
    this.formulario.reset();
  }

  mostrarFormulario() {
    this.vistaActual = 'formulario';
    this.modoEdicion = false;
    this.formulario.reset();
  }

  guardarOrden() {
    this.ordenActual = this.formulario.getRawValue();
    this.mensajeExito = this.modoEdicion ? 'Orden actualizada.' : 'Registro creado.';
    this.vistaActual = 'detalle';
    this.modoEdicion = false;
  }

  editarOrden() {
    if (!this.ordenActual) {
      return;
    }

    this.vistaActual = 'formulario';
    this.modoEdicion = true;

    this.formulario.patchValue({
      nomCliente: this.ordenActual.nomCliente,
      apeCliente: this.ordenActual.apeCliente,
      dni: this.ordenActual.dni,
      numTel: this.ordenActual.numTel,
      correo: this.ordenActual.correo,
      direcc: this.ordenActual.direcc,
      MARCA: this.ordenActual.MARCA,
      MODELO: this.ordenActual.MODELO,
      NUMERO_SERIE: this.ordenActual.NUMERO_SERIE,
      DESCRIPCION: this.ordenActual.DESCRIPCION
    });
}

// ... (tus otros métodos como guardarOrden, editarOrden, etc.)

  confirmarEliminacion() {
    // Cambia la vista a la tarjeta de confirmación
    this.vistaActual = 'eliminar';
  }

  cancelarEliminacion() {
    // Si cancela, regresa a la vista de detalle de la orden
    this.vistaActual = 'detalle';
  }

  eliminarOrden() {
    // Vacía la orden actual de la memoria local
    this.ordenActual = null;
    
    // Regresa a la vista principal del listado
    this.vistaActual = 'listado';
  }

  private fb=inject(FormBuilder);
  private clienteService=inject(ClienteService);
  mensaje = '';
  guardando =false;
  exito=false;
  formulario = this.fb.nonNullable.group({
    nomCliente: ['', Validators.required],
    apeCliente: ['', Validators.required],
    dni: [''],
    correo: [''],
    direcc: [''],
    numTel: [''],
    MARCA: [''],
    MODELO: [''],
    NUMERO_SERIE: [''],
    DESCRIPCION: ['']
  });

  registrar():void{
    this.mensaje='';
    this.exito=false;

    if(this.formulario.invalid){
      this.formulario.markAllAsTouched();
      this.mensaje='Revisa los campos, nombre y apellido son obligatorios';
      return;
    }
    this.guardando=true;
         this.clienteService.crearCliente(this.formulario.getRawValue())
      .subscribe({
        next: () => {
          this.exito = true;
          this.mensaje = '¡Cliente registrado correctamente!';
          this.formulario.reset();
          this.guardando = false;
        },
        error: (error) => {
          console.error('Error al registrar cliente:', error);
          this.mensaje = error.status === 0
            ? 'No se pudo conectar con el backend. Verifica que esté ejecutándose y que CORS esté configurado.'
            : `No se pudo registrar el cliente. Código: ${error.status}.`;
          this.guardando = false;
        }
      });

}
}