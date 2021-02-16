package com.example.starter.base.osgi;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.http.whiteboard.propertytypes.HttpWhiteboardResource;

@Component(service = StaticResources.class)
@HttpWhiteboardResource(pattern = "/static/*", prefix = "/static")
public class StaticResources {
}
