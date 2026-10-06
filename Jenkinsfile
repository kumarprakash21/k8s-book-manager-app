@Library("shared") _
pipeline {
    agent any
   
    environment {
        DOCKERHUB_USER = 'prakashgautam1998'
        IMAGE_NAME = 'book-app'
        IMAGE_TAG = "${BUILD_NUMBER}"
        MANIFEST_FILE = 'k8s/deployment.yml'
        }

    stages {
        stage('Code') {
            steps {
                script{
                    clone('https://github.com/kumarprakash21/k8s-book-manager-app.git','main')
                }
            }
        }
        stage('Scan via Trivy'){
            steps {
                echo "Scan started by Trivy"
                sh 'trivy fs .'
                echo "Scan completed successfully"
            }
        }
        stage('Build') {
            steps {
                echo 'This is building the docker image'
                script{
                    docker_build(DOCKERHUB_USER,IMAGE_NAME,IMAGE_TAG)
                }
            }
        }
        stage('Scan Image via Trivy') {
            steps {
                sh '''
                trivy image \
                --severity HIGH,CRITICAL \
                --exit-code 1 \
                ${DOCKERHUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}
                '''
            }
        }
        stage('Push') {
            steps { 
                script{
                    docker_push(Docker_Hub_user,IMAGE_NAME,IMAGE_TAG)
                }
                
            }
        }
    }
}
