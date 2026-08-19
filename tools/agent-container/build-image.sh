#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
IMAGE_NAME="odyssey-implementer-agent"

CA_CERT_SOURCE="${AWS_CA_BUNDLE:-${NODE_EXTRA_CA_CERTS:-$HOME/.local/prisma_certificates.pem}}"

if [ ! -f "${CA_CERT_SOURCE}" ]; then
  echo "error: corporate CA cert not found at ${CA_CERT_SOURCE}" >&2
  echo "set AWS_CA_BUNDLE or NODE_EXTRA_CA_CERTS to its path" >&2
  exit 1
fi

CA_CERT_DEST="${SCRIPT_DIR}/corporate-ca.pem"
cp "${CA_CERT_SOURCE}" "${CA_CERT_DEST}"
trap 'rm -f "${CA_CERT_DEST}"' EXIT

docker build --build-arg CA_CERT_FILE=corporate-ca.pem -t "${IMAGE_NAME}" "${SCRIPT_DIR}"
