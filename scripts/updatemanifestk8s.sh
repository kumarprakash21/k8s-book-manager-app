#!/bin/bash

set -e

IMAGE_NAME=${IMAGE_NAME}
IMAGE_TAG=${IMAGE_TAG}
MANIFEST_FILE=${MANIFEST_FILE}

echo "Updating manifest..."

sed -i "s|image: .*|image: ${IMAGE_NAME}:${IMAGE_TAG}|g" "$MANIFEST_FILE"

echo "Updated image:"
grep image "$MANIFEST_FILE"

if git diff --quiet -- "$MANIFEST_FILE"; then
    echo "No image tag change detected; nothing to commit or push."
    exit 0
fi

git config --global user.email "jenkins@example.com"
git config --global user.name "Jenkins"

git add "$MANIFEST_FILE"

# Keep the generated commit out of CI systems that honor either convention.
git commit -m "chore: update image tag to ${IMAGE_TAG} [skip ci] [ci skip]"

git push origin main

echo "Manifest pushed successfullly"

