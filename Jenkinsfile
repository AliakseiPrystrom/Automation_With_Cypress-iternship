pipeline {

  agent any

      environment {
          PATH = "C:\\WINDOWS\\SYSTEM32;C:\\Program Files\\nodejs"
      }

  stages {
    stage('build') {
      steps {
        bat 'npm install'
      }
    }
    stage('parallel') {
      parallel {
        // start several test jobs in parallel, and they all
        // will use Cypress Dashboard to load balance any found spec files
        stage('Run tests in parallel A') {
          steps {
            bat 'npx cypress run --record --key fd7632e2-bc86-4263-b5f8-c2097de4eee2 --parallel'
          }
        }
        stage('Run tests in parallel B') {
          steps {
            bat 'npx cypress run --record --key fd7632e2-bc86-4263-b5f8-c2097de4eee2 --parallel'
          }
        }

      }
    }
  }
}