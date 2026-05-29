#!/bin/bash
export UI_STATS_API_URL=https://ui-stats-prod.prod.aue1k.saasure.net
export UI_STATS_TOKEN=$(ocm auth aurm)
exec "$@"
