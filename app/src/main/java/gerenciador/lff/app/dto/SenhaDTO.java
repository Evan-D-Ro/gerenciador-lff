package gerenciador.lff.app.dto;

public class SenhaDTO {
    private String senha;
    private String novaSenha;
    private String confirmacaoSenha;

    public SenhaDTO(String senha)
    {
        this.senha = senha;
    }

    

    public SenhaDTO(String senha, String novaSenha, String confirmacaoSenha) {
        this.senha = senha;
        this.novaSenha = novaSenha;
        this.confirmacaoSenha = confirmacaoSenha;
    }



    // Getters e setters
    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getNovaSenha() {
        return novaSenha;
    }

    public void setNovaSenha(String novaSenha) {
        this.novaSenha = novaSenha;
    }

    public String getConfirmacaoSenha() {
        return confirmacaoSenha;
    }

    public void setConfirmacaoNovaSenha(String confirmacaoSenha) {
        this.confirmacaoSenha = confirmacaoSenha;
    }

    
}