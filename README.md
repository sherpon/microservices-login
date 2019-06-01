## Deploy

### Localhost
Create a directory `env` in the same level of the root directory.

Download the **serviceAccountKey** from Firebase dashboard and save it in the `./env` directory.

Create a file ``./env/.env.json`` and replace the values with your localhost information.
```json
{
  "SHERPON_ENV": "DEVELOPMENT",
  "FIREBASE_SERVICE_ACCOUNT": "./env/serviceAccountKey.development.json",
  "MICROSERVICES_ENDPOINT":  "http://localhost:8010/sherpon-staging/us-central1/",
  "ACCESS_CONTROL_ALLOW_ORIGIN":"http://0.0.0.0:4000",
  "MYSQL_HOST": "localhost",
  "MYSQL_PORT": 8889,
  "MYSQL_USER": "root",
  "MYSQL_PASSWORD": "root",
  "MYSQL_DATABASE": "sherpon"
}
```

Provide a Project ID as shown below before starting the Node.js Emulator: (if you are using nvm, maybe you need to use `sudo` command)
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
  --trigger-http
```

### Staging
Create a file ``/env/.env.staging.yaml`` and replace the values with your staging information.
```yaml
SHERPON_ENV: STAGING
MICROSERVICES_ENDPOINT: https://us-central1-sherpon-staging.cloudfunctions.net/
ACCESS_CONTROL_ALLOW_ORIGIN: https://staging.admin.sherpon.com
DB_HOST: localhost
DB_PORT: 8889
DB_USER: root
DB_PASSWORD: root
MYSQL_DATABASE: sherpon
```

```
gcloud functions deploy login \
  --env-vars-file ./env/.env.yaml \
  --trigger-http
```

## Debugger
Run the Function Emulator like localhost deploy. Then execute the follow line.
```
functions deploy login \
  --trigger-http \
  --timeout=50000
```

```
functions inspect login
```

```
functions logs read
```


## References
1. Using Environment Variables [https://cloud.google.com/functions/docs/env-var](https://cloud.google.com/functions/docs/env-var)
2. Cloud Functions Node.js Emulator [https://cloud.google.com/functions/docs/emulator](https://cloud.google.com/functions/docs/emulator)
3. Testing and CI/CD [https://cloud.google.com/functions/docs/bestpractices/testing](https://cloud.google.com/functions/docs/bestpractices/testing)
4. Building, testing, and deploying artifacts [https://cloud.google.com/cloud-build/docs/configuring-builds/build-test-deploy-artifacts](https://cloud.google.com/cloud-build/docs/configuring-builds/build-test-deploy-artifacts)