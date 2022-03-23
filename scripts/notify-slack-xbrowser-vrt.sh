#!/bin/bash

REPO_URL="https://www.github.com/okta/odyssey"

curl \
  -X POST \
  -H "Content-Type: application/json" \
  --data '
  {
    "blocks": [
      {
        "type": "context",
        "elements": [
          {
            "type": "mrkdwn",
            "text": ":mag_right: *X-Browser VRT Results*"
          },
          {
            "type": "mrkdwn",
            "text": "<'"$REPO_URL"'/commit/'"$SHA7"'|'"$SHA7"'>"
          },
          {
            "type": "mrkdwn",
            "text": "<'"$REPO_URL"'/tree/'"$BRANCH_NAME"'|'"$BRANCH_NAME"'>"
          }
        ]
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "> '"$DATE"'"
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*<'"$REPO_URL"'/actions/workflows/x-browser-vrt.yml|View Workflows>* ∙ *<https://eyes.applitools.com/app/test-results/?accountId=JRc3f1gHGUKMWePHtSqexA~~|View Applitools>*"
        }
      },
      {
        "type": "divider"
      }
    ]
  }
  ' \
  $INCOMING_WEBHOOK_URL
