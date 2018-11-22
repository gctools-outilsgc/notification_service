# notification_service
A prototype notification micro-service built on prisma and graphql-yoga

## Variables that need declaring
Environment variables need to be declared in an '.env' file placed at the root of the project

###Variables include:
- SENDGRID_API_KEY

## Development Environment
To setup this application in development run the following commands:

* `cd prisma && sudo docker-compose up -d && cd ..`
* `sudo npm install`
* `cd prisma && yarn prisma deploy && cd ..`
* `node ./src/index.js`

The notification as a service playground endpoint can now be reached at http://localhost:4000/playground and the graphql endpoint at http://localhost:4000/graphql
The prisma service can be reached at http://localhost:4466/notificatons/dev
