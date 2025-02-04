package gerenciador.lff.app.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "crianca")
public class Crianca {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="nome", nullable = false)
    private String nome;

    @Column(name="nome_responsavel")
    private String nomeResponsavel;

    @Column(name="contato_responsavel")
    private String contatoResponsavel;

    @Column(name="data_nascimento")
    private LocalDate dataNascimento;

    @Column(name="status")
    private String status;

    @Column(name="data_cadastro")
    private LocalDate dataCadastro;

    
    @Column(name="ultima_atualizacao")
    private LocalDate ultimaAtualizacao;

    @Column(name="cadastro_ativo")
    private Boolean cadastroAtivo;

    @ManyToOne
    @JoinColumn(name = "id_escola", nullable=false)
    private Escola escola;

    @ManyToOne
    @JoinColumn(name = "id_turma", nullable=false)
    private Turma turma;

}
