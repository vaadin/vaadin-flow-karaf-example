package com.example.littemplateview;

import com.example.littemplates.DesignerBuiltView;
import com.example.starter.base.ContentLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

/**
 * This class publishes the DesignerBuiltView to the navigation system in main-ui project.
 * <p>Due to the limitations in webpack bundling and as we don't want main-ui to depend on this module, the actual
 * LitTemplate can't be in this project.Those need to be in the frontedn-resources bundle, to be picked up by the
 * webpack build.</p>
 */
@Route(layout = ContentLayout.class)
@PageTitle("Designer view")
public class DesignerView extends DesignerBuiltView {


}
