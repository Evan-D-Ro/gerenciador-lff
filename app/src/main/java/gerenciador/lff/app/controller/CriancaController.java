package gerenciador.lff.app.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import gerenciador.lff.app.dto.CriancaDTO;
import gerenciador.lff.app.model.Permissoes;
import gerenciador.lff.app.services.CriancaService;
import gerenciador.lff.app.services.SecurityService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/crianca")
public class CriancaController {

    @Autowired
    private CriancaService criancaService;

    @Autowired
    private SecurityService securityService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getCriancas(
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "0") int offset,
            @RequestParam(required = false) String selectTab, HttpServletRequest request) {

        String token = getToken(request);
        if (!token.isEmpty()) {
            Permissoes permissoes = securityService.obterPermissoes(token);
            if (permissoes.getObterCriancas())
                return ResponseEntity.ok(criancaService.getCriancas(search, offset, selectTab));
            else {
                Map<String, Object> response = new HashMap<>();
                response.put("error", "Não autorizado!");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("error", "Não autorizado!");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @GetMapping("/escola")
    public ResponseEntity<Map<String, Object>> getCriancasEscola(
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "0") int offset,
            @RequestParam(required = false) String selectTab, HttpServletRequest request,
            @RequestParam(required = false) Long idEscola,
            @RequestParam(required = false) Long idTurma) {

        String token = getToken(request);
        if (!token.isEmpty()) {
            Permissoes permissoes = securityService.obterPermissoes(token);
            if (permissoes.getObterCriancas())
                return ResponseEntity.ok(criancaService.getCriancasEscola(search, offset, selectTab, idEscola, idTurma));
            else {
                Map<String, Object> response = new HashMap<>();
                response.put("error", "Não autorizado!");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("error", "Não autorizado!");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @GetMapping("/turma")
    public ResponseEntity<Map<String, Object>> getCriancasTurma(
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "0") int offset,
            @RequestParam(required = false) String selectTab, HttpServletRequest request,
            @RequestParam(required = false) Long idTurma) {
        String token = getToken(request);
        if (!token.isEmpty()) {
            Permissoes permissoes = securityService.obterPermissoes(token);
            if (permissoes.getObterCriancas())
                return ResponseEntity.ok(criancaService.getCriancasTurma(search, offset, selectTab, idTurma));
            else {
                Map<String, Object> response = new HashMap<>();
                response.put("error", "Não autorizado!");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("error", "Não autorizado!");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @PostMapping("salvar") // cadastrar novo estudante
    public ResponseEntity<Object> salvarCrianca(@RequestBody CriancaDTO criancaDTO, HttpServletRequest request)
            throws Exception {

        String token = getToken(request);
        if (!token.isEmpty()) {
            Permissoes permissoes = securityService.obterPermissoes(token);

            char resposta = criancaService.salvarCrianca(criancaDTO, permissoes);
            switch (resposta) {
                case '0' -> {
                    Map<String, Object> response = new HashMap<>();
                    response.put("error", "Erro ao processar requisição");
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
                }
                case '1' -> {
                    return ResponseEntity.ok("Criança cadastrada/atualizada com sucesso!");
                }
                default -> {
                    Map<String, Object> response = new HashMap<>();
                    response.put("error", "Não autorizado!");
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
                }
            }

        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("error", "Não autorizado!");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @DeleteMapping("/deletar")
    public ResponseEntity<Object> deleteCriancaById(@RequestParam(required = true) Long id,
            HttpServletRequest request) {
        String token = getToken(request);
        if (!token.isEmpty()) {
            Permissoes permissoes = securityService.obterPermissoes(token);
            if (permissoes.getExcluirCrianca())
                return ResponseEntity.ok(criancaService.deleteCriancaById(id));
            else {
                Map<String, Object> response = new HashMap<>();
                response.put("error", "Não autorizado!");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("error", "Não autorizado!");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    private String getToken(HttpServletRequest request) {
        String token = "";
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if (cookie.getName().equals("CookieAuth")) {
                    token = cookie.getValue();
                }
            }
            if (!token.isEmpty()) {
                return token;
            } else
                return "";
        }
        return "";
    }
}
