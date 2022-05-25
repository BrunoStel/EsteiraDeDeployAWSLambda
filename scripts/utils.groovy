def dockerBuild(){
  bat "docker build -t digitalbank:pipeline -f ./Dockerfile ./"
}

def dockerRun(String script){
  bat """docker run --net devops --rm -v ${pwd()}:/app digitalbank:pipeline /bin/bash -c "$script" """
}

def sendSonarqube(){
  dockerRun("yarn install sonar-scanner && npx sonar-scanner sonar.host.url=${env.SONAR_HOST_URL}")
}

def setAWSCredentials(){
  dockerRun("aws configure set aws_access_key_id AKIAXX42ADRROSCS2KAE && \
            aws configure set aws_secret_access_key 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 && \
            aws configure set default_region_name us-east-2")
}

def deployLambda(){
  dockerRun("yarn deploy")
}

return this