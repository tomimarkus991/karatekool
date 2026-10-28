package com.karatekool.api.controller;

import com.karatekool.api.dto.AdultApplicationDto;
import com.karatekool.api.dto.ChildApplicationDto;
import com.karatekool.api.dto.QuestionDto;
import com.karatekool.api.service.ClubMailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/** The public Application and Question forms. A sixth send from one email address within a day gets 429. */
@RestController
@RequiredArgsConstructor
public class ClubMailController {
    private final ClubMailService clubMailService;

    @PostMapping("/questions")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void sendQuestion(@Valid @RequestBody QuestionDto question) {
        clubMailService.sendQuestion(question);
    }

    @PostMapping("/applications/adult")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void sendAdultApplication(@Valid @RequestBody AdultApplicationDto application) {
        clubMailService.sendAdultApplication(application);
    }

    @PostMapping("/applications/child")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void sendChildApplication(@Valid @RequestBody ChildApplicationDto application) {
        clubMailService.sendChildApplication(application);
    }
}
