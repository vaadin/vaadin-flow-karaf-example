package com.example.starter.base;

import com.vaadin.flow.component.Component;

public interface NavigationCaptionProvider {

    boolean isApplicable(Class<? extends Component> clazz);

    String getCaption(Class<? extends Component> clazz);
}
