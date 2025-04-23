package com.hackaton.Task.app;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "com.hackaton.Task.app")
@Data
public class CustomProperties {

    private String apiUrl;

}