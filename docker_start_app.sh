docker build -t node-20-alpine:v1 .

docker run \
-d \
-p 3008:3008  \
-v /Users/kourtneyreynolds/repos/backend-events-interview/:/app \
--name event-service \
--network backend-events-interview_event-network \
node-20-alpine:v1