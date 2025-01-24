package gerenciador.lff.app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "pessoa")
public class Pessoa {
    @Id
    @Column(name="id")
    private Long id;

    @Column(name="nome", nullable = false)
    private String nome;

    @Column(name="usuario", nullable = false)
    private String usuario;
    
    @JsonIgnore
    @Column(name="senha", nullable = false)
    private String senha;

    @Column(name="cargo")
    private String cargo;
    
    @Column(name="contato")
    private String contato;

    @Column(name="habilitado", nullable = false)
    private Boolean habilitado = true;

    public Pessoa(String nome, String usuario, String senha)
    {
        this.nome = nome;
        this.usuario = usuario;
        this.senha = senha;
    }

}
