package gerenciador.lff.app.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import gerenciador.lff.app.model.Pessoa;
import gerenciador.lff.app.repository.PessoaRepository;

@Service
public class PessoaService {
    @Autowired
    private PessoaRepository pessoaRepository;

    private static final Logger logger = LoggerFactory.getLogger(PessoaService.class);

    public Map<String, Object> getPessoas(String search, int offset, String selectTab) {
        List<Pessoa> pessoas;
        long totalPessoas;
    
        int page = offset / 5;  // Cálculo do número da página
        int size = 5;          // Tamanho da página
        if ("draft".equals(selectTab)) {
            if (search != null && !search.isEmpty()) {
                pessoas = pessoaRepository.findByNomeContainingIgnoreCaseAndHabilitadoIsFalse(search);
                totalPessoas = pessoas.size();
                logger.info("Buscando pessoas com cadastro desativado - " + totalPessoas + " - Filtro: " + search);
            } else {
                Page<Pessoa> pessoasPage = pessoaRepository.findAllByHabilitadoIsFalseOrderByNomeAsc(PageRequest.of(page, size));
                pessoas = pessoasPage.getContent();
                totalPessoas = pessoasPage.getTotalElements();
                logger.info("Buscando pessoas desativadas -  " + totalPessoas);

            }
        } else if ("active".equals(selectTab)) {
            if (search != null && !search.isEmpty()) {
                pessoas = pessoaRepository.findByNomeContainingIgnoreCaseAndHabilitadoIsTrue(search);
                totalPessoas = pessoas.size();
                logger.info("Buscando pessoas com cadastro ativado - " + totalPessoas + " - Filtro: " + search);
            } else {
                Page<Pessoa> pessoasPage = pessoaRepository.findAllByHabilitadoIsTrueOrderByNomeAsc(PageRequest.of(page, size));
                pessoas = pessoasPage.getContent();
                totalPessoas = pessoasPage.getTotalElements();
                logger.info("Buscando pessoas ativas -  " + totalPessoas);

            }
        } else {
            if (search != null && !search.isEmpty()) {
                pessoas = pessoaRepository.findByNomeContainingIgnoreCase(search);
                totalPessoas = pessoas.size();
                logger.info("Buscando todas as pessoas -  " + totalPessoas + " - Filtro: " + search);

            } else {
                Page<Pessoa> pessoasPage = pessoaRepository.findAllByOrderByNomeAsc(PageRequest.of(page, size));
                pessoas = pessoasPage.getContent();
                totalPessoas = pessoasPage.getTotalElements();
                logger.info("Buscando todas as pessoas -  " + totalPessoas);
            }
        }
    
        Integer newOffset = pessoas.size() >= size ? offset + size : null;
    
        Map<String, Object> response = new HashMap<>();
        response.put("pessoas", pessoas);
        response.put("newOffset", newOffset);
        response.put("totalPessoas", totalPessoas);
        logger.info("Buscar pessoas concluído");
        return response;
    }
    

    public void deletePessoaById(Long id) {
        pessoaRepository.deleteById(id);
    }
}
