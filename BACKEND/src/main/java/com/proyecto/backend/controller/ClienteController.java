
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

    @PutMapping("/{id}")
    public ResponseEntity<Cliente> actualizarCliente(
            @PathVariable Integer id,
            @RequestBody Cliente cliente) {
        return clienteRepository.findById(id)
                .map(existente -> {
                    existente.setNomCliente(cliente.getNomCliente());
                    existente.setApeCliente(cliente.getApeCliente());
                    existente.setDni(cliente.getDni());
                    existente.setCorreo(cliente.getCorreo());
                    existente.setDirecc(cliente.getDirecc());
                    existente.setNumTel(cliente.getNumTel());
                    existente.setMARCA(cliente.getMARCA());
                    existente.setMODELO(cliente.getMODELO());
                    existente.setNUMERO_SERIE(cliente.getNUMERO_SERIE());
                    existente.setDESCRIPCION(cliente.getDESCRIPCION());
                    return ResponseEntity.ok(clienteRepository.save(existente));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
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
