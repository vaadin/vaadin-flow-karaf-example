package com.example.starter.base.impl;

import com.example.starter.base.NavigationCaptionProvider;

import com.vaadin.flow.component.Component;

@org.osgi.service.component.annotations.Component
public class MainViewCaptionProvider implements NavigationCaptionProvider {

    @Override
    public boolean isApplicable(Class<? extends Component> clazz) {
        return MainView.class.equals(clazz);
    }

    @Override
    public String getCaption(Class<? extends Component> clazz) {
        if (MainView.class.equals(clazz)) {
            return "Main";
        }
        return null;
    }

}
