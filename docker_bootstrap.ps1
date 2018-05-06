$containerName = "node-angular-wizard-poc"
$currentPath =  (Get-Item -Path ".\").FullName.Replace("\", "/")

#cleanup existing container instance or image
docker stop $containerName
docker rm $containerName
docker rmi $containerName

#create new image and container instance
docker build -t $containerName .
docker run -d -p 3000:80 --name $containerName --volume=$currentPath/:/usr/app $containerName

docker ps -a
docker inspect --format "{{ .ID }} - {{ .Name }} - {{ .NetworkSettings.Networks.bridge.IPAddress }}" $containerName