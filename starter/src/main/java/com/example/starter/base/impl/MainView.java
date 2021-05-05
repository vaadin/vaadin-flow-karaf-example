package com.example.starter.base.impl;

import com.example.greetservice.GreetService;
import org.osgi.framework.BundleContext;
import org.osgi.framework.FrameworkUtil;
import org.osgi.framework.ServiceReference;

import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

/**
 * The main view contains a text field for getting the user name and a button
 * that shows a greeting message in a notification.
 */
@PageTitle("Main")
@Route(layout = MainLayout.class)
public class MainView extends VerticalLayout {

    public String greet(String name) {
        BundleContext ctx = FrameworkUtil.getBundle(MainView.class)
                .getBundleContext();
        ServiceReference<GreetService> reference = ctx
                .getServiceReference(GreetService.class);
        if (reference == null) {
            return "Greet service not currently available, install it into Karaf to get a proper greeting";
        }
        return ctx.getService(reference).greet(name);
    }

    public MainView() {

        // Use TextField for standard text input
        TextField textField = new TextField("Your name");
        textField.addThemeName("bordered");
        // Button click listeners can be defined as lambda expressions
        Button button = new Button("Say hello", e -> {
            Notification.show(greet(textField.getValue()));
        });

        // Theme variants give you predefined extra styles for components.
        // Example: Primary button is more prominent look.
        button.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        // You can specify keyboard shortcuts for buttons.
        // Example: Pressing enter in this view clicks the Button.
        button.addClickShortcut(Key.ENTER);

        // Use custom CSS classes to apply styling. This is defined in
        // shared-styles.css.
        addClassName("centered-content");

        add(textField, button);
    }
}
