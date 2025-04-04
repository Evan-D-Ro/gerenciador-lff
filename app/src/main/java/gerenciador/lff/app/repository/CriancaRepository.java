package gerenciador.lff.app.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import gerenciador.lff.app.model.Crianca;
import gerenciador.lff.app.model.Escola;
import gerenciador.lff.app.model.Turma;

public interface CriancaRepository extends JpaRepository<Crianca, Long> {

    List<Crianca> findByNomeContainingIgnoreCase(String nome);

    List<Crianca> findByEscolaAndNomeContainingIgnoreCase(Escola escola, String nome);

    List<Crianca> findByTurmaAndNomeContainingIgnoreCase(Turma turma, String nome);

    Crianca findByNome(String nome);

    List<Crianca> findByNomeContainingIgnoreCaseAndCadastroAtivoIsFalse(String search);

    List<Crianca> findByEscolaAndNomeContainingIgnoreCaseAndCadastroAtivoIsFalse(Escola escola, String search);

    List<Crianca> findByTurmaAndNomeContainingIgnoreCaseAndCadastroAtivoIsFalse(Turma turma, String search);

    List<Crianca> findByNomeContainingIgnoreCaseAndCadastroAtivoIsTrue(String search);

    List<Crianca> findByEscolaAndNomeContainingIgnoreCaseAndCadastroAtivoIsTrue(Escola escola, String search);

    List<Crianca> findByTurmaAndNomeContainingIgnoreCaseAndCadastroAtivoIsTrue(Turma turma, String search);

    List<Crianca> findAllByTurmaAndCadastroAtivoIsTrueOrderByNomeAsc(Turma turma);

    @Query("SELECT c FROM Crianca c WHERE c.cadastroAtivo = false ORDER BY c.nome ASC")
    Page<Crianca> findAllByCadastroAtivoIsFalseOrderByNomeAsc(Pageable pageable);

    @Query("SELECT c FROM Crianca c WHERE c.cadastroAtivo = false AND c.escola = :escola ORDER BY c.nome ASC")
    Page<Crianca> findAllByEscolaAndCadastroAtivoIsFalseOrderByNomeAsc(@Param("escola") Escola escola, Pageable pageable);

    @Query("SELECT c FROM Crianca c WHERE c.cadastroAtivo = false AND c.turma = :turma ORDER BY c.nome ASC")
    Page<Crianca> findAllByTurmaAndCadastroAtivoIsFalseOrderByNomeAsc(@Param("turma") Turma turma, Pageable pageable);

    Page<Crianca> findAllByCadastroAtivoIsTrueOrderByNomeAsc(Pageable pageable);

    @Query("SELECT c FROM Crianca c WHERE c.escola = :escola AND c.cadastroAtivo = true ORDER BY c.nome ASC")
    Page<Crianca> findAllByEscolaAndCadastroAtivoIsTrueOrderByNomeAsc(@Param("escola") Escola escola, Pageable pageable);

    @Query("SELECT c FROM Crianca c WHERE c.turma = :turma AND c.cadastroAtivo = true ORDER BY c.nome ASC")
    Page<Crianca> findAllByTurmaAndCadastroAtivoIsTrueOrderByNomeAsc(@Param("turma") Turma turma, Pageable pageable);

    Page<Crianca> findAllByOrderByNomeAsc(Pageable pageable);

    Page<Crianca> findAllByEscolaOrderByNomeAsc(Escola escola, Pageable pageable);

    Page<Crianca> findAllByTurmaOrderByNomeAsc(Turma turma, Pageable pageable);

    
    List<Crianca> findByEscolaAndTurmaAndNomeContainingIgnoreCase(Escola escola, Turma turma, String nome);

    List<Crianca> findByEscolaAndTurmaAndNomeContainingIgnoreCaseAndCadastroAtivoIsFalse(Escola escola, Turma turma, String search);

    List<Crianca> findByEscolaAndTurmaAndNomeContainingIgnoreCaseAndCadastroAtivoIsTrue(Escola escola, Turma turma, String nome);

    @Query("SELECT c FROM Crianca c WHERE c.cadastroAtivo = false AND c.turma = :turma AND c.escola = :escola ORDER BY c.nome ASC")
    Page<Crianca> findAllByEscolaAndTurmaAndCadastroAtivoIsFalseOrderByNomeAsc(@Param("escola") Escola escola, @Param("turma")Turma turma, Pageable pageable);


    @Query("SELECT c FROM Crianca c WHERE c.escola = :escola AND c.turma = :turma AND c.cadastroAtivo = true ORDER BY c.nome ASC")
    Page<Crianca> findAllByEscolaAndTurmaAndCadastroAtivoIsTrueOrderByNomeAsc(@Param("escola") Escola escola, @Param("turma")Turma turma, Pageable pageable);

    @Query("SELECT c FROM Crianca c WHERE c.escola = :escola AND c.turma = :turma ORDER BY c.nome ASC")
    Page<Crianca> findAllByEscolaAndTurmaAndOrderByNomeAsc(@Param("escola") Escola escola, @Param("turma") Turma turma, Pageable pageable);
    

}


