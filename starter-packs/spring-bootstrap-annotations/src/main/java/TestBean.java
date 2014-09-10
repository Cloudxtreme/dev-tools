import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TestBean implements TestInterface {

    private Logger LOGGER = LoggerFactory.getLogger(TestBean.class);
    public boolean invoke(String param) {
        LOGGER.info("Invoked bean... {}", param);
        return true;
    }
}
