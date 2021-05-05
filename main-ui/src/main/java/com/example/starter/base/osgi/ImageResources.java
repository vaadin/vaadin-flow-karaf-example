package com.example.starter.base.osgi;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.http.whiteboard.propertytypes.HttpWhiteboardResource;

@Component(service = ImageResources.class)
@HttpWhiteboardResource(pattern = "/static/images/*", prefix = "/static/images")
public class ImageResources {

}
