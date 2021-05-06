# Main UI bundle 

This project contains the main layout, menu and required views for the Vaadin UI.

## Servlet configuration

Vaadin Servlet initial parameters may be passed via `@Component` annotation parameter `property`, e.g.

```java
@Component(immediate = false, service = Servlet.class, property = {
  HttpWhiteboardConstants.HTTP_WHITEBOARD_SERVLET_INIT_PARAM_PREFIX +
  InitParameters.SERVLET_PARAMETER_PRODUCTION_MODE + "=false"})
```
or via some annotation like `VaadinMode` which is available in the example.

Another way to set the `productionMode` value is explicitly set it via the Vaadin maven plugin configuration:

```xml
<configuration>
    <productionMode>false</productionMode>
</configuration>
```

The values will be set in the token file (`flow-build-info.json`) which is read to 
create a deployment configuration for a Vaadin servlet.

Note: Not any property can be set via Vaadin maven plugin configuration.
There is a limited number of Maven configuration parameters which are reflected to the same Vaadin Servlet init property name.
`productionMode` is mapped exactly as is: the same name is init parameter and the same maven config parameter can be used in the pom.xml.
There are config Maven parameters which have different names comparing to init parameters.
And there are a lot of Vaadin Servlet init parameters (see `com.vaadin.flow.server.InitParameters`) and only few Maven configuration parameters (see `com.vaadin.flow.plugin.maven.FlowModeAbstractMojo`).

## Vaadin Servlet registration in OSGi

At the moment Flow doesn't provide automatic servlet registration so servlet needs to be 
registered manually in the web application project. The example how to do it is 
provided in the project (see `FixedVaadinServlet`). 

PAX-web Http Whiteboard implementation which is used usually in Karaf has some issues related to
`ServletContextListener` service support. To be able to avoid these issues `OSGiVaadinServlet` class should
be used as a super class for the servlet registered as a service in Karaf.

