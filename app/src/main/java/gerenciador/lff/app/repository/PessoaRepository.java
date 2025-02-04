package gerenciador.lff.app.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import gerenciador.lff.app.model.Pessoa;

@Repository
public interface PessoaRepository extends JpaRepository <Pessoa, Long> {

    public Pessoa findByUsuario(String usuario);

    @Query("SELECT p FROM Pessoa p WHERE p.usuario = :usuario AND senha = :senha")
    Pessoa validar(@Param("usuario") String usuario, @Param("senha") String senha);

    List<Pessoa> findByNomeContainingIgnoreCase(String nome);

    List<Pessoa> findByNomeContainingIgnoreCaseAndHabilitadoIsFalse(String search);

    List<Pessoa> findByNomeContainingIgnoreCaseAndHabilitadoIsTrue(String search);

    @Query("SELECT p FROM Pessoa p WHERE p.habilitado = false ORDER BY p.nome ASC")
    Page<Pessoa> findAllByHabilitadoIsFalseOrderByNomeAsc(Pageable pageable);
    
    @Query("SELECT p FROM Pessoa p WHERE p.habilitado = true ORDER BY p.nome ASC")
    Page<Pessoa> findAllByHabilitadoIsTrueOrderByNomeAsc(Pageable pageable);
    Page<Pessoa> findAllByOrderByNomeAsc(Pageable pageable);
}
