package com.example.starter.base.impl;

import com.example.greetservice.GreetService;
import org.osgi.framework.BundleContext;
import org.osgi.framework.FrameworkUtil;
import org.osgi.framework.ServiceReference;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;

@PageTitle("Optional")
public class ServiceDependantView extends VerticalLayout {

    public ServiceDependantView() {
        Div div = new Div();
        div.setText("This navigation target is registered only when "
                + GreetService.class + " becomes available");
        add(div);

        BundleContext ctx = FrameworkUtil.getBundle(ServiceDependantView.class)
                .getBundleContext();
        ServiceReference<GreetService> reference = ctx
                .getServiceReference(GreetService.class);
        div = new Div();
        div.setText(ctx.getService(reference).greet("Optional"));
        add(div);
    }

}
