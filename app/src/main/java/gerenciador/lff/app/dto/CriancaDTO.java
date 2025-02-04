package gerenciador.lff.app.dto;

import java.time.LocalDate;

import gerenciador.lff.app.model.Escola;
import gerenciador.lff.app.model.Turma;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CriancaDTO {
    private Long id;
    private String nome;
    private LocalDate dataNascimento;
    private Turma turma;
    private Escola escola;
    private String nomeResponsavel;
    private String contatoResponsavel;
    private String status;
    private boolean cadastroAtivo;
    private LocalDate dataCadastro;
    private LocalDate ultimaAtualizacao;
}
