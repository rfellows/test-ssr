## generate a png from a viz
* Have a corvana ui service up and running


```
npm install


npx babel-node src/getViz.js --vizId=$VIZ_ID --user=$EMAIL --password=$PASSWORD
```

### Supported arguments
* vizId - required - vizId to render
* user - required - user to log in as
* password - required - password for the user
* baseUrl - optional, defaults to `http://localhost:9000`
* devMode - optional, defaults to false. If set (`--devMode`), it will not run headless.
