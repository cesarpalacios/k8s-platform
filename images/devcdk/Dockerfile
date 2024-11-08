FROM node:18.20-bullseye

RUN npm install -g n && \
    n stable && \
    npm install -g aws-cdk@2.162.1

WORKDIR /app
     
ENTRYPOINT ["/bin/sh", "-c"]
