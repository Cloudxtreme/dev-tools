package com.rst.api.rest;

import static javax.ws.rs.core.Response.ok;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.stereotype.Component;

@Component
@Path("/")
public class SampleResource {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getSimpleMessage() {
        Status status = new Status("Hello!");
        return ok(status).build();
    }

    @GET
    @Path("/status/json")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getJson() {
        Status status = new Status("SampleResource::Status:OK");
        return ok(status).build();
    }
}
