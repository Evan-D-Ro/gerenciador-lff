package gerenciador.lff.app.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import gerenciador.lff.app.model.Permissoes;
import gerenciador.lff.app.services.EscolaService;
import gerenciador.lff.app.services.SecurityService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/escola")
public class EscolaController {
    
    @Autowired
    private EscolaService escolaService;

    @Autowired
    private SecurityService securityService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getEscolas(
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "0") int offset, HttpServletRequest request) {
        String token = getToken(request);
        if (!token.isEmpty()) {
            Permissoes permissoes = securityService.obterPermissoes(token);
            if(permissoes.getObterEscolas())
                return ResponseEntity.ok(escolaService.getEscolas(search, offset));
            else
            {
                Map<String, Object> response = new HashMap<>();
                response.put("error", "Não autorizado!");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        }
        else {
            Map<String, Object> response = new HashMap<>();
            response.put("error", "Não autorizado!");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @GetMapping("/get-all")
    public ResponseEntity<Map<String, Object>> getAllEscolas(HttpServletRequest request) {
        String token = getToken(request);
        if (!token.isEmpty()) {
            Permissoes permissoes = securityService.obterPermissoes(token);
            if(permissoes.getObterEscolas())
                return ResponseEntity.ok(escolaService.getAllEscolas());
            else
            {
                Map<String, Object> response = new HashMap<>();
                response.put("error", "Não autorizado!");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        }
        else {
            Map<String, Object> response = new HashMap<>();
            response.put("error", "Não autorizado!");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEscolaById(@PathVariable Long id) {
        escolaService.deleteEscolaById(id);
        return ResponseEntity.noContent().build();
    }

    private String getToken(HttpServletRequest request){
        String token = "";
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if (cookie.getName().equals("CookieAuth")) {
                    token = cookie.getValue();
                }
            }
            if (!token.isEmpty()) {
                return token;
            }
            else
                return null;
        }
        return null;
    }

}
