package gerenciador.lff.app.services;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import gerenciador.lff.app.dto.CriancaDTO;
import gerenciador.lff.app.model.Crianca;
import gerenciador.lff.app.model.Escola;
import gerenciador.lff.app.model.Permissoes;
import gerenciador.lff.app.model.Turma;
import gerenciador.lff.app.repository.CriancaRepository;
import gerenciador.lff.app.repository.EscolaRepository;
import gerenciador.lff.app.repository.TurmaRepository;

@Service
public class CriancaService {
    @Autowired
    private CriancaRepository criancaRepository;

    @Autowired
    private EscolaRepository escolaRepository;

    @Autowired
    private TurmaRepository turmaRepository;

    private static final Logger logger = LoggerFactory.getLogger(CriancaService.class);

    public Map<String, Object> getCriancas(String search, int offset, String selectTab) {

        List<Crianca> criancas;
        long totalCriancas;

        int page = offset / 5;
        int size = 5;
        if ("draft".equals(selectTab)) {
            if (search != null && !search.isEmpty()) {
                criancas = criancaRepository.findByNomeContainingIgnoreCaseAndCadastroAtivoIsFalse(search);
                totalCriancas = criancas.size();
                logger.info("Buscando crianças com cadastro desativado - " + totalCriancas + " - Filtro: " + search);
            } else {
                Page<Crianca> criancasPage = criancaRepository
                        .findAllByCadastroAtivoIsFalseOrderByNomeAsc(PageRequest.of(page, size));
                criancas = criancasPage.getContent();
                totalCriancas = criancasPage.getTotalElements();
                logger.info("Buscando crianças desativadas -  " + totalCriancas);

            }
        } else if ("active".equals(selectTab)) {
            if (search != null && !search.isEmpty()) {
                criancas = criancaRepository.findByNomeContainingIgnoreCaseAndCadastroAtivoIsTrue(search);
                totalCriancas = criancas.size();
                logger.info("Buscando crianças com cadastro ativado - " + totalCriancas + " - Filtro: " + search);
            } else {
                Page<Crianca> criancasPage = criancaRepository
                        .findAllByCadastroAtivoIsTrueOrderByNomeAsc(PageRequest.of(page, size));
                criancas = criancasPage.getContent();
                totalCriancas = criancasPage.getTotalElements();
                logger.info("Buscando crianças ativas -  " + totalCriancas);

            }
        } else {
            if (search != null && !search.isEmpty()) {
                criancas = criancaRepository.findByNomeContainingIgnoreCase(search);
                totalCriancas = criancas.size();
                logger.info("Buscando todas as crianças -  " + totalCriancas + " - Filtro: " + search);

            } else {
                Page<Crianca> criancasPage = criancaRepository.findAllByOrderByNomeAsc(PageRequest.of(page, size));
                criancas = criancasPage.getContent();
                totalCriancas = criancasPage.getTotalElements();
                logger.info("Buscando todas as crianças -  " + totalCriancas);
            }
        }

        Integer newOffset = criancas.size() >= size ? offset + size : null;

        Map<String, Object> response = new HashMap<>();
        response.put("criancas", criancas);
        response.put("newOffset", newOffset);
        response.put("totalCriancas", totalCriancas);
        logger.info("Buscar criancas concluído");
        return response;
    }

    public Map<String, Object> getCriancasTurma(String search, int offset, String selectTab, long idTurma) {

        List<Crianca> criancas;
        long totalCriancas;
        Turma turma = turmaRepository.findById(idTurma).orElse(null);
        int page = offset / 5;
        int size = 5;
        if (turma != null) {
            if ("draft".equals(selectTab)) {
                if (search != null && !search.isEmpty()) {
                    criancas = criancaRepository.findByTurmaAndNomeContainingIgnoreCaseAndCadastroAtivoIsFalse(turma,
                            search);
                    totalCriancas = criancas.size();
                    logger.info(
                            "Buscando crianças por turma (" + idTurma + ") com cadastro desativado - " + totalCriancas
                                    + " - Filtro: "
                                    + search);
                } else {
                    Page<Crianca> criancasPage = criancaRepository
                            .findAllByTurmaAndCadastroAtivoIsFalseOrderByNomeAsc(turma, PageRequest.of(page, size));
                    criancas = criancasPage.getContent();
                    totalCriancas = criancasPage.getTotalElements();
                    logger.info(
                            "Buscando todas as crianças desativadas por turma (ID TURMA: " + idTurma + ") -  "
                                    + totalCriancas);

                }
            } else if ("active".equals(selectTab)) {
                if (search != null && !search.isEmpty()) {
                    criancas = criancaRepository.findByTurmaAndNomeContainingIgnoreCaseAndCadastroAtivoIsTrue(turma,
                            search);
                    totalCriancas = criancas.size();
                    logger.info("Buscando crianças por turma (" + idTurma + ") com cadastro ativado - "
                            + totalCriancas + " - Filtro: " + search);
                } else {
                    Page<Crianca> criancasPage = criancaRepository
                            .findAllByTurmaAndCadastroAtivoIsTrueOrderByNomeAsc(turma, PageRequest.of(page, size));
                    criancas = criancasPage.getContent();
                    totalCriancas = criancasPage.getTotalElements();
                    logger.info(
                            "Buscando crianças ativas por turma (ID TURMA: " + idTurma + ") -  " + totalCriancas);

                }
            } else {
                if (search != null && !search.isEmpty()) {
                    criancas = criancaRepository.findByTurmaAndNomeContainingIgnoreCase(turma, search);
                    totalCriancas = criancas.size();
                    logger.info("Buscando todas as crianças por turma (ID TURMA:" + idTurma + ") -  " + totalCriancas
                            + " - Filtro: " + search);

                } else {
                    Page<Crianca> criancasPage = criancaRepository.findAllByTurmaOrderByNomeAsc(turma,
                            PageRequest.of(page, size));
                    criancas = criancasPage.getContent();
                    totalCriancas = criancasPage.getTotalElements();
                    logger.info(
                            "Buscando todas as crianças por turma (ID TURMA: " + idTurma + ") -  " + totalCriancas);
                }
            }
        } else {
            logger.error("Erro ao buscar turma - (" + idTurma + ")");
            return null;
        }

        Integer newOffset = criancas.size() >= size ? offset + size : null;

        Map<String, Object> response = new HashMap<>();
        response.put("criancas", criancas);
        response.put("newOffset", newOffset);
        response.put("totalCriancas", totalCriancas);
        logger.info("Buscar criancas por turma concluído");
        return response;
    }

    public Map<String, Object> getCriancasEscola(String search, int offset, String selectTab, long idEscola, Long idTurma) {

        List<Crianca> criancas;
        long totalCriancas;
        Turma turma = null;
        Escola escola = escolaRepository.findById(idEscola).orElse(null);
        if(idTurma != null){
            turma = turmaRepository.findById(idTurma).orElse(null);
        }
        int page = offset / 5;
        int size = 5;
        if(turma != null){
            if (escola != null) {
                if ("draft".equals(selectTab)) {
                    if (search != null && !search.isEmpty()) {
                        criancas = criancaRepository.findByEscolaAndTurmaAndNomeContainingIgnoreCaseAndCadastroAtivoIsFalse(escola, turma, search);
                        totalCriancas = criancas.size();
                        logger.info(
                                "Buscando crianças por escola (" + idEscola + ") com cadastro desativado - " + totalCriancas
                                        + " - Filtro: "
                                        + search + " - " + turma.getNome());
                    } else {
                        Page<Crianca> criancasPage = criancaRepository
                                .findAllByEscolaAndTurmaAndCadastroAtivoIsFalseOrderByNomeAsc(escola, turma, PageRequest.of(page, size));
                        criancas = criancasPage.getContent();
                        totalCriancas = criancasPage.getTotalElements();
                        logger.info(
                                "Buscando todas as crianças desativadas por escola (ID ESCOLA: " + idEscola + ") -  "
                                        + totalCriancas);
    
                    }
                } else if ("active".equals(selectTab)) {
                    if (search != null && !search.isEmpty()) {
                        criancas = criancaRepository.findByEscolaAndTurmaAndNomeContainingIgnoreCaseAndCadastroAtivoIsTrue(escola,
                                turma, search);
                        totalCriancas = criancas.size();
                        logger.info("Buscando crianças por escola (" + idEscola + ") com cadastro ativado - "
                                + totalCriancas + " - Filtro: " + search);
                    } else {
                        Page<Crianca> criancasPage = criancaRepository
                                .findAllByEscolaAndTurmaAndCadastroAtivoIsTrueOrderByNomeAsc(escola, turma, PageRequest.of(page, size));
                        criancas = criancasPage.getContent();
                        totalCriancas = criancasPage.getTotalElements();
                        logger.info(
                                "Buscando crianças ativas por escola (ID ESCOLA: " + idEscola + ") -  " + totalCriancas);
    
                    }
                } else {
                    if (search != null && !search.isEmpty()) {
                        criancas = criancaRepository.findByEscolaAndTurmaAndNomeContainingIgnoreCase(escola, turma, search);
                        totalCriancas = criancas.size();
                        logger.info("Buscando todas as crianças por escola (ID ESCOLA:" + idEscola + ") -  " + totalCriancas
                                + " - Filtro: " + search);
    
                    } else {
                        Page<Crianca> criancasPage = criancaRepository.findAllByEscolaAndTurmaAndOrderByNomeAsc(escola, turma,
                                PageRequest.of(page, size));
                        criancas = criancasPage.getContent();
                        totalCriancas = criancasPage.getTotalElements();
                        logger.info(
                                "Buscando todas as crianças por escola (ID ESCOLA: " + idEscola + ") -  " + totalCriancas);
                    }
                }
            } else {
                logger.error("Erro ao buscar escola - (" + idEscola + ")");
                return null;
            }
        }
        else{
            if (escola != null) {
                if ("draft".equals(selectTab)) {
                    if (search != null && !search.isEmpty()) {
                        criancas = criancaRepository.findByEscolaAndNomeContainingIgnoreCaseAndCadastroAtivoIsFalse(escola, search);
                        totalCriancas = criancas.size();
                        logger.info(
                                "Buscando crianças por escola (" + idEscola + ") com cadastro desativado - " + totalCriancas
                                        + " - Filtro: "
                                        + search + " - " + turma.getNome());
                    } else {
                        Page<Crianca> criancasPage = criancaRepository
                                .findAllByEscolaAndCadastroAtivoIsFalseOrderByNomeAsc(escola, PageRequest.of(page, size));
                        criancas = criancasPage.getContent();
                        totalCriancas = criancasPage.getTotalElements();
                        logger.info(
                                "Buscando todas as crianças desativadas por escola (ID ESCOLA: " + idEscola + ") -  "
                                        + totalCriancas);
    
                    }
                } else if ("active".equals(selectTab)) {
                    if (search != null && !search.isEmpty()) {
                        criancas = criancaRepository.findByEscolaAndNomeContainingIgnoreCaseAndCadastroAtivoIsTrue(escola, search);
                        totalCriancas = criancas.size();
                        logger.info("Buscando crianças por escola (" + idEscola + ") com cadastro ativado - "
                                + totalCriancas + " - Filtro: " + search);
                    } else {
                        Page<Crianca> criancasPage = criancaRepository
                                .findAllByEscolaAndCadastroAtivoIsTrueOrderByNomeAsc(escola, PageRequest.of(page, size));
                        criancas = criancasPage.getContent();
                        totalCriancas = criancasPage.getTotalElements();
                        logger.info(
                                "Buscando crianças ativas por escola (ID ESCOLA: " + idEscola + ") -  " + totalCriancas);
    
                    }
                } else {
                    if (search != null && !search.isEmpty()) {
                        criancas = criancaRepository.findByEscolaAndNomeContainingIgnoreCase(escola, search);
                        totalCriancas = criancas.size();
                        logger.info("Buscando todas as crianças por escola (ID ESCOLA:" + idEscola + ") -  " + totalCriancas
                                + " - Filtro: " + search);
    
                    } else {
                        Page<Crianca> criancasPage = criancaRepository.findAllByEscolaOrderByNomeAsc(escola,
                                PageRequest.of(page, size));
                        criancas = criancasPage.getContent();
                        totalCriancas = criancasPage.getTotalElements();
                        logger.info(
                                "Buscando todas as crianças por escola (ID ESCOLA: " + idEscola + ") -  " + totalCriancas);
                    }
                }
            } else {
                logger.error("Erro ao buscar escola - (" + idEscola + ")");
                return null;
            }
        }
        
        Integer newOffset = criancas.size() >= size ? offset + size : null;

        Map<String, Object> response = new HashMap<>();
        response.put("criancas", criancas);
        response.put("newOffset", newOffset);
        response.put("totalCriancas", totalCriancas);
        logger.info("Buscar criancas por escola concluído");
        return response;
    }

    public char salvarCrianca(CriancaDTO criancaDTO, Permissoes permissoes) {
        Crianca crianca = null;
        if (criancaDTO.getId() != null) {
            if (permissoes.getEditarCrianca()) {
                crianca = criancaRepository.findById(criancaDTO.getId()).orElse(null);
                if (crianca == null) {
                    // RECEBEU UM ID, PORÉM ESSE ID ESTÁ INVÁLIDO.
                    logger.error("Erro ao editar - criança (" + criancaDTO.getId() + ") não encontrada...");
                    return 0;
                } else {
                    logger.info("Atualizando criança - " + crianca.getNome());
                    crianca.setDataCadastro(criancaDTO.getDataCadastro());
                }
            } else {
                logger.info("Usuário sem permissão para editar crianças - " + permissoes.getPessoa().getUsuario());
                return '2';
            }
        }
        if (crianca == null) {
            if (permissoes.getCadastrarCrianca()) {
                // NÃO RECEBEU ID E A CRIANCA SERA CRIADA
                logger.info("Cadastrando criança - " + criancaDTO.getNome());
                crianca = new Crianca();
                crianca.setDataCadastro(LocalDate.now());
            } else {
                logger.info("Usuário sem permissão para cadastrar crianças - " + permissoes.getPessoa().getUsuario());
                return '2';
            }
        }
        // RECEBEU O ID E A CRIANCA SERA ATUALIZADA
        crianca.setNome(criancaDTO.getNome());
        crianca.setDataNascimento(criancaDTO.getDataNascimento());
        crianca.setTurma(criancaDTO.getTurma());
        crianca.setEscola(criancaDTO.getEscola());
        crianca.setNomeResponsavel(criancaDTO.getNomeResponsavel());
        crianca.setContatoResponsavel(criancaDTO.getContatoResponsavel());
        crianca.setStatus(criancaDTO.getStatus());
        crianca.setCadastroAtivo(criancaDTO.isCadastroAtivo());
        crianca.setUltimaAtualizacao(LocalDate.now());
        try {
            criancaRepository.save(crianca);
            logger.info("CADASTRO/ATUALIZAÇÃO CONCLUÍDA!");
            return '1';
        } catch (Exception e) {
            logger.error("Erro ao salvar criança - " + e.getMessage());
            return '0';
        }
    }

    public String deleteCriancaById(Long id) {
        logger.info("DELETANDO CRIANÇA - (" + id + ")");
        try {
            criancaRepository.deleteById(id);
            return "Criança deletada com sucesso.";
        } catch (Exception e) {
            logger.error("Erro ao deletar criança - " + e.getMessage());
            return "Erro ao deletar criança.";
        }
    }
}
