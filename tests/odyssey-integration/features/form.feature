# /features/form.feature

Feature: Form Submission

  As a user
  I want to submit the form with my details
  So that I can receive confirmation of my submission

  Scenario: Successful form submission
    Given I am on the form page
    When I fill in the first name with "John"
    And I fill in the last name with "Doe"
    And I fill in the email with "john.doe@example.com"
    And I submit the form
    Then I should see a success message saying "Form submitted successfully!"
