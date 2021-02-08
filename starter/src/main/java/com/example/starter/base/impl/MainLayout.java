package com.example.starter.base.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import com.example.starter.base.NavigationCaptionProvider;
import org.osgi.framework.Bundle;
import org.osgi.framework.FrameworkUtil;
import org.osgi.framework.InvalidSyntaxException;
import org.osgi.framework.ServiceReference;

import com.vaadin.flow.component.AttachEvent;
import com.vaadin.flow.component.DetachEvent;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
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
        if (ui.getPushConfiguration().getPushMode().isEnabled()) {
            ui.push();
        }
    }

    private void addNavigationItem(RouteData data) {
        RouterLink item = new RouterLink(getCaption(data),
                data.getNavigationTarget());
        sideBar.add(item);
    }

    private String getCaption(RouteData data) {
        try {
            Bundle bundle = FrameworkUtil.getBundle(MainLayout.class);
            ServiceReference<?>[] references = bundle.getBundleContext()
                    .getAllServiceReferences(
                            NavigationCaptionProvider.class.getName(), null);
            Optional<NavigationCaptionProvider> routeCaptionProvider = Stream
                    .of(references).map(bundle.getBundleContext()::getService)
                    .map(NavigationCaptionProvider.class::cast)
                    .filter(provider -> provider
                            .isApplicable(data.getNavigationTarget()))
                    .findFirst();
            String routeCaption;
            if (routeCaptionProvider.isPresent()) {
                routeCaption = routeCaptionProvider.get()
                        .getCaption(data.getNavigationTarget());
            } else {
                routeCaption = data.getTemplate();
            }
            return routeCaption;
        } catch (InvalidSyntaxException e) {
            // this may not happen with null as a filter
            assert false;
            return "";
        }
    }
}
