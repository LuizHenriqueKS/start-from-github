# start-from-github
Download, install dependences and start a nodeJS project from GitHub

# How to use
[Start with a URL](#start-with-a-url)

[Start with a config json](#create-a-config-json-file)

# Create a config json file

To create config json
```batch
npx start-from-github init filename
```

- filename - (Optional) Config file name. Default value is *repository.json*

To start
```
npm start-from-github up filename
```

- filename - (Optional) Config file name. Default value is *repository.json*

# Config json file

```json
{
  "url": "github_repository_url",
  "webhookPort": "port",
  "preCommands": [
    "npm run build"
  ],
  "startCommand": "npm run launch",
  "symlink": [
    {
      "target": "destination"
    }
  ]
}
```

- webhookPort - (Optional) Port to start a http server to webhook
- preCommands - (Optional) Commands to run before to start the project
- startCommand - (Optional) Command to start the project. Default value is *npm start*
- symlink - (Optional) Symblinks for files to share with the project

*Obs: you can use webhook to download latest version of the repository and to restart it.*

*Webhook api: http://host:wehbookPort/update*

# Start with a URL

```batch
npx start-from-github github_repository_url
```

*The command used to start the project is 'npm start'.*