import com.sun.jersey.spi.spring.container.servlet.SpringServlet;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.eclipse.jetty.webapp.WebAppContext;
import org.junit.After;
import org.junit.Before;

public class AbstractJettyTest {

    private Server server;

    // TODO: Cleanup hard coded paths - Introspect to determine the paths or move to mvn jetty plugin?
    @Before
    public final void startJetty() throws Exception {
        server = new Server(8080);
        ServletContextHandler contextHandler = new ServletContextHandler(server,"/", ServletContextHandler.SESSIONS);
        ServletHolder servlet = new ServletHolder(new SpringServlet());
        contextHandler.addServlet(servlet, "/*");

        WebAppContext context = new WebAppContext();
//        this.getClass().getResource()
        context.setDescriptor("/home/dev/projects/spikes/mockrestservice/src/main/webapp/WEB-INF/web.xml");
        context.setResourceBase("/home/dev/projects/spikes/mockrestservice/src/main/webapp");
        context.setContextPath("/");
        context.setParentLoaderPriority(true);

        server.setHandler(context);
        server.start();
    }

    @After
    public final void stopJetty() throws Exception {
        server.stop();
    }

}
