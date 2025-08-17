Feature: Hello World

  Scenario: Ping
    Given I have a NestJS app
    When I call GET "/"
    Then I should receive 200
  
  Scenario: Unknown Route
    Given I have a NestJS app
    When I call GET "/unknown"
    Then I should receive 404
