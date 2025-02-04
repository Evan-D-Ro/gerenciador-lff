package gerenciador.lff.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SenhaDTO {
    private String senha;
    private String novaSenha;
    private String confirmacaoSenha;

    public SenhaDTO(String senha)
    {
        this.senha = senha;
    }

    
}