/*
 * Copyright 2000-2020 Vaadin Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
package com.example.helpview;

import com.example.starter.base.ContentLayout;

import com.vaadin.flow.component.Unit;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@PageTitle("Help")
@Route(layout = ContentLayout.class)
public class HelpView extends VerticalLayout {

    public HelpView() {
        setWidth(50, Unit.PERCENTAGE);
        add(createViewInfo());
        add(createGeneralInfo());
    }

    private Div createViewInfo() {
        Div info = new Div();
        info.setText("This view is located outside of web application bundle "
                + "and can be undeployed/deployed at any time preserving functionality of the main application. "
                + "The navigation target '/help' becomes available once the bundle with this view is deployed.");
        return info;
    }

    private Div createGeneralInfo() {
        Div info = new Div();
        info.setText(
                "Any bundle which wants to populate its routes should have 'Vaadin-OSGi-Extender: true' manifest header. "
                        + "The route targets from the bundle declared via '@Route' annotation  becomes available "
                        + "in a web application once the bundle is deployed to the OSGi container.");
        return info;
    }
}
