package com.karatekool.api.config;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

/**
 * Who may sign in, and which of them are Admins (see whitelist.yaml). Admins don't need to be
 * listed as members too. The E2E test support adds people at runtime; nothing else does.
 */
@Component
public class Whitelist {

    private final Set<String> admins;
    private final Set<String> members;
    // email -> admin?
    private final Map<String, Boolean> added = new ConcurrentHashMap<>();

    public Whitelist(WhitelistProperties properties) {
        this.admins = normalize(properties.admins());
        this.members = normalize(properties.members());
    }

    public boolean allows(String email) {
        String key = normalize(email);
        return admins.contains(key) || members.contains(key) || added.containsKey(key);
    }

    public boolean isAdmin(String email) {
        String key = normalize(email);
        return admins.contains(key) || added.getOrDefault(key, false);
    }

    public void add(String email, boolean admin) {
        added.put(normalize(email), admin);
    }

    public void clearAdded() {
        added.clear();
    }

    private static Set<String> normalize(List<String> emails) {
        return emails == null ? Set.of() : emails.stream().map(Whitelist::normalize).collect(Collectors.toUnmodifiableSet());
    }

    private static String normalize(String email) {
        return email == null ? "" : email.trim().toLowerCase(Locale.ROOT);
    }
}
