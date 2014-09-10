import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class AnnotationBasedSpringStarter {

    public static void main(String[] args) {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext();
        context.register(ApplicationConfiguration.class);
        context.refresh();

        TestInterface test = context.getBean(TestInterface.class);
        test.invoke("Hello!");
    }
}
