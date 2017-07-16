node('nodejs') {
    def artifactName

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

    if (env.BRANCH_NAME == 'master') {
        dir ('build') {
            def version = (sh(returnStdout: true, script: 'git describe --tags')).trim()
            artifactName = "coding-challenge-${version}.tar.gz"
            sh "tar -czvf ../${artifactName} ."
        }
    }

    if (artifactName) {
        archiveArtifacts artifactName
    }

    cleanWs()
}