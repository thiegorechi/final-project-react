pipeline {
    agent any

    environment {
        AWS_REGION      = 'us-east-2'
        AWS_ACCOUNT_ID  = '108703419651'
        ECR_REPOSITORY  = 'final-project-react'
        IMAGE_TAG       = 'latest'
        ECR_IMAGE       = '108703419651.dkr.ecr.us-east-2.amazonaws.com/final-project-react:latest'
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
                bat 'docker build -t final-project-react .'
            }
        }

        stage('Push Docker Image to AWS ECR') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-ecr-credentials'
                ]]) {
                    bat '''
                    aws ecr get-login-password --region %AWS_REGION% > ecr-password.txt
                    for /f %%i in (ecr-password.txt) do docker login --username AWS --password %%i %AWS_ACCOUNT_ID%.dkr.ecr.%AWS_REGION%.amazonaws.com
                    docker tag final-project-react:latest %ECR_IMAGE%
                    docker push %ECR_IMAGE%
                    '''
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