package com.example.greetserviceimpl;

import com.example.greetservice.GreetService;
import org.osgi.service.component.annotations.Component;

@Component
public class GreetServiceImpl implements GreetService {

    @Override
    public String greet(String name) {
        return "Karaf & OSGi service greets " + name;
    }
    
}
