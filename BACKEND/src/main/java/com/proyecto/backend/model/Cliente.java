package com.proyecto.backend.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;
@Entity
@Table(name = "cliente")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDCLIENTE")
    private Integer idCliente;

    @Column(name = "NOMCLIENTE", nullable = false, length = 45)
    private String nomCliente;

    @Column(name = "APECLIENTE", nullable = false, length = 45)
    private String apeCliente;

    @Column(name = "DNI", length = 8)
    private String dni;

    @Column(name = "CORREO", length = 100)
    private String correo;

    @Column(name = "DIRECC", length = 100)
    private String direcc;

    @Column(name = "NUM_TEL", length = 9)
    private String numTel;

    @Column(name = "FEC_REG", insertable = false, updatable = false)
    private LocalDateTime fecReg;

      @Column(name = "MARCA", length = 100)
    private String MARCA;
      @Column(name = "MODELO", length = 100)
    private String modelo;
      @Column(name = "NUMERO_SERIE", length = 100)
    private String NUMERO_SERIE;
     @Column(name = "DESCRIPCION", length = 100)
    private String descripcion;
    public Cliente() {}

    public Integer getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Integer idCliente) {
        this.idCliente = idCliente;
    }

    public String getNomCliente() {
        return nomCliente;
    }

    public void setNomCliente(String nomCliente) {
        this.nomCliente = nomCliente;
    }

    public String getApeCliente() {
        return apeCliente;
    }

    public void setApeCliente(String apeCliente) {
        this.apeCliente = apeCliente;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getDirecc() {
        return direcc;
    }

    public void setDirecc(String direcc) {
        this.direcc = direcc;
    }

    public String getNumTel() {
        return numTel;
    }

    public void setNumTel(String numTel) {
        this.numTel = numTel;
    }

    public LocalDateTime getFecReg() {
        return fecReg;
    }

    public void setFecReg(LocalDateTime fecReg) {
        this.fecReg = fecReg;
    }
      public String getMARCA() {
        return MARCA;
    }

    public void setMARCA(String MARCA) {
        this.MARCA = MARCA;
    }
         public String getMODELO() {
        return modelo;
    }

    public void setMODELO(String modelo) {
        this.modelo = modelo;
    }
     public String getNUMERO_SERIE() {
        return NUMERO_SERIE;
    }

    public void setNUMERO_SERIE(String NUMERO_SERIE) {
        this.NUMERO_SERIE = NUMERO_SERIE;
    }
     public String getDESCRIPCION() {
        return descripcion;
    }

    public void setDESCRIPCION(String descripcion) {
        this.descripcion = descripcion;
    }

}