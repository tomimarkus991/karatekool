package com.karatekool.api.service;

import com.karatekool.api.dto.AdultApplicationDto;
import com.karatekool.api.dto.ChildApplicationDto;
import com.karatekool.api.dto.GuardianDto;
import com.karatekool.api.dto.QuestionDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Locale;

/** Applications and Questions, sent to the club's inbox with replies going to the sender. */
@Service
public class ClubMailService {

    private final JavaMailSender mailSender;
    private final MailRateLimiter rateLimiter;
    private final String from;
    private final String to;

    public ClubMailService(JavaMailSender mailSender, MailRateLimiter rateLimiter,
                           @Value("${app.mail.from}") String from, @Value("${app.mail.to}") String to) {
        this.mailSender = mailSender;
        this.rateLimiter = rateLimiter;
        this.from = from;
        this.to = to;
    }

    public void sendQuestion(QuestionDto question) {
        send("question", question.email(), "Küsimus " + question.name(), """
                Nimi: %s
                Email: %s

                %s
                """.formatted(question.name(), question.email(), question.question()));
    }

    public void sendAdultApplication(AdultApplicationDto application) {
        String name = application.firstName() + " " + application.lastName();
        send("application", application.email(), "Registreerimine (täiskasvanu) " + name, """
                Uus registreerimine (täiskasvanu): %s

                Sünnikuupäev: %s
                Telefon: %s
                Email: %s

                Trennis käivad pereliikmed
                %s
                """.formatted(name, application.birthDate(), application.phone(), application.email(),
                orDash(application.familyMembers())));
    }

    public void sendChildApplication(ChildApplicationDto application) {
        if (!isComplete(application.mother()) && !isComplete(application.father())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Vähemalt ühe vanema nimi, telefon ja email peavad olema täidetud");
        }
        String name = application.firstName() + " " + application.lastName();
        send("application", application.infoEmail(), "Registreerimine (laps) " + name, """
                Uus registreerimine (laps): %s

                Isikukood: %s
                Lapse telefon: %s
                Lapse email: %s
                Kodune aadress: %s
                Kool: %s
                Klass: %s
                Karate on: %s

                %s
                %s
                Info email
                %s

                Trennis käivad pereliikmed
                %s
                """.formatted(name, application.personalCode(), application.phone(), application.email(),
                application.address(), application.school(), application.grade(),
                application.sportType().equals("main") ? "Põhiala" : "Kõrvalala",
                guardian("Ema", application.mother()), guardian("Isa", application.father()),
                application.infoEmail(), orDash(application.familyMembers())));
    }

    // Only what passed validation counts towards the sender's daily limit
    private void send(String kind, String replyTo, String subject, String text) {
        rateLimiter.take(kind + ":" + replyTo.trim().toLowerCase(Locale.ROOT));

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setFrom(from);
        mail.setTo(to);
        mail.setReplyTo(replyTo);
        mail.setSubject(subject);
        mail.setText(text);
        mailSender.send(mail);
    }

    private static boolean isComplete(GuardianDto guardian) {
        return guardian != null && guardian.isComplete();
    }

    private static String guardian(String title, GuardianDto guardian) {
        GuardianDto g = guardian == null ? new GuardianDto(null, null, null) : guardian;
        return """
                %s
                Nimi: %s
                Telefon: %s
                Email: %s
                """.formatted(title, orDash(g.name()), orDash(g.phone()), orDash(g.email()));
    }

    private static String orDash(String value) {
        return value == null || value.isBlank() ? "-" : value;
    }
}
