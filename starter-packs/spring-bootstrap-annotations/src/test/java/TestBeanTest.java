import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.runners.MockitoJUnitRunner;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

@RunWith(MockitoJUnitRunner.class)
public class TestBeanTest {
    @Test
    public void shouldInvoke() throws Exception {
        TestBean testBean = new TestBean();

        assertThat(testBean.invoke(""), is(true));
    }
}
