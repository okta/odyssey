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
          },
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
          "text": "<https://github.com/okta/odyssey/pull/'"$PULL_REQUEST_ID"'|PR #'"$PULL_REQUEST_ID"'> ∙ *<'"$URL_STORYBOOK"'|View Storybook>*"
        }
      },
      {
        "type": "divider"
      }
    ]
  }
  ' \
  $INCOMING_WEBHOOK_URL
