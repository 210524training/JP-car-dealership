# Car Dealership

The Car Dealership app is a console-based application that facilitates the purchasing of cars. An employee can add cars to the lot and manage offers for those cars, while a customer can view the cars on the lot and make offers.

## Purpose

We want to see that you can meet deadlines and that you can code. You are expected to complete the following requirements and give a 5 minute presentation of your project to our QC team.

You will be creating a Git repository for your project inside our batch's Organization on GitHub so that I may inspect it.

Due Date: 6/7/21

## Requirements
1. Functionality should reflect the below user stories
2. All Business Logic is modularized into its own module
3. Application is written in TypeScript
4. Data is stored in DynamoDB
5. Data Access is performed through the use of AWS SDK (connect to DynamoDB)
    - All Data Access is performed in its own module
6. All user input is received using `readline` DONE
7. Data is moduled using classes or interfaces
8. Errors must be handled
9. Logging must be leveraged
10. Unit Testing must be performed for your modules
    - We will be using Jest
    - 50% Test coverage on Functions (`npx jest --coverage`)

## User Stories
Total: 25 Story Points

- As a user, I can login DONE
    - 2 points
- As an employee, I can add a car to the lot DONE
    - 3 points
- As a customer, I can view the cars on the lot DONE
    - 1 point
- As a customer, I can make an offer for a car DONE
    - 3 points
- As an employee, I can accept or reject a pending offer for a car
    - 2 points
- As the system, I update a car to an owned state when an offer is accepted
    - 2 points
- As the system, I reject all other pending offers for a car when an offer is accepted
    - 3 points
- As a user, I can register for a customer account DONE
    - 3 points
- As an employee, I can remove a car from the lot DONE
    - 2 points
- As a customer, I can view the cars that I own DONE
    - 1 point
- As a customer, I can view my remaining payments for a car (will be in the view my car menu) (maybe)
    - 1 point
- As an employee, I can view all payments (maybe)
    - 1 point
- As the system, I can calculate the monthly payment (maybe)
    - 1 point