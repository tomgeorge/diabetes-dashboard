curl -vvv -X POST \
  https://api.dexcom.com/v2/oauth2/token \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d 'client_secret=GVe1LIjtx13vAYMi&client_id=Few6FDs8vGhUNthRYFPIS7rco4uVgA0d&code=${AUTH_CODE}&grant_type=authorization_code&redirect_uri=diabetes.tgdev.xyz/redirect'
