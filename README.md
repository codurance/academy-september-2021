SkillSet
========

SkillSet is an internal tool for Codurance acting as an internal CV. This will allow our consultants to be put on client-side projects that best suit them.

### Accessing SkillSet

The production environment is hosted on this domain

>https://skillset-staging.codurance.io/

The staging environment is hosted on this domain

>https://skillset.codurance.io/

The application supports the following browsers

- Chrome
- Firefox

### Testing SkillSet

For each command you may need to adjust the path to where you have stored the project. 

The alias "run checks" runs both "npm run lint && npm run test"

**Client**

> cd ./client
>
> npm install
>
> npm run checks

**Infrastructure**

> cd ./infrastructure
>
> npm install
>
> npm run checks

**Acceptance**

> cd ./acceptance
>
> npm install
>
> npm run headless-mode

###Locally Running Services

During development you may wish to run some or all of the services locally. Documented is a configuration guide.

**Local Infrastructure Configuration**

In cases where you wish to run infrastructure locally you will need to add an environment file

> touch ./infrastructure/.env
>
> echo ENV=dev > ./infrastructure/.env

**Running Serverless Locally**

Requires downloading serverless as a dependency. This can be done in a variety of ways as well as through node.
> npm install serverless -g

Serverless can then be run offline with the following command.
> serverless offline --httpPort 3004

**Running DynamoDB Locally**

Running Dynamodb locally can be done by installing DynamoDB to the host machine. This also depends on serverless

Installing serverless
> npm install -g serverless

Starting DynamoDB locally
> cd ./infrastructure
>
> npm install
>
> sls dynamodb start --migrate

### Dependencies

The application has the following dependencies

- typescript
- node
- AWS
- serverless
- dynamoDB
