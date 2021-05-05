# Vaadin Project that provides optional help view

The project contains an optional Vaadin navigation target view.
This project is not required for the `main-ui` project and may be deployed and undeployed
at any time.

The navigation target defined in the project (this project contains `"/help"` navigation target) becomes
available once the project is deployed. The route target is unregistered once the project 
is undeployed.

The `main-ui` project is required for this project since it depends on it. So its necessary
to have a Karaf OSGi container started with deployed `main-ui` project (along with all 
necessary dependencies).
If Karaf interactive shell is available (for an existing Karaf container) then this project can
be deployed to it via commands:


```
karaf@root()> bundle:install mvn:com.example/help-view/1.0-SNAPSHOT // installs the project bundle
karaf@root()> bundle:start mvn:com.example/help-view/1.0-SNAPSHOT // starts the bundle
```

As an option it's possible to reuse the Karaf distribution which is run via Maven plugin in the 
`main-ui` project but `webconsole` feature should be added into the `<featuresToInstall>` config parameter.
http://localhost:8181/system/console opens Karaf webconsole and you may deploy and start 
the bundle using it.

Once the commands are completed (it may take some time) open the URL http://localhost:8181/help in your browser.

The `main-ui` project contains the logic which shows a side bar with all navigation targets 
available if there are at least two of them. And the navigation side bar is not shown
if there is only one route registered.
So you may just refresh the main view URL http://localhost:8181/ and see the navigation side bar
on the left side with navigation links.

