package com.rst.api.rest;

import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.server.ResourceConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class JerseyConfig extends ResourceConfig {

    private static Logger LOGGER = LoggerFactory.getLogger(JerseyConfig.class);

    public JerseyConfig() {
        super(SampleResource.class, JacksonFeature.class);
        LOGGER.info("Initialising Jersey configuration");
    }
}
