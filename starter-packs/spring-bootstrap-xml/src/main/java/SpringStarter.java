import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class SpringStarter {
    private static final Logger LOGGER = LoggerFactory.getLogger(SpringStarter.class);
    public static void main(String[] args) {
        LOGGER.info("Starting up application context...");
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
        applicationContext.getStartupDate();
        LOGGER.info("Started up application context...");
    }

}
