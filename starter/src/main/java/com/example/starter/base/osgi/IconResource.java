package com.example.starter.base.osgi;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.http.whiteboard.propertytypes.HttpWhiteboardResource;

@Component(service = IconResource.class)
@HttpWhiteboardResource(pattern = "/static/icons/icon.png", prefix = "/static/icons/icon.png")
public class IconResource {

}
