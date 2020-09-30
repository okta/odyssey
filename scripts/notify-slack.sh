#!/bin/bash

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
            "text": ":rocket: *Preview Deployed*"
          }
        ]
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
            "text": "> '"$COMMIT_MSG"'"
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "<https://github.com/okta/odyssey/pull/'"$PULL_REQUEST_ID"'|Pull Request '"$PULL_REQUEST_ID"'> ∙ *<'"$PREVIEW_URL"'|View Deployment>*"
        }
      },
      {
        "type": "context",
        "elements": [
          {
            "type": "mrkdwn",
            "text": "'"$AUTHOR_NAME"'@'"$SHA7"'"
          },
          {
            "type": "mrkdwn",
            "text": "'"$BRANCH_NAME"'"
          }
        ]
      },
      {
        "type": "divider"
      }
    ]
  }
  ' \
  $INCOMING_WEBHOOK_URL \

