package gerenciador.lff.app.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import gerenciador.lff.app.model.Crianca;

public interface CriancaRepository extends JpaRepository <Crianca, Long> {
    
    List<Crianca> findByNomeContainingIgnoreCase(String nome);
    
    Crianca findByNome(String nome);

    List<Crianca> findByNomeContainingIgnoreCaseAndCadastroAtivoIsFalse(String search);

    List<Crianca> findByNomeContainingIgnoreCaseAndCadastroAtivoIsTrue(String search);

    @Query("SELECT c FROM Crianca c WHERE c.cadastroAtivo = false ORDER BY c.nome ASC")
    Page<Crianca> findAllByCadastroAtivoIsFalseOrderByNomeAsc(Pageable pageable);
    
    @Query("SELECT c FROM Crianca c WHERE c.cadastroAtivo = true ORDER BY c.nome ASC")
    Page<Crianca> findAllByCadastroAtivoIsTrueOrderByNomeAsc(Pageable pageable);
    Page<Crianca> findAllByOrderByNomeAsc(Pageable pageable);

}
