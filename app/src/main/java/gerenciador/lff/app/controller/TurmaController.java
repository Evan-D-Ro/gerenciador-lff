package gerenciador.lff.app.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import gerenciador.lff.app.services.TurmaService;

@RestController
@RequestMapping("/api/turma")
public class TurmaController {
    
    @Autowired
    private TurmaService turmaService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getTurmas(
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "0") int offset) {
        return ResponseEntity.ok(turmaService.getTurmas(search, offset));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTurmaById(@PathVariable Long id) {
        turmaService.deleteTurmaById(id);
        return ResponseEntity.noContent().build();
    }

}
