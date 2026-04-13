# Group 12 - Final Project React App

A simple React application that displays the group number and team members.
Built for the Enterprise Computing CI/CD assignment using Jenkins and AWS ECS.

---

## Team Members

- Thiego Gomes Rechi
- Tyler Le
- Imaekhai Imaekhai

---

## How to Install

Make sure you have **Node.js 18+** installed. Then run:

```bash
npm install
```

---

## How to Run Locally

```bash
npm start
```

Open your browser at: http://localhost:3000

---

## How to Test

```bash
npm test
```

To run tests once without watch mode (used by Jenkins):

```bash
CI=true npm test -- --watchAll=false
```

---

## How to Build for Production

```bash
npm run build
```

The production-ready files will be placed in the `build/` folder.

---

## How to Build the Docker Image Locally

Make sure Docker Desktop is running, then:

```bash
docker build -t final-project-react .
```

Run the container locally:

```bash
docker run -p 8080:80 final-project-react
```

Open your browser at: http://localhost:8080

---

## Jenkins Environment Variables

Before running the pipeline, configure these environment variables inside the Jenkinsfile
(or as Jenkins global variables / credentials):

| Variable             | Description                                        |
|----------------------|----------------------------------------------------|
| `AWS_REGION`         | AWS region (e.g. `us-east-1`)                      |
| `AWS_ACCOUNT_ID`     | Your 12-digit AWS account ID                       |
| `ECR_REPOSITORY`     | Name of your ECR repository                        |
| `ECS_CLUSTER`        | Name of your ECS cluster                           |
| `ECS_SERVICE`        | Name of your ECS service                           |
| `ECS_TASK_DEFINITION`| Task definition family name                        |
| `IMAGE_TAG`          | Set automatically to Jenkins build number          |

The Jenkins credential ID `aws-ecr-credentials` must be configured in
**Jenkins > Manage Credentials** as an AWS credential.

---

## What Must Be Changed Before Deploying to AWS

Open these files and replace all `YOUR_*` placeholders:

### `Jenkinsfile`
- `YOUR_AWS_REGION` — e.g. `ca-central-1`
- `YOUR_AWS_ACCOUNT_ID` — your 12-digit AWS account ID
- `YOUR_ECR_REPOSITORY_NAME` — name of your ECR repo
- `YOUR_ECS_CLUSTER_NAME` — name of your ECS cluster
- `YOUR_ECS_SERVICE_NAME` — name of your ECS service
- `YOUR_TASK_DEFINITION_FAMILY` — task definition family name

### `taskdef.json`
- `YOUR_TASK_DEFINITION_FAMILY` — same family name as above
- `YOUR_AWS_ACCOUNT_ID` — your 12-digit AWS account ID
- `YOUR_ECS_TASK_EXECUTION_ROLE` — IAM role name for ECS task execution
- `YOUR_AWS_REGION` — same region as above

---

## Project Structure

```
final-project-react/
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── App.css
│   ├── App.test.js
│   └── index.js
├── .gitignore
├── Dockerfile
├── Jenkinsfile
├── README.md
├── nginx.conf
├── package.json
└── taskdef.json
```
