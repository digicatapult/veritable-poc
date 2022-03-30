docker-compose -f ../docker/docker-compose.yaml -p veritable-demo down -v
sleep 1
cd ./von-network
./manage down
sleep 1
cd ../
sleep 0.1
kill -9 $(ps | grep node | grep react | cut -d ' ' -f1)
echo DONE
