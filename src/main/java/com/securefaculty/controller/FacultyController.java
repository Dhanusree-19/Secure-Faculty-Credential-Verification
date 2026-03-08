package com.securefaculty.controller;

import com.securefaculty.dto.ApiResponse;
import com.securefaculty.dto.FacultyProfileRequest;
import com.securefaculty.model.FacultyProfile;
import com.securefaculty.service.FacultyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faculty")
@RequiredArgsConstructor
public class FacultyController {

    private final FacultyService facultyService;

    /**
     * GET /api/faculty
     * Admin: get all faculty profiles
     */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<FacultyProfile>>> getAllFaculty() {
        return ResponseEntity.ok(
                ApiResponse.success("Faculty list retrieved", facultyService.getAllFaculty()));
    }

    /**
     * GET /api/faculty/me
     * Faculty: get own profile
     */
    @GetMapping("/me")
    @PreAuthorize("hasAnyRole('FACULTY','ADMIN')")
    public ResponseEntity<ApiResponse<FacultyProfile>> getMyProfile() {
        return ResponseEntity.ok(
                ApiResponse.success("Profile retrieved", facultyService.getMyProfile()));
    }

    /**
     * GET /api/faculty/{id}
     * Get faculty profile by ID
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<FacultyProfile>> getFacultyById(@PathVariable Long id) {
        return ResponseEntity.ok(
                ApiResponse.success("Faculty retrieved", facultyService.getFacultyById(id)));
    }

    /**
     * POST /api/faculty/profile
     * Faculty: create own profile
     * Body: { "department":"...", "designation":"...", ... }
     */
    @PostMapping("/profile")
    @PreAuthorize("hasRole('FACULTY')")
    public ResponseEntity<ApiResponse<FacultyProfile>> createProfile(
            @Valid @RequestBody FacultyProfileRequest request) {

        FacultyProfile created = facultyService.createProfile(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("Profile created successfully", created));
    }

    /**
     * PUT /api/faculty/{id}
     * Update faculty profile by ID
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('FACULTY','ADMIN')")
    public ResponseEntity<ApiResponse<FacultyProfile>> updateProfile(
            @PathVariable Long id,
            @Valid @RequestBody FacultyProfileRequest request) {

        FacultyProfile updated = facultyService.updateProfile(id, request);
        return ResponseEntity.ok(ApiResponse.success("Profile updated successfully", updated));
    }

    /**
     * DELETE /api/faculty/{userId}
     * Admin: delete a faculty user
     */
    @DeleteMapping("/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteFaculty(@PathVariable Long userId) {
        facultyService.deleteFaculty(userId);
        return ResponseEntity.ok(ApiResponse.success("Faculty deleted successfully", null));
    }
}
