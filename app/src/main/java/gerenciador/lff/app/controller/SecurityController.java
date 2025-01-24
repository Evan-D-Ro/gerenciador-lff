package gerenciador.lff.app.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;

import gerenciador.lff.app.services.SecurityService;
import gerenciador.lff.app.util.security.JWTTokenProvider;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/auth")
public class SecurityController {
    
    @Autowired
    private SecurityService securityService;

    private static Logger logger = LoggerFactory.getLogger(SecurityController.class);

    @PostMapping("login")
    public ResponseEntity<Object> logar(@RequestBody JsonNode json, HttpServletResponse response) throws Exception {
        String token = securityService.autenticar(json);
        if(token.equals("Desativado"))
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuário desativado... Entre em contato com o suporte");
        }
        if(token.isEmpty())
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário inválido...");
                  
        Cookie cookie = new Cookie("CookieAuth", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(3600); // 1 hora de validade
        response.addCookie(cookie);
        return ResponseEntity.ok(JWTTokenProvider.getAllClaimsFromToken(token));
    }
    
    @PostMapping("logout")
    public ResponseEntity<Object> deslogar(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String usuario = "";
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if (cookie.getName().equals("CookieAuth")) {
                    usuario = (String) JWTTokenProvider.getAllClaimsFromToken(cookie.getValue()).get("usuario");

                    cookie.setMaxAge(0); // Define o tempo de vida do cookie para 0
                    cookie.setPath("/"); // Certifique-se de que o caminho está correto
                    response.addCookie(cookie); // Adiciona o cookie alterado na resposta
                }
            }
            logger.info("Usuário: " + usuario + " - desconectado!");
            return ResponseEntity.ok("Deslogado com sucesso.");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro ao deslogar: Usuário não autenticado!");
    }

    @GetMapping("get-dados")
    public ResponseEntity<Object> getDados(HttpServletRequest request) {
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if (cookie.getName().equals("CookieAuth")) {
                    return ResponseEntity.ok(JWTTokenProvider.getAllClaimsFromToken(cookie.getValue()));
                }
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Não autorizado!");
    }
    
    @GetMapping("get-permissoes")
    public ResponseEntity<Object> getPermissoes(HttpServletRequest request) {
        String token = getToken(request);
        if (!token.isEmpty()) {
            return ResponseEntity.ok(securityService.getPermissoes(token));
        }
        else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Não autorizado!");
        }
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
