package com.securefaculty.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class FacultyProfileRequest {

    @NotBlank(message = "Department is required")
    private String department;

    private String designation;
    private String qualification;
    private Integer yearsOfExperience;
    private String phoneNumber;
    private String bio;
}
