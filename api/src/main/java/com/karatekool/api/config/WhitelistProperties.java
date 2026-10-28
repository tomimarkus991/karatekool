package com.karatekool.api.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;

/** whitelist.yaml: who may sign in, and which of them are Admins. */
@ConfigurationProperties("whitelist")
public record WhitelistProperties(List<String> admins, List<String> members) {}
