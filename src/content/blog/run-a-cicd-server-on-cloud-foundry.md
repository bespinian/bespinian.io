---
title: Run a CI/CD Server on Cloud Foundry
author: Lena Fuhrimann
date: 2016-02-16
tags: ["ci-cd", "cloud-foundry", "strider", "automation", "deployment"]
excerpt:
  "Deploy Strider, an open-source CI/CD server, on Cloud Foundry to
  automatically test, build, and deploy your applications on every git push."
image: ../../assets/blog/pipes.jpg
---

Pushing Apps to Cloud Foundry is as easy as it gets, thanks to the `cf push`
command. However, it is still tedious to push your code after every change you
make, just to see if it still runs in the cloud. That's where a CI/CD server is
useful. It tests, builds and deploys your code every time you `git push` to any
Git repo.

[Strider](https://github.com/strider-cd/strider) is an open-source CI/CD server
based on [Node.js](https://nodejs.org) and [MongoDB](https://mongodb.org). It
integrates well with Git and its hosted solutions (e.g.,
[GitHub](https://github.com), [Bitbucket](https://bitbucket.org) or
[GitLab](https://gitlab.com)) and features a number of plugins to suit almost
all your needs. The idea is, to have Strider "watch" your Git repos and, on
change, go through the following stages:

1. Set up an environment to test your code
2. Run your tests
3. Build/compile your code upon successful tests
4. Deploy your code upon successful build/compilation

This is ideal to be used with Cloud Foundry since it can ensure a continuous
integration and deployment process in a modern and cloud-ready way. Upon pushing
new code, you can always be sure that it will be tested and (if on the right
branch) deployed to the respective environment. And the best part: It all runs
on Cloud Foundry. So, you will be deploying from Cloud Foundry to Cloud Foundry.

In case you are not using Cloud Foundry yet, you can sign up at
[https://developer.swisscom.com](https://developer.swisscom.com).

## Get Strider Running In The Cloud

However, we need to make a few adjustments to the code of Strider for it to be
ready to run on Cloud Foundry. So fork and clone the
[Strider repo](https://github.com/strider-cd/strider), open it in your favorite
text editor and follow these simple steps:

### 1. Install cfenv

Install the `cfenv` npm package using

```shell
$ npm install cfenv --save
```

This package allows you to conveniently access the Cloud Foundry services you
bind to your application.

### 2. Connect to CF Services

Open `bin/strider` and insert the following code at the top of the file:

```javascript
const cfEnv = require("cfenv");
const appEnv = cfEnv.getAppEnv();

process.env.SERVER_NAME = appEnv.url;

if (process.env.VCAP_SERVICES) {
  process.env.DB_URI = appEnv.getService("strider-db").credentials.uri;
  process.env.SMTP_HOST = appEnv.getService("mailgun").credentials.hostname;
  process.env.SMTP_USER = appEnv.getService("mailgun").credentials.username;
  process.env.SMTP_PASS = appEnv.getService("mailgun").credentials.password;
}
```

This will ensure that Strider connects to a Cloud Foundry service called
`strider-db`. In our case, this needs to be a MongoDB for Strider to work with.
Furthermore, it connects to a Cloud Foundry service called `mailgun` which we
will have to create later and which will allow us to send emails from Strider.

### Create MongoDB

Create a MongoDB service in Cloud Foundry with the command

```shell
$ cf create-service mongodb small strider-db
```

(may differ depending on your Cloud Foundry provider) in the space where you
want to deploy your Strider instance to.

### Create Email Server

Now it's time to create an email server, so Strider can send out invitations or
notifications via email. Visit the [Mailgun website](https://www.mailgun.com)
and create an account. This will provide you with a sandbox domain and some
credentials:

![Mailgun Credentials](/images/mailgun.png)

Now we'll have to insert these credentials into Cloud Foundry using a User
Provided Service. You can do so by running the command

```shell
$ cf create-user-provided-service mailgun -p '{ "hostname": "smtp.mailgun.org", "username": "<your-mailgun-smtp-login>", "password": "<your-mailgun-password>" }'
```

This will create a service in our space which exposes your Mailgun credentials
via environment variables to any app bound to it.

### Add manifest.yml

Your app is now ready to run locally (using `npm start`). To push it to the
cloud, create a `manifest.yml` file in the root folder of Strider and insert the
following content:

```yaml
applications:
  - name: strider
    host: strider
    memory: 2048MB
    instances: 1
    buildpacks:
      - https://github.com/cloudfoundry/buildpack-nodejs.git
    services:
      - strider-db
      - mailgun
    env:
      NODE_ENV: production
```

This will provide the setup instructions for Cloud Foundry to properly run your
application. It creates an app with 2048 MB of memory, so charges may apply
(depending on your provider).

### cf push

That's it. You are now ready to run your Strider instance in Cloud Foundry. Just
run `cf push` to deploy it in the cloud.

It's possible that the route you are trying to use is already taken by another
app. If so, simply change the `host` property in `manifest.yml` to something
which isn't taken yet.

## Create Your Admin User

Now that our app is running in the cloud, we just have one problem left: We
cannot access it... With Strider, you usually use its CLI to create a first
admin user. Unfortunately, though, it is not easy for us to access said command
line interface from within the app container. So, we will insert our admin user
directly into the database using the Swisscom
[Service Connector](http://docs.developer.swisscom.com/service-connector/index.html)
plugin. Visit the link and follow the instructions to install it.

To connect to your MongoDB and insert the admin user, we'll need to create a set
of credentials to manually connect to the database first. To do so, type

```shell
$ cf create-service-key strider-db mykey
```

Then retrieve the credentials using

```shell
$ cf service-key strider-db mykey
```

We can now use these to connect to the MongoDB and insert our users. To do so,
run

```shell
$ cf service-connector 13000 <your-mongodb-host>:<your-mongodb-port>
```

to open the connection. Then open a new console window and connect your MongoDB
shell (you need to have it
[installed](https://docs.mongodb.org/manual/installation)) to that opened
connection using the following command:

```shell
$ mongo localhost:13000/<your-mongodb-database> --username <your-mongodb-username> --password <your-mongodb-password>`
```

Now we have an authenticated and authorized connection into our DB. In the
MongoDB shell, type

```shell
> db.users.insert({ "account_level" : 1, "hash" : "$2a$10$llY8X.g9GPW/tygE0UQfZ.yN.YSccIIuAyxO41Si4odoVEhLBlxcy", "salt" : "$2a$10$llY8X.g9GPW/tygE0UQfZ.", "email" : "<your-email-address>", "jobs" : [ ], "projects" : [ ], "accounts" : [ ] })
```

Then you can close the two terminal windows.

Great, you can now log into Strider using these user credentials and work with
it from the GUI. The password behind the given hash and salt is `passw0rd`.
**You should change it immediately after your first login.**

## CI/CD For Node.js Apps

Using the GUI, you can now add your GitHub or Bitbucket account and add a first
repo. It's easiest to use a Node.js app, but Strider also has plugins for Ruby,
Python and .NET. It can possibly also run and build other apps (e.g., Java or
Go) but I haven't tried that yet. For Node.js apps, add them to Strider in the
GUI and add a branch (e.g., `master`) which it should be listening for changes
on. Then add the three plugins for "Node.js", "Environment" and "Custom
Scripts". We use the Node.js one to install our preferred version of Node.js and
run the tests of our app (using `npm test`). In the Custom Scripts plugin's
settings, we can define our script to deploy to Cloud Foundry.

### Run Deployment Script

Add the following script to the "Deployment" stage of the plugin:

```bash
# Install Cloud Foundry CLI
curl -L "https://cli.run.pivotal.io/stable?release=linux64-binary&source=github" | tar -zx

# CF Login and Auth
cf api "${CF_API}"
cf auth "${CF_USERNAME}" "${CF_PASSWORD}"
cf target -o "${CF_ORG}" -s "${CF_SPACE}"

# Push App
cf push
```

This script will simply push our app using the credentials we provide it with
the "Environment" plugin and the latest Cloud Foundry CLI. For a more advanced
deployment script, you can refer to my
[Blue-Green-Deployment script](https://gist.github.com/cloudlena/3eb3c0e2e5e3558d56d1)
on GitHub.

### Add Environment Variables

To provide these variables, add them to the settings of the "Environment"
plugin. We'll need the following ones:

- `CF_API` - The API endpoint of your Cloud Foundry installation (e.g.,
  `https://api.lyra-836.appcloud.swisscom.com` for the Swisscom App Cloud)
- `CF_USERNAME` - Your Cloud Foundry username
- `CF_PASSWORD` - Your Cloud Foundry password
- `CF_ORG` - The Cloud Foundry organization you want to deploy your app to
- `CF_SPACE` - The Cloud Foundry space you intend to deploy your app to

## Git Push

Now that your app is all set up for CI/CD, it's time to `git push` some changes
to your app and see Strider do its magic.
