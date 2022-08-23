#! /bin/bash

cd ~/Projects/Joinus
git pull
docker-compose down
docker rmi mraddict063/joinus
docker-compose up -d
