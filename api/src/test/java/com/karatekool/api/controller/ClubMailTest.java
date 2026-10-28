package com.karatekool.api.controller;

import com.karatekool.api.IntegrationTest;
import com.karatekool.api.service.MailRateLimiter;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.clearInvocations;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/** Applications and Questions go by email to the club's inbox. Nobody needs to sign in to send them. */
class ClubMailTest extends IntegrationTest {

    private static final String QUESTION = """
            {"name": "Kati Maasikas", "email": "kati@example.com", "question": "Kas proovitrenni võib tulla ilma kimonota?"}
            """;
    private static final String ADULT = """
            {"firstName": "Jaan", "lastName": "Tamm", "birthDate": "1990-05-01", "phone": "+372 5555 0001",
             "email": "jaan@example.com", "familyMembers": ""}
            """;
    private static final String CHILD = """
            {"firstName": "Mari", "lastName": "Maasikas", "personalCode": "61505050000", "phone": "+372 5555 0003",
             "email": "mari@example.com", "school": "Nõmme Põhikool", "grade": "4", "address": "Pärnu mnt 1",
             "infoEmail": "kati@example.com", "sportType": "main",
             "mother": {"name": "Kati Maasikas", "phone": "+372 5555 0002", "email": "kati@example.com"},
             "father": {"name": "", "phone": "", "email": ""}}
            """;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JdbcTemplate jdbc;

    @Autowired
    private MailRateLimiter rateLimiter;

    @MockitoBean
    private JavaMailSender mailSender;

    @BeforeEach
    void noEarlierMail() {
        jdbc.update("delete from mail_sent");
    }

    @Test
    void aQuestion_reachesTheClubAndRepliesGoToTheVisitor() throws Exception {
        send("/questions", QUESTION).andExpect(status().isNoContent());

        SimpleMailMessage mail = sentMail();
        assertThat(mail.getTo()).containsExactly("info@karatekool.ee");
        assertThat(mail.getReplyTo()).isEqualTo("kati@example.com");
        assertThat(mail.getSubject()).isEqualTo("Küsimus Kati Maasikas");
        assertThat(mail.getText()).contains("Kas proovitrenni võib tulla ilma kimonota?", "kati@example.com");
    }

    @Test
    void anAdultApplication_reachesTheClubAndRepliesGoToTheAdult() throws Exception {
        send("/applications/adult", ADULT).andExpect(status().isNoContent());

        SimpleMailMessage mail = sentMail();
        assertThat(mail.getTo()).containsExactly("info@karatekool.ee");
        assertThat(mail.getReplyTo()).isEqualTo("jaan@example.com");
        assertThat(mail.getSubject()).isEqualTo("Registreerimine (täiskasvanu) Jaan Tamm");
        assertThat(mail.getText()).contains("Sünnikuupäev: 1990-05-01", "Telefon: +372 5555 0001");
    }

    @Test
    void aChildApplication_reachesTheClubAndRepliesGoToTheGuardian() throws Exception {
        send("/applications/child", CHILD).andExpect(status().isNoContent());

        SimpleMailMessage mail = sentMail();
        assertThat(mail.getReplyTo()).isEqualTo("kati@example.com");
        assertThat(mail.getSubject()).isEqualTo("Registreerimine (laps) Mari Maasikas");
        assertThat(mail.getText()).contains("Isikukood: 61505050000", "Karate on: Põhiala", "Ema", "Nimi: Kati Maasikas");
    }

    @Test
    void aChildApplication_needsOneCompleteGuardian() throws Exception {
        String noGuardian = CHILD.replace("\"name\": \"Kati Maasikas\"", "\"name\": \"\"");

        send("/applications/child", noGuardian)
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Vähemalt ühe vanema nimi, telefon ja email peavad olema täidetud"));
        verify(mailSender, never()).send(any(SimpleMailMessage.class));
    }

    @Test
    void aChildApplication_needsAValidPersonalCode() throws Exception {
        send("/applications/child", CHILD.replace("61505050000", "123"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void aQuestionWithMissingFields_isRefusedAndNotSent() throws Exception {
        send("/questions", """
                {"email": "kati@example.com"}
                """)
                .andExpect(status().isBadRequest());
        verify(mailSender, never()).send(any(SimpleMailMessage.class));
    }

    @Test
    void theSixthQuestionFromOneEmailInADay_isRefused() throws Exception {
        for (int i = 0; i < 5; i++) {
            send("/questions", QUESTION).andExpect(status().isNoContent());
        }
        clearInvocations(mailSender);

        send("/questions", QUESTION.replace("kati@example.com", "KATI@example.com"))
                .andExpect(status().isTooManyRequests())
                .andExpect(jsonPath("$.error").value("Too many requests"));
        verify(mailSender, never()).send(any(SimpleMailMessage.class));
    }

    @Test
    void refusedRequests_doNotCountTowardsTheLimit() throws Exception {
        for (int i = 0; i < 5; i++) {
            send("/questions", "{\"email\": \"kati@example.com\"}").andExpect(status().isBadRequest());
        }

        send("/questions", QUESTION).andExpect(status().isNoContent());
    }

    @Test
    void sendsFromMoreThanADayAgo_doNotCount() throws Exception {
        for (int i = 0; i < 5; i++) {
            jdbc.update("insert into mail_sent (rate_key, sent_at) values ('question:kati@example.com', now() - interval '25 hours')");
        }

        send("/questions", QUESTION).andExpect(status().isNoContent());
    }

    @Test
    void sendersEmails_areForgottenAfterADay() throws Exception {
        jdbc.update("insert into mail_sent (rate_key, sent_at) values ('question:old@example.com', now() - interval '25 hours')");
        send("/questions", QUESTION).andExpect(status().isNoContent());

        rateLimiter.forgetOldSends();

        assertThat(jdbc.queryForList("select rate_key from mail_sent", String.class))
                .containsExactly("question:kati@example.com");
    }

    @Test
    void questionsAndApplications_haveSeparateLimits() throws Exception {
        for (int i = 0; i < 5; i++) {
            send("/questions", QUESTION.replace("kati@example.com", "jaan@example.com"));
        }

        send("/applications/adult", ADULT).andExpect(status().isNoContent());
    }

    private ResultActions send(String path, String json) throws Exception {
        return mockMvc.perform(post(path).contentType(MediaType.APPLICATION_JSON).content(json));
    }

    private SimpleMailMessage sentMail() {
        ArgumentCaptor<SimpleMailMessage> captor = ArgumentCaptor.forClass(SimpleMailMessage.class);
        verify(mailSender).send(captor.capture());
        return captor.getValue();
    }
}
