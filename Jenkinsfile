node {
    dir ('build') {
        stage('checkout') {
            checkout scm
        }

        stage('npm install') {
            sh 'npm install'
        }

        stage('test') {
            sh 'npm test'
        }

        stage('build') {
            sh 'npm run build'
        }
    }

    cleanWs()
}