
package com.proyecto.backend.controller;

import com.proyecto.backend.model.Cliente;
import com.proyecto.backend.repository.ClienteRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    private final ClienteRepository clienteRepository;

    public ClienteController(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    @PostMapping
    public ResponseEntity<Cliente> crearCliente(
            @RequestBody Cliente cliente) {

        cliente.setIdCliente(null);

        Cliente nuevoCliente = clienteRepository.save(cliente);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(nuevoCliente);
    }
}
