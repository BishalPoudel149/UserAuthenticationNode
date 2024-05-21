import jwt

# Received token
token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJpc2hhbHBvdWRlbCIsInVzZXJJRCI6OTMwMjUsImV4cCI6MTcxNjI5MzcwOX0.MFDOR7-qDawtdL5Cze9hqr_dwDhtEjhKh7OYa6EtkslXy0eLbC32cPFg5eQa1C5gKm6rISTvyU5x3HMDk_CA0g"

# Secret key (same as used for generation)
secret = "dlkjhdf2#3h&#*#iudhd90uddlll"

try:
    decoded = jwt.decode(token, secret, algorithms=['HS512'])
    print(decoded)
except jwt.exceptions.JWTError as e:
    print("Invalid JWT:", e)