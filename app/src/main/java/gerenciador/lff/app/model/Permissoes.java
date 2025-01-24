package gerenciador.lff.app.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "permissoes")
public class Permissoes {

    @Id
    @Column(name="id")
    private Long id;

    //VÍNCULO DAS PERMISSÕES
    @ManyToOne
    @JoinColumn(name = "id_pessoa", nullable=false)
    private Pessoa pessoa;

     //PESSOAS
     @Column(name = "view_pessoa", nullable=false) 
     private Boolean viewPessoa = false;
     @Column(name = "cadastrar_pessoa", nullable=false)
     private Boolean cadastrarPessoa = false;
     @Column(name = "editar_pessoa", nullable=false)
     private Boolean editarPessoa = false;
     @Column(name = "excluir_pessoa", nullable=false)
     private Boolean excluirPessoa = false;
     @Column(name = "obter_pessoas", nullable=false)
     private Boolean obterPessoas = false;
 
     //TURMAS
     @Column(name = "view_turma", nullable=false)
     private Boolean viewTurma = false;
     @Column(name = "cadastrar_turma", nullable=false)
     private Boolean cadastrarTurma = false;
     @Column(name = "editar_turma", nullable=false)
     private Boolean editarTurma = false;
     @Column(name = "excluir_turma", nullable=false)
     private Boolean excluirTurma = false;
     @Column(name = "obter_turmas", nullable=false)
     private Boolean obterTurmas = false;
 
     //ESCOLAS
     @Column(name = "view_escola", nullable=false)
     private Boolean viewEscola = false;
     @Column(name = "cadastrar_escola", nullable=false)
     private Boolean cadastrarEscola = false;
     @Column(name = "editar_escola", nullable=false)
     private Boolean editarEscola = false;
     @Column(name = "excluir_escola", nullable=false)
     private Boolean excluirEscola = false;
     @Column(name = "obter_escolas", nullable=false)
     private Boolean obterEscolas = false;
 
     //CRIANÇAS
     @Column(name = "view_crianca", nullable=false)
     private Boolean viewCrianca = false;
     @Column(name = "cadastrar_crianca", nullable=false)
     private Boolean cadastrarCrianca = false;
     @Column(name = "editar_crianca", nullable=false)
     private Boolean editarCrianca = false;
     @Column(name = "excluir_crianca", nullable=false)
     private Boolean excluirCrianca = false;
     @Column(name = "obter_criancas", nullable=false)
     private Boolean obterCriancas = false;
 
     //CHAMADAS
     @Column(name = "view_chamada", nullable=false)
     private Boolean viewChamada = false;
     @Column(name = "cadastrar_chamada", nullable=false)
     private Boolean cadastrarChamada = false;
     @Column(name = "editar_chamada", nullable=false)
     private Boolean editarChamada = false;
     @Column(name = "excluir_chamada", nullable=false)
     private Boolean excluirChamada = false;
     @Column(name = "obter_chamadas", nullable=false)
     private Boolean obterChamadas = false;
 
     //OUTROS
     @Column(name = "view_relatorios", nullable=false)
     private Boolean viewRelatorios = false;
     @Column(name = "editar_permissoes", nullable=false)
     private Boolean editarPermissoes = false;

}
