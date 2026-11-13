import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-calidad',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './calidad.html',
  styleUrls: ['./calidad.css', '../cliente/cliente.css']
})
export class Calidad implements OnInit {
  vistaActual: string = 'listado'; // 'listado', 'detalle', 'formulario'
  modoEdicion: boolean = false;
  ordenActual: any = null;

  calidadForm: FormGroup;

  listaOrdenesCalidad = [
    {
      codigo: 'OS-MWEL6073-UUM',
      seguimiento: 'SEG-MWEL6073-UUM',
      cliente: 'Adriano',
      telefono: '908583142',
      equipo: 'Motorola G54 5G',
      serie: '0001110002203',
      motivo: 'Descarga de batería muy rápida',
      inspector: 'Pepito',
      verificacion: 'correcto',
      pruebas: 'correcto',
      cumple: 'Sí',
      observaciones: 'ninguna',
      estado: 'En calidad'
    }
  ];

  constructor(private fb: FormBuilder) {
    // Inicialización del formulario con los campos exactos de la interfaz de edición
    this.calidadForm = this.fb.group({
      nombreCliente: ['', Validators.required],
      telefono: ['', Validators.required],
      equipo: ['', Validators.required],
      numeroSerie: [''],
      motivoSolicitud: ['', Validators.required],
      inspectorResponsable: ['', Validators.required],
      verificacionProblema: ['', Validators.required],
      pruebasFuncionamiento: ['', Validators.required],
      cumpleestandares: ['Sí', Validators.required],
      observacionesCalidad: ['']
    });
  }

  ngOnInit(): void {}

  mostrarListado() {
    this.vistaActual = 'listado';
    this.ordenActual = null;
    this.calidadForm.reset();
  }

  verDetalle(orden: any) {
    this.ordenActual = orden;
    this.vistaActual = 'detalle';
  }

  editarEvaluacion() {
    this.vistaActual = 'formulario';
    this.modoEdicion = true;

    if (this.ordenActual) {
      this.calidadForm.patchValue({
        nombreCliente: this.ordenActual.cliente,
        telefono: this.ordenActual.telefono,
        equipo: this.ordenActual.equipo,
        numeroSerie: this.ordenActual.serie,
        motivoSolicitud: this.ordenActual.motivo,
        inspectorResponsable: this.ordenActual.inspector,
        verificacionProblema: this.ordenActual.verificacion,
        pruebasFuncionamiento: this.ordenActual.pruebas,
        cumpleestandares: this.ordenActual.cumple,
        observacionesCalidad: this.ordenActual.observaciones
      });
    }
  }

  guardarOrden() {
    // Actualizamos los datos locales con lo editado en el formulario
    if (this.ordenActual) {
      const formValues = this.calidadForm.value;
      this.ordenActual.cliente = formValues.nombreCliente;
      this.ordenActual.telefono = formValues.telefono;
      this.ordenActual.equipo = formValues.equipo;
      this.ordenActual.serie = formValues.numeroSerie;
      this.ordenActual.motivo = formValues.motivoSolicitud;
      this.ordenActual.inspector = formValues.inspectorResponsable;
      this.ordenActual.verificacion = formValues.verificacionProblema;
      this.ordenActual.pruebas = formValues.pruebasFuncionamiento;
      this.ordenActual.cumple = formValues.cumpleestandares;
      this.ordenActual.observaciones = formValues.observacionesCalidad;
    }
    this.vistaActual = 'detalle';
  }
}