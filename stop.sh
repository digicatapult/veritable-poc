cd veritable-aries-cloudagent/demo/
docker stop consortiq alice airops ; docker rm -f consortiq alice airops
sleep 1
cd ../../
cd von-network/
./manage down
sleep 1
cd ../
sleep 0.1
kill -9 $(ps | grep node | grep react | cut -d ' ' -f1)
echo DONE
