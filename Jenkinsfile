pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    environment {
        NODE_ENV = 'test'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'node --version'
                sh 'npm --version'
                sh 'npm ci'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Unit Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Package Artifact') {
            steps {
                sh 'npm run package'
                archiveArtifacts(
                    artifacts: 'dist/*.tar.gz',
                    fingerprint: true,
                    onlyIfSuccessful: true
                )
            }
        }

        stage('Deploy to Test Environment') {
            steps {
                sh '''
                    rm -rf deploy/test-environment
                    mkdir -p deploy/test-environment
                    cp dist/jenkins-nodejs-project.tar.gz deploy/test-environment/
                    echo "Application deployed to simulated test environment"
                    ls -lh deploy/test-environment/
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully.'
        }

        failure {
            echo 'Pipeline failed. Review the failed stage and console log.'
        }

        always {
            deleteDir()
        }
    }
}
