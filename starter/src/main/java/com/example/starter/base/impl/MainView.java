package com.example.starter.base.impl;

import com.example.starter.base.GreetService;
import org.osgi.framework.BundleContext;
import org.osgi.framework.FrameworkUtil;
import org.osgi.framework.ServiceReference;

import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@PageTitle("Main")
@Route(layout = MainLayout.class)
public class MainView extends AbstractMainView {

    @Override
    public String greet(String name) {
        BundleContext ctx = FrameworkUtil.getBundle(AbstractMainView.class)
                .getBundleContext();
        ServiceReference<GreetService> reference = ctx
                .getServiceReference(GreetService.class);
        if (reference == null) {
            return "Greet service not currently available, install it into Karaf to get a proper greeting";
        }
        return ctx.getService(reference).greet(name);
    }
}
