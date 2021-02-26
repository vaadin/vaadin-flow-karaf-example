package com.example.starter.base.impl;

import com.example.starter.base.GreetService;
import org.osgi.framework.BundleContext;
import org.osgi.framework.FrameworkUtil;
import org.osgi.framework.ServiceReference;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.PageTitle;

@PageTitle("Optional")
public class ServiceDependantView extends AbstractMainView {

    public ServiceDependantView() {
        Div div = new Div();
        div.setText(
                "This navigation target looks exactly as Main page but it's "
                        + "registered only when " + GreetService.class
                        + " becomes available");
        addComponentAsFirst(div);
    }

    @Override
    public String greet(String name) {
        BundleContext ctx = FrameworkUtil.getBundle(AbstractMainView.class)
                .getBundleContext();
        ServiceReference<GreetService> reference = ctx
                .getServiceReference(GreetService.class);
        return ctx.getService(reference).greet(name);
    }
}
