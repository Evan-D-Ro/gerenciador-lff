package gerenciador.lff.app.services;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;

import gerenciador.lff.app.dto.SenhaDTO;
import gerenciador.lff.app.model.Permissoes;
import gerenciador.lff.app.model.Pessoa;
import gerenciador.lff.app.repository.PermissoesRepository;
import gerenciador.lff.app.repository.PessoaRepository;
import gerenciador.lff.app.util.security.JWTTokenProvider;

@Service
public class SecurityService {
    
    @Autowired
    PessoaRepository pessoaRepository;

    @Autowired
    PermissoesRepository permissoesRepository;

    private static final Logger logger = LoggerFactory.getLogger(SecurityService.class);

    public String autenticar(JsonNode json)
    {
        String usuario = json.get("usuario").asText();
        String senha = json.get("senha").asText();
        
        String token;

        Pessoa pessoa = pessoaRepository.findByUsuario(usuario);
        logger.info("Tentativa de login - " + usuario);
        if(pessoa != null && pessoa.getSenha().equals(senha))
        {
            if(pessoa.getHabilitado() != false){
                logger.info("Usuário: " + usuario + " - autenticado com sucesso!");
                token = JWTTokenProvider.getToken(usuario, pessoa.getNome());
                return token;
            }
            else
            {
                logger.warn("Tentativa de login - " + usuario + " - Usuário desativado.");
                return "Desativado";
            }
        }
        logger.warn("Tentativa de login - " + usuario + " - Senha inválida");
        return "";
    }

    
    public Boolean validarSenha(SenhaDTO senha, String token) throws Exception
    {
        
        if(JWTTokenProvider.verifyToken(token))
        {
            String usuario = (String) JWTTokenProvider.getAllClaimsFromToken(token).get("usuario");
            Pessoa pessoa = pessoaRepository.validar(usuario, senha.getSenha());
        
            return pessoa != null;
        }
        return false;
    }
    
    public Boolean alterarSenha(SenhaDTO senha, String token) throws Exception
    {
        
        if(JWTTokenProvider.verifyToken(token))
        {
            String usuario = (String) JWTTokenProvider.getAllClaimsFromToken(token).get("usuario");
            Pessoa pessoa = pessoaRepository.validar(usuario, senha.getSenha());
            if(pessoa != null)
            {
                if(senha.getNovaSenha().equals(senha.getConfirmacaoSenha()))
                {
                    pessoa.setSenha(senha.getNovaSenha());
                    pessoaRepository.save(pessoa);
                    return true;
                }
            }
        }
        return false;
    }

    public Boolean resetarSenha(String usuario) throws Exception
    {
        
        Pessoa pessoa = pessoaRepository.findByUsuario(usuario);
        if(pessoa != null)
        {
            String novaSenha = "@12345678";
            pessoa.setSenha(novaSenha);
            pessoaRepository.save(pessoa);
            return true;
        }
        
        return false;
    }

    public Map<String, Object> getPermissoes(String token) {
        Permissoes permissoes;

        if(JWTTokenProvider.verifyToken(token))
        {
            String usuario = (String) JWTTokenProvider.getAllClaimsFromToken(token).get("usuario");
            logger.info("Buscando permissões do usuário - " + usuario);
            Pessoa pessoa = pessoaRepository.findByUsuario(usuario);
            logger.info("Usuário " + usuario + " encontrado");

            permissoes = permissoesRepository.findByPessoa(pessoa);
            logger.info("Permissões de " + usuario + " encontradas");

            Map<String, Object> response = new HashMap<>();
            response.put("permissoes", permissoes);
            logger.info("Buscar permissões concluído");
            return response;        }
        else
        {
            return null;
        }
    }

    public Map<String, Object> getPermissoesUser(String token, String usuarioSearch) {
        Permissoes permissoes;

        if(JWTTokenProvider.verifyToken(token))
        {
            String usuario = (String) JWTTokenProvider.getAllClaimsFromToken(token).get("usuario");
            logger.info("Buscando permissões do usuário - " + usuario);
            Pessoa pessoa = pessoaRepository.findByUsuario(usuario);
            logger.info("Usuário " + usuario + " encontrado");

            permissoes = permissoesRepository.findByPessoa(pessoa);
            logger.info("Permissões de " + usuario + " encontradas");
            if(permissoes.getEditarPermissoes())
            {
                pessoa = pessoaRepository.findByUsuario(usuarioSearch);
                Permissoes usuPermissoes = permissoesRepository.findByPessoa(pessoa);
                Map<String, Object> response = new HashMap<>();
                response.put("permissoes", usuPermissoes);
                logger.info("Buscar permissões concluído");
                return response;        
            }
            else
            {
                logger.info("Usuário não autorizado a buscar permissões.");
                return null;
            }
        }
        else
        {
            return null;
        }
    }

    public Permissoes obterPermissoes(String token) {
        Permissoes permissoes = null;

        if(JWTTokenProvider.verifyToken(token))
        {
            String usuario = (String) JWTTokenProvider.getAllClaimsFromToken(token).get("usuario");
            logger.info("Buscando permissões do usuário - " + usuario);
            Pessoa pessoa = pessoaRepository.findByUsuario(usuario);
            if(pessoa != null)
            {
                logger.info("Usuário " + usuario + " encontrado");
                permissoes = permissoesRepository.findByPessoa(pessoa);
                if(permissoes != null)
                    logger.info("Permissões de " + usuario + " encontradas");
                else
                    logger.info("Permissões de " + usuario + " não encontradas");
                logger.info("Buscar permissões concluído");
            }
            else
                logger.info("Usuário " + usuario + " não encontrado");
            return permissoes;
        }
        else
        {
            return null;
        }
    }

}
