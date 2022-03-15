#!/bin/bash

# START VON
cd von-network/
VONIMAGE=`docker images | grep von-network`
[[ ! -z "$VONIMAGE" ]] || ./manage build
./manage start
cd ../

# WAIT
echo -en "\n\nWaitingForVonWebserver"; RES=""; while [[ -z "$RES" ]]; do sleep .1; RES=$(curl -sf localhost:9000/genesis 2>&1); echo -n .; done

# START F2P ARIES CLOUD AGENT
docker-compose -f ./docker/docker-compose.yaml -p veritable-demo up --build -d
echo -en "\n\nWaitingForIssuer"; RES=""; while [[ -z "$RES" ]]; do sleep .1; RES=$(curl -sf localhost:8021/status 2>&1); echo -n .; done
echo -en "\n\nWaitingForLicensee"; RES=""; while [[ -z "$RES" ]]; do sleep .1; RES=$(curl -sf localhost:8031/status 2>&1); echo -n .; done
echo -en "\n\nWaitingForVerifier"; RES=""; while [[ -z "$RES" ]]; do sleep .1; RES=$(curl -sf localhost:8041/status 2>&1); echo -n .; done
echo -en "\n\nWaitingForAuthority"; RES=""; while [[ -z "$RES" ]]; do sleep .1; RES=$(curl -sf localhost:8051/status 2>&1); echo -n .; done
echo -en "\n\nWaitingForAuthorityReact"; RES=""; while [[ -z "$RES" ]]; do sleep .1; RES=$(curl -sf localhost:3004 2>&1); echo -n .; done
echo -e "\n\nDONE"

# START REACT
cd veritable-react-gui/
[ ! -d "./node_modules/" ] && npm install
nohup npm start > /tmp/react.log 2> /tmp/react.log &
echo -en "\n\nWaitingForReactJsGui"; RES=""; while [[ -z "$RES" ]]; do sleep .1; RES=$(curl -sf localhost:3000 2>&1); echo -n .; done
cd ../
echo -e "\n\nDONE"
echo -e "\nYou can now view the GUI in the browser."

# ABOUT LOGS
echo -e "\n\nAll the backend and frontend logs are ready to be viewed."
echo -e "\n\nDocker backend logs can be viewed with:"
echo -e "docker logs CONTAINER_NAME (von_node1_1, ..2, ..3, ..4, von_webserver_1, consortiq, alice OR airops)"
echo -e "\nFrontend logs can be viewed with:"
echo -e "tail /tmp/react.log \n"
