$containerName = "node-angular-wizard-poc"
$currentPath =  (Get-Item -Path ".\").FullName.Replace("\", "/")



#cleanup existing container instance or image
docker stop $containerName
docker rm $containerName
docker rmi $containerName

#create new image and container instance
docker build -t $containerName .

#if the mounted folder is empty, try resetting the drive permission from the docker UI
#test with : docker run --rm -v d:/_work:/data alpine ls /data
docker run -d -p 3000:80 --name $containerName --volume=${currentPath}:/usr/app $containerName

docker ps -a
docker inspect --format "{{ .ID }} - {{ .Name }} - {{ .NetworkSettings.Networks.bridge.IPAddress }}" $containerName