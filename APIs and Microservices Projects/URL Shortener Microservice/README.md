# URL Shortener Microservice

Source code regarding the third project for FreeCodeCamp APIs and Microservices course.

APIs and Microservices Challenges were built with NodeJS, Express, MongoDB and mongoose, using Glitch.

Glitch live preview: https://fcc-api-project--url-shortener-microservice.glitch.me

Exercise description below!

# API Project: URL Shortener Microservice for freeCodeCamp

### User Stories

1. I can POST a URL to `[project_url]/api/shorturl/new/[URL]` and I will receive a shortened URL as a JSON response. Example : `{"original_url": "www.google.com", "short_url": 1}`;
2. If I pass an invalid URL that doesn't follow the valid `http(s)://www.example.com(/more/routes)` format, the JSON response will contain an error like `{"error": "invalid URL"}`;
3. When I visit the shortened URL, it will redirect me to my original link.

#### Creation Example:

[project_url]/api/shorturl/new/https://www.google.com

#### Usage:

[this_project_url]/api/shorturl/4

#### Will redirect to:

hugororiz.github.io