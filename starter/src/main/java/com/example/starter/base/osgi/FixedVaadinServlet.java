package com.example.starter.base.osgi;

import javax.servlet.Servlet;
import javax.servlet.ServletException;

import java.util.Arrays;

import com.example.greetservice.GreetService;
import com.example.starter.base.impl.MainLayout;
import com.example.starter.base.impl.ServiceDependantView;
import org.osgi.framework.Bundle;
import org.osgi.framework.FrameworkUtil;
import org.osgi.framework.ServiceReference;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.http.whiteboard.propertytypes.HttpWhiteboardServletAsyncSupported;
import org.osgi.service.http.whiteboard.propertytypes.HttpWhiteboardServletPattern;
import org.osgi.util.tracker.ServiceTracker;

import com.vaadin.flow.osgi.support.servlet.OSGiVaadinServlet;
import com.vaadin.flow.server.VaadinServletContext;
import com.vaadin.flow.server.startup.ApplicationRouteRegistry;

@Component(service = Servlet.class
/*
 * Same like @VaadinMode
 *
 * , property = {
 * HttpWhiteboardConstants.HTTP_WHITEBOARD_SERVLET_INIT_PARAM_PREFIX +
 * InitParameters.SERVLET_PARAMETER_COMPATIBILITY_MODE + "=false"})
 */
)
@VaadinMode
@HttpWhiteboardServletAsyncSupported
@HttpWhiteboardServletPattern("/*")
public class FixedVaadinServlet extends OSGiVaadinServlet {

    private ServiceTracker<GreetService, GreetService> tracker;

    @Override
    protected void servletInitialized() throws ServletException {
        getService().setClassLoader(getClass().getClassLoader());

        VaadinServletContext servletContext = (VaadinServletContext) getService()
                .getContext();

        Bundle bundle = FrameworkUtil.getBundle(FixedVaadinServlet.class);
        tracker = new ServiceTracker<GreetService, GreetService>(
                bundle.getBundleContext(), GreetService.class, null) {
            @Override
            public GreetService addingService(
                    ServiceReference<GreetService> reference) {
                Bundle[] usingBundles = reference.getUsingBundles();
                if (usingBundles == null || usingBundles.length == 0) {
                    ApplicationRouteRegistry.getInstance(servletContext)
                            .setRoute("service-dependant",
                                    ServiceDependantView.class,
                                    Arrays.asList(MainLayout.class));
                }
                return super.addingService(reference);
            }

            @Override
            public void removedService(ServiceReference<GreetService> reference,
                    GreetService service) {
                Bundle[] usingBundles = reference.getUsingBundles();
                if (usingBundles != null && usingBundles.length == 1) {
                    ApplicationRouteRegistry.getInstance(servletContext)
                            .removeRoute("service-dependant");
                }
                super.removedService(reference, service);
            }
        };
        tracker.open();
    }

    @Override
    public void destroy() {
        super.destroy();
        if (tracker != null) {
            tracker.close();
        }
    }

}