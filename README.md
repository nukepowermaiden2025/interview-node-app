# Events API



# Prereqs
- Docker
- Docker Compose
- NodeJs


# Build and Run
- Open Terminal and run `yarn`
- In another terminal window run `docker-compose up`
- In a third terminal window run `yarn dev`


# Requirements


# Plan
1. Initial Setup
1. Design choices
    - Node/Express
    - Docker
    - Kafka for pubsub
    - Json for endpoint
    - Unit tests for business logic
1. Create tasks
    - Create Node app
    - Yarn all the things
    - Add docker compose from my other github - shortcut
    - Test Docker is running and containers are on network
    - Create Endpoints - skip openAPI for time saving
    - Test endpoints
1. Write Producer
1. Write Consumer
1. Update 

# Test on Postman
POST
curl --location 'http://localhost:3008/events' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'createdAt=2024-05-01T00:15:33.008Z' \
--data-urlencode 'eventType=View Item' \
--data-urlencode 'account=5f558bcb-49d3-47b1-a8e6-cb137caa3944' \
--data-urlencode 'user=da3b08e5-337c-4236-8980-90a81086740e'

GET
curl --location 'http://localhost:3008/account/6a4c8cde-d429-4abe-879f-f7b913cd1472/event-summary'