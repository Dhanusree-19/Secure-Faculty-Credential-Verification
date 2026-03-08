package com.securefaculty.controller;

import com.securefaculty.dto.ApiResponse;
import com.securefaculty.dto.CredentialRequest;
import com.securefaculty.dto.VerificationRequest;
import com.securefaculty.model.Credential;
import com.securefaculty.service.CredentialService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/credentials")
@RequiredArgsConstructor
public class CredentialController {

    private final CredentialService credentialService;

    // ── PUBLIC ────────────────────────────────────────────────────────

    /**
     * GET /api/credentials/verify/{uid}
     * Public: verify credential by UID (e.g. CRED-0001)
     */
    @GetMapping("/verify/{uid}")
    public ResponseEntity<ApiResponse<Credential>> verifyByUid(@PathVariable String uid) {
        Credential credential = credentialService.verifyByUid(uid);
        return ResponseEntity.ok(ApiResponse.success("Credential found", credential));
    }

    // ── FACULTY ───────────────────────────────────────────────────────

    /**
     * POST /api/credentials/upload
     * Faculty: submit a new credential with optional file
     * Form-data: credentialData (JSON part) + file (optional)
     */
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('FACULTY')")
    public ResponseEntity<ApiResponse<Credential>> uploadCredential(
            @RequestPart("credentialData") @Valid CredentialRequest request,
            @RequestPart(value = "file", required = false) MultipartFile file)
            throws IOException {

        Credential credential = credentialService.submitCredential(request, file);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("Credential submitted for verification", credential));
    }

    /**
     * GET /api/credentials/my
     * Faculty: get own submitted credentials
     */
    @GetMapping("/my")
    @PreAuthorize("hasRole('FACULTY')")
    public ResponseEntity<ApiResponse<List<Credential>>> getMyCredentials() {
        return ResponseEntity.ok(
                ApiResponse.success("Your credentials", credentialService.getMyCredentials()));
    }

    /**
     * GET /api/credentials/{id}
     * Get a single credential by database ID
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('FACULTY','ADMIN')")
    public ResponseEntity<ApiResponse<Credential>> getCredentialById(@PathVariable Long id) {
        return ResponseEntity.ok(
                ApiResponse.success("Credential retrieved", credentialService.getCredentialById(id)));
    }

    // ── ADMIN ─────────────────────────────────────────────────────────

    /**
     * GET /api/credentials
     * Admin: get all credentials
     */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<Credential>>> getAllCredentials() {
        return ResponseEntity.ok(
                ApiResponse.success("All credentials", credentialService.getAllCredentials()));
    }

    /**
     * GET /api/credentials/status/{status}
     * Admin: filter by status (PENDING | APPROVED | REJECTED)
     */
    @GetMapping("/status/{status}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<Credential>>> getByStatus(
            @PathVariable Credential.CredentialStatus status) {
        return ResponseEntity.ok(
                ApiResponse.success("Credentials with status " + status,
                        credentialService.getCredentialsByStatus(status)));
    }

    /**
     * GET /api/credentials/faculty/{facultyId}
     * Admin: get all credentials for a specific faculty
     */
    @GetMapping("/faculty/{facultyId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<Credential>>> getByFaculty(@PathVariable Long facultyId) {
        return ResponseEntity.ok(
                ApiResponse.success("Credentials for faculty " + facultyId,
                        credentialService.getCredentialsByFaculty(facultyId)));
    }

    /**
     * PUT /api/credentials/{id}/review
     * Admin: approve or reject a credential
     * Body: { "action": "APPROVED", "remarks": "Verified successfully" }
     */
    @PutMapping("/{id}/review")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Credential>> reviewCredential(
            @PathVariable Long id,
            @Valid @RequestBody VerificationRequest request) {

        Credential updated = credentialService.reviewCredential(id, request);
        return ResponseEntity.ok(ApiResponse.success("Credential " + request.getAction(), updated));
    }

    /**
     * DELETE /api/credentials/{id}
     * Admin: delete a credential
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteCredential(@PathVariable Long id) {
        credentialService.deleteCredential(id);
        return ResponseEntity.ok(ApiResponse.success("Credential deleted", null));
    }
}
