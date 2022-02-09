#!/bin/bash

echo "START NPM INSTALL"

npm i

echo "STARTING 4 STEPS: CONN_C2A; CREATE_CREDENTIALS_SET; CONN_AI2A; PRES-EX-ID-AND-VERIFY-PRES"

# StartConsortiq2aliceConnectionStep

echo -e "\nSTART_STEP_CONN_C2A --- \n"

INVITATION_FULL=$(node 1a-consortiq-create-invitation consortiq2alice|jq -c)
INVITATION=$(echo $INVITATION_FULL|jq -c .invitation)
CONNECTION_ALICE2CONSORTIQ=$(node 1b-alice-receive-invitation ${INVITATION} alice2consortiq)
CONNECTION_ID=$(echo $INVITATION_FULL|jq -c .connection_id)
echo "Echo-consortiq2alice-INVITATION_FULL"
echo $INVITATION_FULL|jq -c
echo "Echo-consortiq2alice-INVITATION"
echo $INVITATION|jq -c
echo "Echo-CONNECTION_ID"
echo $CONNECTION_ID|jq -c
echo "DONE"

echo -e "\nEND_STEP_CONN_C2A --- \n--------------------- \n"

# EndConsortiq2aliceConnectionStep



# StartCreateSetOfCredentialStep

echo -e "\nSTART_CREATE_CREDENTIALS_SET --- \n"

SCHEMA="$(node 3a-consortiq-schemas)"
SCHEMA_ID=$(echo $SCHEMA|jq -c .schema_id)
SCHEMA_DEF_TAG_NAME=$(echo $SCHEMA|jq -c .schema.name)
SCHEMA_DEF_TAG_PREFIX="consortiq.agent"
DID=$(node 3b-consortiq-wallet-did-public|jq .result.did)

echo "Echo-SCHEMA"
echo $SCHEMA|jq -c
echo "Echo-SCHEMA_ID"
echo $SCHEMA_ID|jq -c
echo "Echo-SCHEMA_DEF_TAG_NAME"
echo $SCHEMA_DEF_TAG_NAME|jq -c
echo "Echo-SCHEMA_DEF_TAG_PREFIX"
echo ['"'$SCHEMA_DEF_TAG_PREFIX'"']|jq -c .[0]
echo "Echo-DID"
echo $DID|jq -c
echo "PREPARING_CREDENTIAL_DEFINITION"

CREDENTIAL_DEFINITION=$(node 3c-consortiq-credential-definitions "$SCHEMA_ID" "$SCHEMA_DEF_TAG_NAME" $SCHEMA_DEF_TAG_PREFIX $DID)
CREDENTIAL_DEFINITION_ID=$(echo $CREDENTIAL_DEFINITION|jq .credential_definition_id)

echo "Echo-CREDENTIAL_DEFINITION"
echo $CREDENTIAL_DEFINITION|jq -c
echo "Echo-CREDENTIAL_DEFINITION_ID"
echo $CREDENTIAL_DEFINITION_ID|jq -c
echo "PREPARING_FINAL_STEP"

CREDENTIAL_SEND_OFFER_RESPONSE=$(node 3d-consortiq-issue-credential-send-offer "$CONNECTION_ID" "$CREDENTIAL_DEFINITION_ID"|jq -c .by_format.cred_proposal)
CREDENTIAL_DEFINITION_ID_FROM_RESPONSE=$(echo $CREDENTIAL_SEND_OFFER_RESPONSE|jq -c .indy.cred_def_id)
CREDENTIALS=$(node 3e-alice-credentials|jq -c .results[0])
while [[ ${#CREDENTIALS} -eq 4 ]]; do sleep .1; echo WAIT; CREDENTIALS=$(node 3e-alice-credentials|jq -c .results[0]); echo WAIT; done

echo "Echo-CREDENTIAL_SEND_OFFER_RESPONSE"
echo $CREDENTIAL_SEND_OFFER_RESPONSE|jq -c
echo "Echo-CREDENTIAL_DEFINITION_ID_FROM_RESPONSE"
echo $CREDENTIAL_DEFINITION_ID_FROM_RESPONSE|jq -c
echo "Echo-CREDENTIALS"
echo $CREDENTIALS|jq -c
echo "DONE"

echo -e "\nEND_CREATE_CREDENTIALS_SET --- \n------------------------------ \n"

# EndCreateSetOfCredentialStep



# StartAirops2aliceConnectionStep

echo -e "\nSTART_STEP_CONN_AI2A --- \n"

INVITATION_AIROPS_FULL=$(node 2a-airops-create-invitation airops2alice|jq -c)
INVITATION_AIROPS=$(echo $INVITATION_AIROPS_FULL|jq -c .invitation)
CONNECTION_ALICE2AIROPS=$(node 2b-alice-receive-invitation ${INVITATION_AIROPS} alice2airops)
INVITATION_AIROPS2ALICE_CONNECTION_ID=$(echo $INVITATION_AIROPS_FULL|jq -c .connection_id)

echo "Echo-INVITATION_AIROPS_FULL"
echo $INVITATION_AIROPS_FULL|jq -c
echo "Echo-INVITATION_AIROPS"
echo $INVITATION_AIROPS|jq -c
echo "Echo-CONNECTION_ALICE2AIROPS"
echo $CONNECTION_ALICE2AIROPS|jq -c
echo "Echo-INVITATION_AIROPS2ALICE_CONNECTION_ID"
echo $INVITATION_AIROPS2ALICE_CONNECTION_ID|jq -c
echo "DONE"

echo -e "\nEND_STEP_CONN_AI2A --- \n---------------------- \n"

# EndAirops2aliceConnectionStep



# StartPresExIdAndVerifyPres

echo -e "\nSTART_PRES-EX-ID-AND-VERIFY-PRES --- \n"

PRES_EX_ID=$(node 4a-present-proof-send-request "$INVITATION_AIROPS2ALICE_CONNECTION_ID"|jq -c .pres_ex_id)
echo "Echo-PRES_EX_ID"
echo $PRES_EX_ID|jq -c
echo "PREPARING_FINAL_STEP"

PRES_PROOF_STATE=$(node 4d-airops-present-proof-records|jq .results[0].state|cut -c2-|rev|cut -c2-|rev)
echo "Echo-PRES_PROOF_STATE"
echo '"'$PRES_PROOF_STATE'"'|jq

while [[ "$PRES_PROOF_STATE" == "request-sent" ]]; do sleep .2; echo WAIT; PRES_PROOF_STATE=$(node 4d-airops-present-proof-records|jq .results[0].state|cut -c2-|rev|cut -c2-|rev); echo WAIT; done

PRES_VERIFY_RESULTS__KEY_VERIFIED=$(node 4b-present-proof-records-verify-presentation "$PRES_EX_ID"|jq -c .verified)
echo "Echo-PRES_PROOF_STATE"
echo '"'$PRES_PROOF_STATE'"'|jq
echo "Echo-PRES_VERIFY_RESULTS__KEY_VERIFIED"
echo $PRES_VERIFY_RESULTS__KEY_VERIFIED|jq -c

while [[ $PRES_PROOF_STATE == "presentation-received" ]]; do sleep .1; echo WAIT; PRES_PROOF_STATE=$(node 4d-airops-present-proof-records|jq .results[0].state|cut -c2-|rev|cut -c2-|rev); echo WAIT; done

echo "Echo-PRES_PROOF_STATE"
echo '"'$PRES_PROOF_STATE'"'|jq

echo "DONE"

echo -e "\nEND_PRES-EX-ID-AND-VERIFY-PRES --- \n---------------------------------- \n"

# EndPresExIdAndVerifyPres
