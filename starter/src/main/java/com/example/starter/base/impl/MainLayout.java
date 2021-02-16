package com.example.starter.base.impl;

import java.util.List;
import java.util.stream.Collectors;

import com.vaadin.flow.component.AttachEvent;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.DetachEvent;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Location;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.RouteConfiguration;
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

        UI ui = attachEvent.getUI();
        fillSideBar(attachEvent.getUI());
        routesListener = registry
                .addRoutesChangeListener(event -> ui.access(() -> {
                    fillSideBar(ui);
                    if (!isCurrentRouteExists(ui)) {
                        ui.navigate(DeregisteredRouteView.class,
                                ui.getInternals().getActiveViewLocation()
                                        .getPath());
                    }
                }));

    }

    @Override
    protected void onDetach(DetachEvent detachEvent) {
        if (routesListener != null) {
            routesListener.remove();
            routesListener = null;
        }
    }

    private boolean isCurrentRouteExists(UI ui) {
        Location currentLocation = ui.getInternals().getActiveViewLocation();

        List<String> segments = currentLocation.getSegments();
        String path = segments.get(0);
        if (!segments.isEmpty()) {
            segments = segments.subList(1, segments.size());
        }

        RouteConfiguration configuration = RouteConfiguration
                .forRegistry(ui.getInternals().getRouter().getRegistry());
        return configuration.getRoute(path, segments).isPresent();
    }

    private void fillSideBar(UI ui) {
        sideBar.removeAll();
        RouteRegistry registry = ui.getInternals().getRouter().getRegistry();

        List<RouteData> routes = registry.getRegisteredRoutes().stream()
                .filter(data -> !DeregisteredRouteView.class
                        .equals(data.getNavigationTarget()))
                .collect(Collectors.toList());
        if (routes.size() > 1) {
            routes.stream().forEach(this::addNavigationItem);
        }
    }

    private void addNavigationItem(RouteData data) {
        Class<? extends Component> navigationTarget = data
                .getNavigationTarget();
        RouterLink item = new RouterLink(getCaption(data), navigationTarget);
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
