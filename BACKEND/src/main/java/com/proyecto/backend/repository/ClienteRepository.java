
package com.proyecto.backend.repository;
// sirve para guardar clientes sin tener que escribir insert manual
import com.proyecto.backend.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {
}
