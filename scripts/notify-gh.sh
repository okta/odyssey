#!/bin/bash

curl \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: token $GITHUB_TOKEN" \
  --data '{ "body": "🤖 The latest preview of this branch is now available here: '"$PREVIEW_URL"'" }' \
  $INCOMING_WEBHOOK_URL
