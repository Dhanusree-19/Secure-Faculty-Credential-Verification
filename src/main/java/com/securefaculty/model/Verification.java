package com.securefaculty.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "verifications")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Verification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "credential_id", nullable = false, unique = true)
    private Credential credential;

    @ManyToOne
    @JoinColumn(name = "verified_by")
    private User verifiedBy;         // Admin who verified

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Credential.CredentialStatus action;   // APPROVED / REJECTED

    @Column(columnDefinition = "TEXT")
    private String remarks;          // Admin remarks / reason for rejection

    @Column(name = "verified_at")
    private LocalDateTime verifiedAt;

    @PrePersist
    protected void onCreate() {
        verifiedAt = LocalDateTime.now();
    }
}
