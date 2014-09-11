package com.saket.resource;

import static javax.ws.rs.core.Response.ok;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.stereotype.Component;

@Component
@Path("/status")
public class StatusResource {

    @GET
    @Path("/json")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getJson() {
        Status status = new Status("StatusResource::Status:OK");
        return ok(status).build();
    }
}
