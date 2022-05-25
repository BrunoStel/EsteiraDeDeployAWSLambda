def utils

pipeline {
    agent any
    stages{
        stage('Load Scripts'){
          steps{
              script{
                utils = load "./scripts/utils.groovy"
              }
          }
        }
        stage('Setting pipeline'){
          steps{
              script {
                utils.dockerBuild()
              }
          }
        }
        stage('Validade Project'){
          steps{
              script {
                utils.dockerRun("yarn install");
              }
          }
        }
        // stage('SonarQube analysis') {
        //   steps{
        //     script{
        //       withSonarQubeEnv('Sonar_Local') {
        //         utils.sendSonarqube()
        //       }
        //     }
        //   }
        // }
        stage('Deploy Lambda'){
            steps{
              script{
                utils.deployLambda()
              }
            }
        }
    }
}