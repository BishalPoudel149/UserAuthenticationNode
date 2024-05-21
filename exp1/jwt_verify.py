import jwt

# Received token
token = "eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJpc2hhbHBvdWRlbCIsInVzZXJJRCI6MTcwMSwiZXhwIjoxNzE2MjkzNTEyfQ.LzNWIvoNuuzbQRSJ8mhhb4G8fZtYuDZy4MS_uyQeuQ5kNt-8ma5ELv3Ea5YhHN3C"

# Secret key (same as used for generation)
secret = "dlkjhdf2#3h&#*#iudhd90uddlll"

try:
    decoded = jwt.decode(token, secret, algorithms=['HS384'])
    print(decoded)
except jwt.exceptions.JWTError as e:
    print("Invalid JWT:", e)