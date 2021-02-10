# Base Starter for Vaadin Flow and Karaf in NPM mode

This project can be used as a starting point to create your own Vaadin Flow application bundle for Karaf.
It has the necessary dependencies and files to help you get started.
**This project has been revised for Vaadin 19 (GA in March 2021) which brings back OSGi support in npm mode.
For now, it Vaadin OSGi support is only for Flow based views (Java UIs), but not for Fusion (TypeScript UIs).**

For more Vaadin usage samples, you can go to vaadin.com/start.

To access it directly from github, clone the repository and import the project to the IDE of your choice as a Maven project. You need to have Java 8 or 11 installed.

The project consist of two subprojects:
- starter
- greetservice
- help-view

The `starter` project contains the code for Web Application Bundle (WAB) which can be deployed
to any OSGi container. It contains MainView, that uses GreetService, if available as OSGi service. It also provides a simple menu and MainLayout for other bundles that can contribute views to the UI.

The `help-view` project represents another project which contains an optional view (and route target). It can be deployed or undeployed at any time. The view will be available in the `starter` project if the `help-view` bundle is deployed.

The `greetservice` project provides implementation for GreetService, that is used by the MainView in the `starter` project.

## Build and run a Vaadin web application OSGi bundle

The simplest way to start the project is run command `mvn install` to install project artifact and
`mvn -pl starter install -Prun` to run Karaf OSGi container.

For more dynamic tutorial follow these steps:

 * If you didn't already, build the project using `mvn install`
 * Download Karaf and start it from command line using `./bin/karaf` from the Karaf directory
 * In the Karaf console, execute `feature:install http war` to install required web capabilities
 * Next, install the plain starter using `feature:repo-add mvn:com.example/project-base-karaf/1.0.0-SNAPSHOT/xml/features` and `feature:install project-base-karaf`
 * Now you can navigate to http://localhost:8181 to see the basic UI without the other bundles. Try clicking the button as well.
 * Next, install the greetservice bundle using `bundle:install mvn:com.example/greetservice/1.0.0-SNAPSHOT` and `bundle:start greetservice`
 * Try the button again
 * Next install the optional help view using `bundle:install mvn:com.example/help-view/1.0.0-SNAPSHOT` and `bundle:start help-view`
 * Reload the browser and see how a simple menu appears with the newly loaded help view in it


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

See Limitations section in the starter project [README.md](starter/README.md).

:warning:
At the moment, it is not possible to modify frontend resources on the fly (webpack dev server is not available at runtime). This means that for every frontend change, you have to rebuild the frontend bundle. ([Issue for devmode](https://github.com/vaadin/flow/issues/9108))