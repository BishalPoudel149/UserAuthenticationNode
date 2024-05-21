import jwt
import time

# Secret key (replace with your own)
secret_key = "dlkjhdf2#3h&#*#iudhd90uddlll"

# Payload
payload = {
    "username": "bishalpoudel",
    "userID": 1701,
    "exp": int(time.time()) + 60 * 60  # Add expiration time (1 hour)
}

# Generate JWT with HS384 algorithm
token = jwt.encode(payload, secret_key, algorithm='HS384')

print(token)