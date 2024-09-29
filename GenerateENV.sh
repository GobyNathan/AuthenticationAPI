#!/bin/bash

touch .env

read -p "Enter your MONGODB_URI: " MONGODB_URI

sed -i '/^MONGODB_URI=/d' .env

echo "MONGODB_URI=$MONGODB_URI" >> .env

# Generate random alphanumeric secrets
ACCESS_TOKEN_SECRET=$(openssl rand -base64 48 | tr -dc 'a-zA-Z0-9' | head -c 64)
REFRESH_TOKEN_SECRET=$(openssl rand -base64 48 | tr -dc 'a-zA-Z0-9' | head -c 64)

# Ensure the secrets are exactly 64 characters long
while [ ${#ACCESS_TOKEN_SECRET} -lt 64 ]; do
  ACCESS_TOKEN_SECRET+=$(openssl rand -base64 48 | tr -dc 'a-zA-Z0-9' | head -c $((64 - ${#ACCESS_TOKEN_SECRET})))
done

while [ ${#REFRESH_TOKEN_SECRET} -lt 64 ]; do
  REFRESH_TOKEN_SECRET+=$(openssl rand -base64 48 | tr -dc 'a-zA-Z0-9' | head -c $((64 - ${#REFRESH_TOKEN_SECRET})))
done

# Remove any existing ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET entries
sed -i '/^ACCESS_TOKEN_SECRET=/d' .env
sed -i '/^REFRESH_TOKEN_SECRET=/d' .env

# Add the new secrets to the .env file
echo "ACCESS_TOKEN_SECRET=$ACCESS_TOKEN_SECRET" >> .env
echo "REFRESH_TOKEN_SECRET=$REFRESH_TOKEN_SECRET" >> .env