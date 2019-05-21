## Deploy

### Localhost
Create a file ``./env/.env.json`` and replace the values with your localhost information.
```json
{
  "MICROSERVICES_ENDPOINT":  "http://localhost:8010/sherpon-staging/us-central1/",
  "MYSQL_DB_HOST": "localhost",
  "MYSQL_DB_PORT": 8889,
  "MYSQL_DB_USER": "root",
  "MYSQL_DB_PASSWORD": "root"
}
```

Provide a Project ID as shown below before starting the Node.js Emulator:
```
functions config set projectId YOUR_PROJECT_ID
```

Starting and stopping the Node.js Emulator
Before you can deploy a function, you need to start the Node.js Emulator:
```
functions start
```

You stop the Node.js Emulator by calling stop:
```
functions stop
```

If the Node.js Emulator fails to stop for any reason, you can use the kill command to forcibly terminate the underlying process:
```
functions kill
```

Deploying functions to the Node.js Emulator uses the same syntax as the gcloud command-line tool.
To deploy the HTTP function to the Node.js Emulator:
```
functions deploy login \
  --env-vars-file ./env/.env.yaml \
  --trigger-http
```
### Staging
Create a file ``/env/.env.yaml`` and replace the values with your staging information.
```yaml
MICROSERVICES_ENDPOINT:  http://localhost:8010/sherpon-staging/us-central1/
MYSQL_DB_HOST: localhost
MYSQL_DB_PORT: 8889
MYSQL_DB_USER: root
MYSQL_DB_PASSWORD: root
```

```
gcloud functions deploy login \
  --env-vars-file ./env/.env.yaml \
  --trigger-http
```

## References
1. Using Environment Variables [https://cloud.google.com/functions/docs/env-var](https://cloud.google.com/functions/docs/env-var)
2. Cloud Functions Node.js Emulator [https://cloud.google.com/functions/docs/emulator](https://cloud.google.com/functions/docs/emulator)
3. Testing and CI/CD [https://cloud.google.com/functions/docs/bestpractices/testing](https://cloud.google.com/functions/docs/bestpractices/testing)
4. Building, testing, and deploying artifacts [https://cloud.google.com/cloud-build/docs/configuring-builds/build-test-deploy-artifacts](https://cloud.google.com/cloud-build/docs/configuring-builds/build-test-deploy-artifacts)