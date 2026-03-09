package com.securefaculty.service;

import com.securefaculty.dto.CredentialRequest;
import com.securefaculty.dto.VerificationRequest;
import com.securefaculty.exception.ResourceNotFoundException;
import com.securefaculty.model.Credential;
import com.securefaculty.model.User;
import com.securefaculty.model.Verification;
import com.securefaculty.repository.CredentialRepository;
import com.securefaculty.repository.UserRepository;
import com.securefaculty.repository.VerificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CredentialService {

    private final CredentialRepository   credentialRepository;
    private final VerificationRepository verificationRepository;
    private final UserRepository         userRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    // ── Faculty: submit a credential ─────────────────────────────────
    public Credential submitCredential(CredentialRequest request, MultipartFile file)
            throws IOException {

        User faculty = getCurrentUser();

        // Save file to disk
        String fileName = null;
        String filePath = null;
        if (file != null && !file.isEmpty()) {
            fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path dir = Paths.get(uploadDir);
            Files.createDirectories(dir);
            filePath = dir.resolve(fileName).toString();
            Files.copy(file.getInputStream(), Paths.get(filePath),
                    StandardCopyOption.REPLACE_EXISTING);
        }

        // Generate unique credential UID
        String uid = "CRED-" + String.format("%04d",
                (int)(credentialRepository.count() + 1));

        Credential credential = Credential.builder()
                .faculty(faculty)
                .certificateName(request.getCertificateName())
                .issuingOrganization(request.getIssuingOrganization())
                .issueDate(request.getIssueDate())
                .credentialType(request.getCredentialType())
                .description(request.getDescription())
                .fileName(fileName)
                .filePath(filePath)
                .credentialUid(uid)
                .status(Credential.CredentialStatus.PENDING)
                .build();

        return credentialRepository.save(credential);
    }

    // ── Faculty: get my own credentials ───────────────────────────────
    public List<Credential> getMyCredentials() {
        User faculty = getCurrentUser();
        return credentialRepository.findByFaculty(faculty);
    }

    // ── Admin: get all credentials ────────────────────────────────────
    public List<Credential> getAllCredentials() {
        return credentialRepository.findAll();
    }

    // ── Admin: get credentials by status ─────────────────────────────
    public List<Credential> getCredentialsByStatus(Credential.CredentialStatus status) {
        return credentialRepository.findByStatus(status);
    }

    // ── Admin: get credentials by faculty ID ──────────────────────────
    public List<Credential> getCredentialsByFaculty(Long facultyId) {
        return credentialRepository.findByFacultyId(facultyId);
    }

    // ── Get one credential by ID ──────────────────────────────────────
    public Credential getCredentialById(Long id) {
        return credentialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Credential not found: " + id));
    }

    // ── Public: verify by UID (e.g. CRED-0001) ───────────────────────
    public Credential verifyByUid(String uid) {
        return credentialRepository.findByCredentialUid(uid)
                .orElseThrow(() -> new ResourceNotFoundException("Credential not found: " + uid));
    }

    // ── Admin: approve or reject credential ───────────────────────────
    public Credential reviewCredential(Long credentialId, VerificationRequest request) {
        User admin = getCurrentUser();

        Credential credential = credentialRepository.findById(credentialId)
                .orElseThrow(() -> new ResourceNotFoundException("Credential not found: " + credentialId));

        // Validate action
        if (request.getAction() == Credential.CredentialStatus.PENDING) {
            throw new IllegalArgumentException("Action must be APPROVED or REJECTED.");
        }

        // Update credential status
        credential.setStatus(request.getAction());
        credentialRepository.save(credential);

        // Save verification record
        Verification verification = verificationRepository
                .findByCredentialId(credentialId)
                .orElse(new Verification());

        verification.setCredential(credential);
        verification.setVerifiedBy(admin);
        verification.setAction(request.getAction());
        verification.setRemarks(request.getRemarks());
        verificationRepository.save(verification);

        return credential;
    }

    // ── Delete credential ─────────────────────────────────────────────
    public void deleteCredential(Long id) {
        Credential credential = credentialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Credential not found: " + id));
        credentialRepository.delete(credential);
    }

    // ── Helper ────────────────────────────────────────────────────────
    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext()
                .getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found."));
    }
}
