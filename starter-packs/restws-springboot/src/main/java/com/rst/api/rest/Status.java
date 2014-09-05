package com.rst.api.rest;

public class Status {
    private String value;

    public Status(String status) {
        this.value = status;
    }

    public Status() {
        this(null);
    }

    public String getValue() {
        return value;
    }

    public void setValue(final String value) {
        this.value = value;
    }
}
