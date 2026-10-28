package com.karatekool.api.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;
import java.util.Locale;

/** Who may sign in, and which of them are Admins (see whitelist.yaml). Admins don't need to be listed as members too. */
@ConfigurationProperties("whitelist")
public record Whitelist(List<String> admins, List<String> members) {

    public Whitelist {
        admins = normalize(admins);
        members = normalize(members);
    }

    public boolean allows(String email) {
        return isAdmin(email) || members.contains(normalize(email));
    }

    public boolean isAdmin(String email) {
        return admins.contains(normalize(email));
    }

    private static List<String> normalize(List<String> emails) {
        return emails == null ? List.of() : emails.stream().map(Whitelist::normalize).toList();
    }

    private static String normalize(String email) {
        return email == null ? "" : email.trim().toLowerCase(Locale.ROOT);
    }
}
