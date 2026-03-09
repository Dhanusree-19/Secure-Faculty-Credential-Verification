package com.securefaculty.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "credentials")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Credential {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "faculty_id", nullable = false)
    private User faculty;

    @NotBlank(message = "Certificate name is required")
    @Column(name = "certificate_name", nullable = false)
    private String certificateName;

    @NotBlank(message = "Issuing organization is required")
    @Column(name = "issuing_organization", nullable = false)
    private String issuingOrganization;

    @Column(name = "issue_date")
    private LocalDate issueDate;

    @Column(name = "credential_type")
    private String credentialType;   // e.g. Degree, Certificate, Workshop

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "file_path")
    private String filePath;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private CredentialStatus status = CredentialStatus.PENDING;

    @Column(name = "credential_uid", unique = true)
    private String credentialUid;    // e.g. CRED-001 for public lookup

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "submitted_at", updatable = false)
    private LocalDateTime submittedAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        submittedAt = LocalDateTime.now();
        updatedAt   = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public enum CredentialStatus {
        PENDING, APPROVED, REJECTED
    }
}
