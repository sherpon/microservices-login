## Environment
Create a file ``.env.yaml`` and fill the values with your localhost information.
```
MICROSERVICES_ENDPOINT:  http://localhost:8010/sherpon/us-central1/
DB_HOST: localhost
DB_PORT: 8889
DB_USER: root
DB_PASSWORD: root
```

## Deploy

### Localhost
```
functions deploy login \
  --env-vars-file .env.yaml \
  --trigger-http
```

## References
1. Using Environment Variables [https://cloud.google.com/functions/docs/env-var](https://cloud.google.com/functions/docs/env-var)
2. Cloud Functions Node.js Emulator [https://cloud.google.com/functions/docs/emulator](https://cloud.google.com/functions/docs/emulator)
3. Testing and CI/CD [https://cloud.google.com/functions/docs/bestpractices/testing](https://cloud.google.com/functions/docs/bestpractices/testing)