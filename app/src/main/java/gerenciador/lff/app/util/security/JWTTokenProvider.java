package gerenciador.lff.app.util.security;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

import javax.crypto.SecretKey;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class JWTTokenProvider {
    private static final SecretKey CHAVE = Keys.hmacShaKeyFor(
            "6aSYN1A=/vfu8kskceP8oNQhNYOjeWZ18yb1/AdveKPi-r".getBytes(StandardCharsets.UTF_8));

    static public String getToken(String usuario, String nome) 
    {       
        String jwtToken = Jwts.builder()
            .setSubject("usuario")
            .setIssuer("localhost:8080")
            .claim("nome", nome)
            .claim("usuario", usuario)
            .setIssuedAt(new Date())
            .setExpiration(Date.from(LocalDateTime.now().plusMinutes(60L)
                .atZone(ZoneId.systemDefault()).toInstant()))
            .signWith(CHAVE)
            .compact();

        return jwtToken;        
    }

    static public boolean verifyToken(String token)
    {
        try {
            Jwts.parserBuilder()
                .setSigningKey(CHAVE)
                .build()
                .parseClaimsJws(token).getSignature();
                return true;
       } catch (Exception e) {
                System.out.println(e);
       }
       return false;       
    }

    static public Claims getAllClaimsFromToken(String token) 
    {
        Claims claims=null;
        try {
            claims = Jwts.parserBuilder()
            .setSigningKey(CHAVE)
            .build()
            .parseClaimsJws(token)
            .getBody();
        } catch (Exception e) {
            System.out.println("Erro ao recuperar as informações (claims)");
        }
        return claims;        
    }

}
