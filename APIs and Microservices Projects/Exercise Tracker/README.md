# Exercise Tracker RESTAPI Microservice

Source code regarding the fourth project for FreeCodeCamp APIs and Microservices course.

APIs and Microservices Challenges were built with NodeJS, Express, MongoDB and mongoose, using Glitch.

Glitch live preview: https://fcc-api-project--exercise-tracker-restapi.glitch.me

Exercise description below!

# Exercise Tracker REST API

#### A microservice project, part of Free Code Camp's curriculum

### User Stories

1. I can create a user by posting form data username to [project_url]/api/exercise/new-user and returned will be an object with username and _id.
2. I can get an array of all users by getting [project_url]/api/exercise/users.
3. I can add an exercise to any user by posting form data userId(_id), description, duration, and optionally date to [project_url]/api/exercise/add. If no date supplied it will use current date. Returned will be the user object also with the exercise fields added.
4. I can retrieve a full exercise log of any user by getting [project_url]/api/exercise/log with a parameter of userId(_id). Return will be the user object with added array log and count (total exercise count).
5. I can retrieve part of the log of any user by also passing along optional parameters of from & to or limit. (Date format yyyy-mm-dd, limit = int)
