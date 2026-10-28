package com.karatekool.api.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.sql.Timestamp;
import java.time.Clock;
import java.time.Duration;
import java.time.Instant;

/** Protects the club's inbox: at most 5 sends per key in any 24 hours. */
@Service
@RequiredArgsConstructor
public class MailRateLimiter {

    private static final int LIMIT = 5;
    private static final Duration WINDOW = Duration.ofDays(1);

    private final JdbcClient jdbc;
    private final Clock clock;

    public void take(String key) {
        Instant now = clock.instant();
        int sent = jdbc.sql("select count(*) from mail_sent where rate_key = ? and sent_at > ?")
                .params(key, Timestamp.from(now.minus(WINDOW)))
                .query(Integer.class)
                .single();
        if (sent >= LIMIT) {
            throw new ResponseStatusException(HttpStatus.TOO_MANY_REQUESTS, "Too many requests");
        }
        jdbc.sql("insert into mail_sent (rate_key, sent_at) values (?, ?)")
                .params(key, Timestamp.from(now))
                .update();
    }

    /** Senders' emails are only needed for the limit, so they're kept no longer than its window */
    @Scheduled(cron = "0 0 * * * *")
    public void forgetOldSends() {
        jdbc.sql("delete from mail_sent where sent_at <= ?")
                .param(Timestamp.from(clock.instant().minus(WINDOW)))
                .update();
    }
}
