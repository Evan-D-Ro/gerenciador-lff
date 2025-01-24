package gerenciador.lff.app.model;

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
@Table(name = "turma")
public class Turma {
    @Id
    @Column(name="id")
    private Long id;

    @Column(name="nome", nullable = false)
    private String nome;

    @Column(name="visibilidade")
    private String visibilidade;
}
