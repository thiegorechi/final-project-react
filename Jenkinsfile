pipeline {
    agent any

    environment {
        AWS_REGION          = 'YOUR_AWS_REGION'
        AWS_ACCOUNT_ID      = 'YOUR_AWS_ACCOUNT_ID'
        ECR_REPOSITORY      = 'YOUR_ECR_REPOSITORY_NAME'
        ECS_CLUSTER         = 'YOUR_ECS_CLUSTER_NAME'
        ECS_SERVICE         = 'YOUR_ECS_SERVICE_NAME'
        ECS_TASK_DEFINITION = 'YOUR_TASK_DEFINITION_FAMILY'
        IMAGE_TAG           = "${env.BUILD_NUMBER}"
        ECR_IMAGE           = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}:${IMAGE_TAG}"
    }

    stages {

        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Test') {
            steps {
                bat 'set CI=true&& npm test -- --watchAll=false --passWithNoTests'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat "docker build -t ${ECR_REPOSITORY}:${IMAGE_TAG} ."
            }
        }

        stage('Push Docker Image to AWS ECR') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-ecr-credentials']]) {
                    bat """
                        aws ecr get-login-password --region ${AWS_REGION} > ecr-login.txt
                        for /f %%i in (ecr-login.txt) do docker login --username AWS --password %%i ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
                        docker tag ${ECR_REPOSITORY}:${IMAGE_TAG} ${ECR_IMAGE}
                        docker push ${ECR_IMAGE}
                    """
                }
            }
        }

        stage('Deploy to AWS') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-ecr-credentials']]) {
                    bat """
                        powershell -Command "(Get-Content taskdef.json) -replace 'IMAGE_PLACEHOLDER','${ECR_IMAGE}' | Set-Content taskdef-temp.json"
                        for /f %%i in ('aws ecs register-task-definition --region ${AWS_REGION} --cli-input-json file://taskdef-temp.json --query taskDefinition.taskDefinitionArn --output text') do set TASK_DEF_ARN=%%i
                        aws ecs update-service --region ${AWS_REGION} --cluster ${ECS_CLUSTER} --service ${ECS_SERVICE} --task-definition %TASK_DEF_ARN% --force-new-deployment
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed. Check the logs above.'
        }
    }
}