package com.example.starter.base.impl;

import com.vaadin.flow.component.AttachEvent;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.ComponentUtil;
import com.vaadin.flow.component.DetachEvent;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.applayout.DrawerToggle;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.component.tabs.TabsVariant;
import com.vaadin.flow.router.*;
import com.vaadin.flow.server.RouteRegistry;
import com.vaadin.flow.shared.Registration;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CssImport("./styles/views/main/main-layout.css")
public class MainLayout extends AppLayout {

    private Registration routesListener;
    private final Tabs menu;
    private H1 viewTitle;

    public MainLayout() {
        setPrimarySection(Section.DRAWER);
        addToNavbar(true, createHeaderContent());
        menu = createMenu();
        addToDrawer(createDrawerContent(menu));
    }

    private Component createHeaderContent() {
        HorizontalLayout layout = new HorizontalLayout();
        layout.setId("header");
        layout.getThemeList().set("dark", true);
        layout.setWidthFull();
        layout.setSpacing(false);
        layout.setAlignItems(FlexComponent.Alignment.CENTER);
        layout.add(new DrawerToggle());
        viewTitle = new H1();
        layout.add(viewTitle);
        layout.add(new Avatar());
        return layout;
    }

    private Component createDrawerContent(Tabs menu) {
        VerticalLayout layout = new VerticalLayout();
        layout.setSizeFull();
        layout.setPadding(false);
        layout.setSpacing(false);
        layout.getThemeList().set("spacing-s", true);
        layout.setAlignItems(FlexComponent.Alignment.STRETCH);
        HorizontalLayout logoLayout = new HorizontalLayout();
        logoLayout.setId("logo");
        logoLayout.setAlignItems(FlexComponent.Alignment.CENTER);
        logoLayout.add(new Image("static/images/logo.png", "My Project logo"));
        logoLayout.add(new H1("My Project"));
        layout.add(logoLayout, menu);
        return layout;
    }

    private Tabs createMenu() {
        final Tabs tabs = new Tabs();
        tabs.setOrientation(Tabs.Orientation.VERTICAL);
        tabs.addThemeVariants(TabsVariant.LUMO_MINIMAL);
        tabs.setId("tabs");
        return tabs;
    }

    @Override
    protected void afterNavigation() {
        super.afterNavigation();
        getTabForComponent(getContent()).ifPresent(menu::setSelectedTab);
        viewTitle.setText(getCurrentPageTitle());
    }

    private Optional<Tab> getTabForComponent(Component component) {
        return menu.getChildren().filter(tab -> ComponentUtil.getData(tab, Class.class).equals(component.getClass()))
                .findFirst().map(Tab.class::cast);
    }

    private String getCurrentPageTitle() {
        PageTitle title = getContent().getClass().getAnnotation(PageTitle.class);
        return title == null ? "" : title.value();
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
        menu.removeAll();
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
        RouterLink item = new RouterLink(getCaption(data),
                data.getNavigationTarget());
        final Tab tab = new Tab(item);
        ComponentUtil.setData(tab, Class.class, data.getNavigationTarget());
        menu.add(tab);
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
