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
            "text": ":white_check_mark: *Preview Deployed*"
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
        "type": "actions",
        "elements": [
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "Pull Request #'"$PULL_REQUEST_ID"'",
              "emoji": true
            },
            "url": "https://github.com/okta/odyssey/pull/'"$PULL_REQUEST_ID"'"
          },
          {
            "type": "button",
            "style": "primary",
            "text": {
              "type": "plain_text",
              "text": "Visit Preview",
              "emoji": true
            },
            "url": "'"$PREVIEW_URL"'"
          }
        ]
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

