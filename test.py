import requests

param = "185.169.134.83"

r = requests.get("http://localhost:1337/"+param)
print(r.status_code)
resp = r.json()
if 'cached' in resp:
  print(resp['cached'])