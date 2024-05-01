docker build -t node-20-alpine:v1 .

docker run \
-d \
-p 3008:3008  \
-v /Users/kourtneyreynolds/repos/backend-events-api-03b8ac7f82bd4ff9a91c35d630ca3626/:/app \
--name event-service \
--network event-network \
node-20-alpine:v1