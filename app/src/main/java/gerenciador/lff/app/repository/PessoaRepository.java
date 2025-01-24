package gerenciador.lff.app.repository;

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
}
