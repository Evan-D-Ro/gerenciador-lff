package gerenciador.lff.app;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AppApplication {
    private static Logger logger = LoggerFactory.getLogger(AppApplication.class);

	public static void main(String[] args) {
		logger.info("Iniciando a API do Gerenciador LFF");
        SpringApplication.run(AppApplication.class, args);
        logger.info("API iniciada e pronta para receber requisições");
	}
	
}
