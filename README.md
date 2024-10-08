Weather API
Description
The Weather API is a Node.js-based application that fetches and returns weather data from a third-party API, specifically Visual Crossing's API. This project showcases the integration of external APIs, caching mechanisms using Redis, and the management of environment variables to enhance functionality and security.

Features
Data Fetching: Retrieves real-time weather data based on user input for city codes.
Caching: Utilizes Redis to cache responses, reducing the load on the external API and improving response times. The cache automatically expires after a defined period (e.g., 12 hours) to ensure data freshness.
Error Handling: Implements robust error handling to manage potential issues such as invalid city codes or downtime of the external API.
Environment Variables: Uses environment variables to store sensitive information such as API keys and Redis connection strings, allowing for easier configuration and deployment.

Project Url :- https://roadmap.sh/projects/weather-api-wrapper-service