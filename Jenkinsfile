pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                sh 'git pull origin master'
            }
        }
        stage('Prepare') {
            steps {
                sh 'cp /opt/hhgram/llm-js/.env /var/lib/jenkins/workspace/hhgram-llm-js/'
            }
        }
        stage('Run docker-compose') {
            steps {
                script {
                    sh 'docker-compose stop'
                    sh 'docker-compose up --build -d'
                }
            }
        }
    }
    post {
        always {
            echo 'Pipeline finished'
        }
    }
}
