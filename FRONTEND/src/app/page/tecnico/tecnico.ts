import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface RequerimientoTecnico {
  codigo: string;
  ordenServicio: string | null;
  repuestoRequerido: string | null;
  cantidadSolicitada: number | string | null;
  motivoEspecificaciones: string | null;
  solicitadoEn: string;
}

@Component({
  selector: 'app-tecnico',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './tecnico.html',
  styleUrls: ['./tecnico.css', '../cliente/cliente.css']
})
export class Tecnico implements OnInit {
  vistaActual: string = 'listado'; 
  subTabActiva: string = 'ordenes';
  modoEdicion: boolean = false;
  
  // Variables para almacenar los datos en memoria local
  itemActual: any = null;
  requerimientoActual: RequerimientoTecnico | null = null;

  tecnicoForm: FormGroup;
  requerimientoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.tecnicoForm = this.fb.group({
      diagnostico: ['', Validators.required],
      tipoMantenimiento: ['', Validators.required],
      repuestosRequeridos: [''],
      accionesRealizadas: ['', Validators.required],
      estadoVerificacion: ['', Validators.required]
    });

    this.requerimientoForm = this.fb.group({
      ordenServicio: ['', Validators.required],
      repuestoRequerido: ['', Validators.required],
      cantidadSolicitada: ['', [Validators.required, Validators.min(1)]],
      motivoEspecificaciones: ['', Validators.required]
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
    this.tecnicoForm.reset();
    this.requerimientoForm.reset();
  }

  mostrarFormularioRequerimiento() {
    this.vistaActual = 'formRequerimiento';
    this.modoEdicion = false;
    this.requerimientoForm.reset();
  }

  guardarTecnico() {
    this.itemActual = this.tecnicoForm.getRawValue();
    this.vistaActual = 'detalle';
    this.modoEdicion = false;
  }

  guardarRequerimiento() {
    if (this.requerimientoForm.invalid) {
      this.requerimientoForm.markAllAsTouched();
      return;
    }

    const requerimientoExistente = this.modoEdicion ? this.requerimientoActual : null;
    this.requerimientoActual = {
      ...this.requerimientoForm.getRawValue(),
      codigo: requerimientoExistente?.codigo ?? this.generarCodigoRequerimiento(),
      solicitadoEn: requerimientoExistente?.solicitadoEn
        ?? this.formatearFecha(new Date())
    };
    this.vistaActual = 'detalleRequerimiento';
    this.modoEdicion = false;
  }

  private generarCodigoRequerimiento(): string {
    const fecha = Date.now().toString(36).toUpperCase();
    const sufijo = Math.random().toString(36).slice(2, 5).toUpperCase();
    return `REQ-${fecha}-${sufijo}`;
  }

  private formatearFecha(fecha: Date): string {
    const fechaFormato = fecha.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    const horaFormato = fecha.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).replace(' AM', ' a. m.').replace(' PM', ' p. m.');

    return `${fechaFormato}, ${horaFormato}`;
  }

  editarRequerimiento() {
    this.vistaActual = 'formRequerimiento';
    this.modoEdicion = true;
    if (this.requerimientoActual) {
      this.requerimientoForm.patchValue(this.requerimientoActual);
    }
  }

  verDetalle() {
    this.vistaActual = 'detalle';
  }
}