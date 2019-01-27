## Build Docker Image first
run this command in the directory where the **Dockerfile** is located. 
*i.e: vault-proto/Dockerfile*

    docker build -t vault .

## Then spin up a container from the image

    docker run -it --name vault-proto -v ~/github/vault-proto:/vault-proto -p 8080:8080 -p 3000:3000 vault

  
**Ctrl + C** to stop the container or `docker stop vault-proto`  
  
## to start the container  

    docker start -i vault-proto
    
##  use docker-compose to orchestrate multiple containers
    docker-compose up

