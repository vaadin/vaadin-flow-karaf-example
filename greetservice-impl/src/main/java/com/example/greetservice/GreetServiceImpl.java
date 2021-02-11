package com.example.greetservice;

import com.example.starter.base.GreetService;
import org.osgi.service.component.annotations.Component;

@Component
public class GreetServiceImpl implements GreetService {

    @Override
    public String greet(String name) {
        return "Karaf & OSGi service greets " + name;
    }
    
}
