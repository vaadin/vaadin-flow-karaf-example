package com.example.routes;

import com.example.starter.base.NavigationCaptionProvider;

import com.vaadin.flow.component.Component;

@org.osgi.service.component.annotations.Component
public class HelpCaptionProvider implements NavigationCaptionProvider {

    @Override
    public boolean isApplicable(Class<? extends Component> clazz) {
        return HelpView.class.equals(clazz);
    }

    @Override
    public String getCaption(Class<? extends Component> clazz) {
        if (HelpView.class.equals(clazz)) {
            return "Help";
        }
        return null;
    }

}
