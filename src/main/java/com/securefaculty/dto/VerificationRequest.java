package com.securefaculty.dto;

import com.securefaculty.model.Credential;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class VerificationRequest {

    @NotNull(message = "Action is required (APPROVED or REJECTED)")
    private Credential.CredentialStatus action;

    private String remarks;
}
