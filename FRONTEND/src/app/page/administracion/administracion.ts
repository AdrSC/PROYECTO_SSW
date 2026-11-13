import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-administracion',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './administracion.html',
  styleUrls: ['./administracion.css', '../cliente/cliente.css']
})
export class Administracion implements OnInit {
  vistaActual: string = 'listado'; // Estados: 'listado', 'formularioCompra', 'formularioComprobante', 'formularioGarantia', 'detalle'
  subTabActiva: string = 'compras'; 
  modoEdicion: boolean = false;
  itemActual: any = null;

  compraForm: FormGroup;
  comprobanteForm: FormGroup;
  garantiaForm: FormGroup; // Formulario para garantías

  constructor(private fb: FormBuilder) {
    this.compraForm = this.fb.group({
      proveedor: ['', Validators.required],
      nombreMaterial: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      montoTotal: ['', Validators.required],
      observaciones: ['']
    });

    this.comprobanteForm = this.fb.group({
      ordenServicio: ['', Validators.required],
      numeroComprobante: ['', Validators.required],
      importeServicio: ['', [Validators.required, Validators.min(0)]],
      metodoPago: ['Efectivo', Validators.required],
      estadoPago: ['Pendiente', Validators.required],
      conceptoServicio: ['', Validators.required]
    });

    // Inicialización del formulario de garantía basado en la interfaz
    this.garantiaForm = this.fb.group({
      ordenServicio: ['', Validators.required],
      inicioGarantia: ['', Validators.required],
      finGarantia: ['', Validators.required],
      estadoGarantia: ['Activa', Validators.required],
      observaciones: ['', Validators.required]
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
    this.compraForm.reset();
    this.comprobanteForm.reset();
    this.garantiaForm.reset();
  }

  mostrarFormularioCompra() {
    this.vistaActual = 'formularioCompra';
    this.modoEdicion = false;
    this.compraForm.reset();
  }

  mostrarFormularioComprobante() {
    this.vistaActual = 'formularioComprobante';
    this.modoEdicion = false;
    this.comprobanteForm.reset({ metodoPago: 'Efectivo', estadoPago: 'Pendiente' });
  }

  mostrarFormularioGarantia() {
    this.vistaActual = 'formularioGarantia';
    this.modoEdicion = false;
    this.garantiaForm.reset({ estadoGarantia: 'Activa' });
  }

  guardarCompra() {
    this.itemActual = this.compraForm.value;
    this.vistaActual = 'detalle';
    this.modoEdicion = false;
  }

  guardarComprobante() {
    this.itemActual = this.comprobanteForm.value;
    this.vistaActual = 'detalle';
    this.modoEdicion = false;
  }

  guardarGarantia() {
    this.itemActual = this.garantiaForm.value;
    this.vistaActual = 'detalle';
    this.modoEdicion = false;
  }

  editarItem() {
    if (this.subTabActiva === 'compras') this.vistaActual = 'formularioCompra';
    else if (this.subTabActiva === 'comprobantes') this.vistaActual = 'formularioComprobante';
    else if (this.subTabActiva === 'garantias') this.vistaActual = 'formularioGarantia';

    this.modoEdicion = true;
    if (this.itemActual) {
      if (this.subTabActiva === 'compras') this.compraForm.patchValue(this.itemActual);
      else if (this.subTabActiva === 'comprobantes') this.comprobanteForm.patchValue(this.itemActual);
      else if (this.subTabActiva === 'garantias') this.garantiaForm.patchValue(this.itemActual);
    }
  }

  verDetalle() {
    this.vistaActual = 'detalle';
  }
}