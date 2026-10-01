#!/bin/bash

set -e

IMAGE_NAME=${IMAGE_NAME}
IMAGE_TAG=${IMAGE_TAG}
MANIFEST_FILE=${MANIFEST_FILE}

echo "Updating manifest..."

sed -i "s|image: .*|image: ${IMAGE_NAME}:${IMAGE_TAG}|g" "$MANIFEST_FILE"

echo "Updated image:"
grep image "$MANIFEST_FILE"

git config --global user.email "jenkins@example.com"
git config --global user.name "Jenkins"

git add "$MANIFEST_FILE"

git commit -m "[skip ci] Update image tag to ${IMAGE_TAG}" || echo "No changes to commit"

git push origin main

echo "Manifest pushed successfully"