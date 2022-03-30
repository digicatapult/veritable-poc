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
echo -en "\n\nWaitingForHolder"; RES=""; while [[ -z "$RES" ]]; do sleep .1; RES=$(curl -sf localhost:8031/health 2>&1); echo -n .; done
echo -en "\n\nWaitingForVerifier"; RES=""; while [[ -z "$RES" ]]; do sleep .1; RES=$(curl -sf localhost:8041/status 2>&1); echo -n .; done
echo -en "\n\nWaitingForRegulator"; RES=""; while [[ -z "$RES" ]]; do sleep .1; RES=$(curl -sf localhost:8051/status 2>&1); echo -n .; done
echo -e "\n\nDONE"

# START REACT
echo "Starting React clients..."
<<<<<<< HEAD:start.sh
echo -en "\n\nWaitingForRegulatorReact"; RES=""; while [[ -z "$RES" ]]; do sleep .1; RES=$(curl -sf localhost:3004 2>&1); echo -n .; done
echo -en "\n\nWaitingForVerifierReact"; RES=""; while [[ -z "$RES" ]]; do sleep .1; RES=$(curl -sf localhost:3003 2>&1); echo -n .; done
=======
>>>>>>> main:scripts/start.sh
echo -en "\n\nWaitingForIssuerReact"; RES=""; while [[ -z "$RES" ]]; do sleep .1; RES=$(curl -sf localhost:3002 2>&1); echo -n .; done
echo -en "\n\nWaitingForHolderReact"; RES=""; while [[ -z "$RES" ]]; do sleep .1; RES=$(curl -sf localhost:3001 2>&1); echo -n .; done
echo -en "\n\nWaitingForVerifierReact"; RES=""; while [[ -z "$RES" ]]; do sleep .1; RES=$(curl -sf localhost:3003 2>&1); echo -n .; done
echo -en "\n\nWaitingForAuthorityReact"; RES=""; while [[ -z "$RES" ]]; do sleep .1; RES=$(curl -sf localhost:3004 2>&1); echo -n .; done

# ABOUT LOGS
echo -e "\n\nAll the backend and frontend logs are ready to be viewed."
echo -e "\n\nDocker backend logs can be viewed with:"
echo -e "docker-compose -f ./docker/docker-compose.yaml -p veritable-demo logs"
