import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cliente-form.html',
  styleUrl: './cliente-form.css'
})
export class ClienteFormComponent {
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
    numTel: ['']
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
