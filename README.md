# Example project for Vaadin Flow and Apache Karaf

This project demonstrates how you can build modular web applications using Vaadin Flow and Apache Karaf. The project can also be used as a starting point to create your own Vaadin Flow application bundle for Karaf.

For more Vaadin usage samples, you can go to vaadin.com/start.

To access the project directly from github, clone or download the repository and import the project to the IDE of your choice as a Maven project. You need to have 11 installed.

The project consist of four sub-projects:
- main-ui 
- greetservice-api
- greetservice-impl
- help-view

The `main-ui` project contains the code for Web Application Bundle (WAB) which can be deployed
to any OSGi container. This is also the Karaf feature that gets packaged during the build. The most relevant parts are two views that it contains:
 * MainView, which is always available. It uses GreetService, in a Button click listener in case an implementation is available as an OSGi service. 
 * ServiceDependantView view is only visible in the UI if an implementation of GreetService is available. 

The module also provides a simple menu and MainLayout for other bundles that can contribute views to the UI, and Vaadin boiler plate to configure app for PWA features, server push, missing views etc.

The `greetservice-api` project provides an API for a dummy service used by the main-ui project.

The `greetservice-impl` project provides an implementation for GreetService, that is defined and used by the MainView in the `main-ui` project. The main-ui does not depend on this bundle and it is not required to run the project. But deploying it separately affects how the application behaves.

The `help-view` is another optional bundle which contains an optional view (and a route target). It can be deployed or un-deployed at any time. The help view will be available in the `main-ui` project and its menu only if the `help-view` bundle is deployed.


## Build and run a Vaadin web application OSGi bundle

The simplest way to start the project is run command `mvn install` to install project artifact and
`mvn -pl main-ui install -Prun` to run Karaf OSGi container. After a while, the Vaadin UI will be available in http://localhost:8181. Note that this only deploys the main-ui bundle, and not the optional help-view or greetservice-impl bundles.

For more dynamic tutorial we suggest to follow these steps:

 * Build the project using `mvn install`
 * Download Karaf and start it from command line using `./bin/karaf` from the Karaf directory
 * In the Karaf console, execute `feature:install http war` to install required web capabilities
 * Next, install the plain main-ui using `feature:repo-add mvn:com.example/main-ui/1.0.0-SNAPSHOT/xml/features` and `feature:install main-ui`. This deploys the main-ui and all required dependencies.
 * Now you can navigate to http://localhost:8181 to see the basic UI without the other bundles. Try clicking the button as well.
 * Next, install the greetservice-impl bundle using `bundle:install mvn:com.example/greetservice-impl/1.0.0-SNAPSHOT` and `bundle:start greetservice-impl`
 * Now you can see that `Optional` view (defined in ServiceDependantView Java class) appeared in the menu. Nothing needs to be done at the browser, because Vaadin takes care of updating the UI using the WebSocket based "server push" connection. Try the button again and you'll see that the click listener now responds differently as an implementation for GreetService is available.
 * Next, install the optional help view using `bundle:install mvn:com.example/help-view/1.0.0-SNAPSHOT` and `bundle:start help-view`
 * The menu in your browser now has the newly loaded help view in it

See readme files starter/README.md and help-view/README.md in the projects for further details.

## Deploying Vaadin specific bundles to an OSGi container

Vaadin application generally contains dependencies to other bundles: e.g. Vaadin components like `Button`,
`TextField` , etc. Every Vaadin component is based on a Web Component which
is represented by frontend resources. All frontend resources are built into a bundle
along with Vaadin WAB. As a result:
 - any Vaadin component bundle update is possible only within the same minor version, 
 so that the Web Component version stays the same (and only Java code is updated). We don't recommend 
 updating any version over a minor for Flow or the web component Flow integrations (even though it's
 not prevented anyhow at the moment).
 - Updating any bundle that has frontend resources requires that the frontend build goal `build-frontend` 
 is run and the WAB is redeployed to get the static frontend bundle updated.


## Limitations

Here is a list of things which are not currently supported:

- NPM dev mode: it's possible to run Vaadin web application in both production 
and dev mode, but dev mode can be used only with precompiled frontend
 resources (via vaadin-maven-plugin) and it's not possible to use a dev server (Webpack) within OSGi.
- it's not possible to use OSGi declarative services with Vaadin components using injection: 
you may not inject a service declaratively in Vaadin classes (using annotations) 
just because UI objects are not managed by OSGi. But you still may call OSGi services programmatically of course.
- There is no automatic servlet registration. So the web application 
bundle should register the servlet itself.
- Server push may have issues with certain HTTP Whiteboard implementations. 
- Sometimes after the `Artifact deployed` message appears in the terminal, requesting `http://localhost:8181` would result in a 404 error. 
There can be two cases when this happens:
  - After a cold start (clean install) since the karaf runtime is being downloaded, extracted and at least 180-190 bundles are being cached (depending on the features installed) it would take some seconds for the application to be reachable, so wait a while and refresh the page to see the application up and running.
  This is almost not happening when you are not cleaning the target folder and the application is just being run from an existing artifact and cached karaf runtime.
  - Statistically speaking, almost 1 out of 10 times when the application starts (cold or hot), for some currently unknown problem the application would respond with 404 error all the time, and waiting would not alleviate the situation.
  Looking at the logs in `main-ui/target/karaf/data/log/karaf.log`, it seems that multiple port binding exceptions are reported all the times (even while the application is responding normally) which might be related to 404 errors, but currently there is no fix or workaround available for this. 
  See https://github.com/vaadin/vaadin-flow-karaf-example/issues/100

:warning:
At the moment, it is not possible to modify frontend resources on the fly (webpack dev server is not available at runtime). This means that for every frontend change, you have to rebuild the frontend bundle. ([Issue for devmode](https://github.com/vaadin/flow/issues/9108))
