package com.example.starter.base.impl;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.BeforeEvent;
import com.vaadin.flow.router.HasUrlParameter;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouterLink;

@Route("unknown")
public class DeregisteredRouteView extends VerticalLayout
        implements HasUrlParameter<String> {

    @Override
    public void setParameter(BeforeEvent event, String parameter) {
        Div div = new Div();
        div.setText("Navigation target for '/" + parameter
                + "' path is deregistered and doesn't exist anymore");
        add(div);
        RouterLink link = new RouterLink("Return to the  main view",
                MainView.class);
        add(link);
    }

}
