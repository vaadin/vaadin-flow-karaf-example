package com.example.starter.base.impl;

import java.util.List;

import com.vaadin.flow.component.AttachEvent;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.DetachEvent;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.RouteData;
import com.vaadin.flow.router.RouterLayout;
import com.vaadin.flow.router.RouterLink;
import com.vaadin.flow.server.RouteRegistry;
import com.vaadin.flow.shared.Registration;

public class MainLayout extends HorizontalLayout implements RouterLayout {

    private final VerticalLayout sideBar;

    private Registration routesListener;

    public MainLayout() {
        sideBar = new VerticalLayout();
        sideBar.setWidth(null);
        add(sideBar);
    }

    @Override
    protected void onAttach(AttachEvent attachEvent) {
        RouteRegistry registry = attachEvent.getUI().getInternals().getRouter()
                .getRegistry();

        fillSideBar(attachEvent.getUI());
        routesListener = registry.addRoutesChangeListener(event -> attachEvent
                .getUI().access(() -> fillSideBar(attachEvent.getUI())));

    }

    @Override
    protected void onDetach(DetachEvent detachEvent) {
        if (routesListener != null) {
            routesListener.remove();
            routesListener = null;
        }
    }

    private void fillSideBar(UI ui) {
        sideBar.removeAll();
        RouteRegistry registry = ui.getInternals().getRouter().getRegistry();

        List<RouteData> routes = registry.getRegisteredRoutes();
        if (routes.size() > 1) {
            routes.stream().forEach(this::addNavigationItem);
        }
    }

    private void addNavigationItem(RouteData data) {
        RouterLink item = new RouterLink(getCaption(data),
                data.getNavigationTarget());
        sideBar.add(item);
    }

    private String getCaption(RouteData data) {
        Class<? extends Component> navigationTarget = data
                .getNavigationTarget();
        PageTitle title = navigationTarget.getAnnotation(PageTitle.class);
        if (title != null) {
            return title.value();
        } else {
            return data.getTemplate();
        }
    }
}
