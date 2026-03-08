package com.securefaculty.service;

import com.securefaculty.dto.FacultyProfileRequest;
import com.securefaculty.exception.ResourceNotFoundException;
import com.securefaculty.model.FacultyProfile;
import com.securefaculty.model.User;
import com.securefaculty.repository.FacultyProfileRepository;
import com.securefaculty.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FacultyService {

    private final FacultyProfileRepository profileRepository;
    private final UserRepository           userRepository;

    // ── Get all faculty ───────────────────────────────────────────────
    public List<FacultyProfile> getAllFaculty() {
        return profileRepository.findAll();
    }

    // ── Get by ID ─────────────────────────────────────────────────────
    public FacultyProfile getFacultyById(Long id) {
        return profileRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Faculty profile not found: " + id));
    }

    // ── Get profile of logged-in faculty ─────────────────────────────
    public FacultyProfile getMyProfile() {
        User user = getCurrentUser();
        return profileRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found. Please create your profile."));
    }

    // ── Create profile ────────────────────────────────────────────────
    public FacultyProfile createProfile(FacultyProfileRequest request) {
        User user = getCurrentUser();

        if (profileRepository.existsByUser(user)) {
            throw new IllegalStateException("Profile already exists for this faculty.");
        }

        FacultyProfile profile = FacultyProfile.builder()
                .user(user)
                .department(request.getDepartment())
                .designation(request.getDesignation())
                .qualification(request.getQualification())
                .yearsOfExperience(request.getYearsOfExperience())
                .phoneNumber(request.getPhoneNumber())
                .bio(request.getBio())
                .build();

        return profileRepository.save(profile);
    }

    // ── Update profile ────────────────────────────────────────────────
    public FacultyProfile updateProfile(Long id, FacultyProfileRequest request) {
        FacultyProfile profile = profileRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Faculty profile not found: " + id));

        profile.setDepartment(request.getDepartment());
        profile.setDesignation(request.getDesignation());
        profile.setQualification(request.getQualification());
        profile.setYearsOfExperience(request.getYearsOfExperience());
        profile.setPhoneNumber(request.getPhoneNumber());
        profile.setBio(request.getBio());

        return profileRepository.save(profile);
    }

    // ── Delete faculty user ───────────────────────────────────────────
    public void deleteFaculty(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));

        profileRepository.findByUser(user).ifPresent(profileRepository::delete);
        userRepository.delete(user);
    }

    // ── Helper: get logged-in user from Security Context ─────────────
    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext()
                .getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found."));
    }
}
