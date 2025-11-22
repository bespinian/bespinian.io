---
title: Run Ghost on Cloud Foundry
author: Lena Fuhrimann
date: 2017-07-27
tags: ["ghost", "cloud-foundry", "blog", "nodejs", "cms"]
excerpt:
  "Deploy Ghost, a modern Node.js blogging platform, on Cloud Foundry with
  MariaDB and optional S3 storage for media files."
image: ../../assets/blog/ghost.jpg
---

This blog runs on [Ghost](https://github.com/TryGhost/Ghost). It's a pretty
light weight blogging platform based on [Node.js](https://nodejs.org/). Let's
look into how it can be run on Cloud Foundry.

## Create Services

To run Ghost, we'll need two services: a database and an email server. First,
let's create the database. I'm using the
[Swisscom Application Cloud](https://developer.swisscom.com/) here, but you can
use any Cloud Foundry provider. We'll create a small MariaDB service which works
like MySQL and therefore can be used by Ghost. Execute the following command to
create it:

```bash
$ cf create-service mariadbent usage blog-db
```

Now, we can create our email service. The easiest way is to use
[Mailgun](https://www.mailgun.com/). Just create an account on their site for
free and put the credentials into a user provided service in Cloud Foundry to
link the two:

```bash
$ cf create-user-provided-service mailgun -p '{ "username": "<your-mailgun-smtp-login>", "password": "<your-mailgun-password>" }'
```

Replace the values in `<>` with your respective credentials.

## Get the Source Code

Getting the Ghost source code is effortless. Just visit their
[releases](https://github.com/TryGhost/Ghost/releases) page and download the
latest one as a ZIP archive. Then unzip it and `cd` into the respective folder
from your terminal.

## Create Entrypoint Script

Ghost needs to be configured through a configuration file. We'll call ours
`config.producton.json` since it's supposed to be suitable for a production
blog. This file tells Ghost where to look for its database, which email server
to use, and how it's supposed to run the blog in general.

In Cloud Foundry, services are configured dynamically, which isn't possible in a
simple JSON file. We'll work around this by creating a Bash script to read out
the environment and create the config file on the fly. Create a new file called
`entrypoint-cf.sh` in the root folder of your app and paste the following
content into it:

```bash
#!/bin/bash

set -e -u

# App URL
app_uri="$(echo "${VCAP_APPLICATION}" | jq -r '.application_uris[0] // ""')"
app_url="https://${app_uri}"

# Database
db_credentials="$(echo "${VCAP_SERVICES}" | jq -r '.["mariadbent"][0].credentials // ""')"
if [ -z "${db_credentials}" ]; then
  echo "Error: Please bind a MariaDB service" >&2
  exit 1
fi
db_host="$(echo "${db_credentials}" | jq -r '.host // ""')"
db_username="$(echo "${db_credentials}" | jq -r '.username // ""')"
db_password="$(echo "${db_credentials}" | jq -r '.password // ""')"
db_database="$(echo "${db_credentials}" | jq -r '.database // ""')"

# Email service
email_credentials="$(echo "${VCAP_SERVICES}" | jq -r '.["user-provided"][0].credentials // ""')"
if [ -z "${db_credentials}" ]; then
  echo "Error: Please bind an Email service" >&2
  exit 1
fi
email_username="$(echo "${email_credentials}" | jq -r '.username // ""')"
email_password="$(echo "${email_credentials}" | jq -r '.password // ""')"

# Create config file
jq -n "{
    url: \"${app_url}\",
    mail: {
        transport: \"SMTP\",
        options: {
            service: \"Mailgun\",
            auth: {
                user: \"${email_username}\",
                pass: \"${email_password}\"
            }
        }
    },
    database: {
        client: \"mysql\",
        connection: {
            host: \"${db_host}\",
            user: \"${db_username}\",
            password: \"${db_password}\",
            database: \"${db_database}\"
        }
    },
    server: {
        host: \"0.0.0.0\",
        port: ${PORT}
    }
}" > config.production.json

# Initialize and Migrate DB
./node_modules/.bin/knex-migrator init
./node_modules/.bin/knex-migrator migrate

# Start the app
npm start
```

Then, make the script executable by running the following command:

```bash
$ chmod +x entrypoint-cf.sh
```

This script gets all the necessary environment variables and uses `jq` (which
comes pre-installed in the Node.js Buildpack) to create a config JSON string,
which is then written into a `config.production.json` file. The script then
executes a database migration (if necessary) and starts the app itself.

Now, all we'll need to do is tell Cloud Foundry to run this script to start the
app instead of calling `npm start` directly (which is the default for Node.js
apps). We can do this in the `manifest.yml` file, which is where Cloud Foundry
gets its instructions of how to run an app. Create a new file called
`manifest.yml` in the root directory of the app and paste the following content
in there:

```yaml
applications:
  - name: my-blog
    memory: 256MB
    buildpacks:
      - https://github.com/cloudfoundry/nodejs-buildpack.git
    command: ./entrypoint-cf.sh
    services:
      - blog-db
      - mailgun
    env:
      NODE_ENV: production
```

This tells CF to use the correct buildpack and to initiate the app with our
entrypoint script. It also sets the `NODE_ENV` environment variable to
`production` which optimizes Node.js and Ghost to run with better performance.
Furthermore, it tells Cloud Foundry to bind the two services we've created above
to our blog app.

The configuration for our app is done. All that's left to do is run the
following command to get our blog running in the cloud:

```bash
$ cf push
```

Welcome to the fabulous world of Ghost blogging!

## Add Disqus (Optional)

Allowing your readers to comment on your blog posts is a great way to make your
blog more interactive. Adding [Disqus](https://disqus.com/) is a straightforward
way to do so.

Simply visit their website, create an account and register your blog as a new
site. Then, open `content/themes/casper/post.hbs` and look for a comment about
Disqus in the file. There is a section that you'll need to uncomment and replace
the sample URL with the one of your blog. Follow the steps described in the
comment there.

After that, run `cf push` and that's it. Your blog is now interactive.

## Add Object Storage (Optional)

At some point, you'll want to upload images and other assets to be accessible
from your blog (e.g. for blog post header pictures). If you do that now, the
images will be lost whenever the app has to restart. So, we'll need to save
these images onto an S3 storage. The following paragraphs show how that can be
done on the Swisscom Application Cloud as an example.

To do so, follow [this tutorial](/manage-buckets-on-cloud-foundry-s3-services/)
to create an S3 service with bucket and name the service instance
"blog-storage".

Next, we'll have to bind the app to our newly created service. Add the following
line to the `services` part of our `manifest.yml`:

```yaml
- blog-storage
```

Now we need to install the
[ghost-storage-adapter-s3](https://github.com/colinmeinke/ghost-storage-adapter-s3)
so that Ghost will know how to talk to our S3 service. To do so, run the
installation commands from the link above in the folder where you have the Ghost
repo. Cloud Foundry will try to install the dependencies for Ghost using `yarn`.
Since the installation commands install the S3 storage adapter with `npm`, we'll
need to change that. This can simply be achieved by removing the `yarn.lock`
file:

```bash
$ rm yarn.lock
```

Next, we'll need to adjust our `entrypoint-cf.sh` script to include the S3
service. Add the following lines where the services variables are read:

```bash
# Storage service
s3_credentials="$(echo "${VCAP_SERVICES}" | jq -r '.["dynstrg"][0].credentials // ""')"
if [ -z "${s3_credentials}" ]; then
  echo "Error: Please bind an S3 service" >&2
  exit 1
fi
s3_endpoint="$(echo "${s3_credentials}" | jq -r '.accessHost // ""')"
s3_namespace="$(echo "${s3_credentials}" | jq -r '.namespace // ""')"
s3_access_key_id="$(echo "${s3_credentials}" | jq -r '.accessKey // ""')"
s3_secret_access_key="$(echo "${s3_credentials}" | jq -r '.sharedSecret // ""')"
```

Then add the following part to the JSON config template at the bottom of the
file:

```bash
    storage: {
      active: \"s3\",
      s3: {
        endpoint: \"${s3_endpoint}\",
        assetHost: \"https://${s3_namespace}.ds11s3ns.swisscom.com/${S3_BUCKET_NAME}\",
        accessKeyId: \"${s3_access_key_id}\",
        secretAccessKey: \"${s3_secret_access_key}\",
        bucket: \"${S3_BUCKET_NAME}\"
      }
    },
```

This tells Ghost to use the S3 storage adapter.

All that's left to do is to push our app again:

```bash
$ cf push
```

And that's it! All the images you upload now through the Ghost admin console
will be stored in your S3 service.

## Add Syntax Highlighting (Optional)

highlight.js allows you to get neat syntax highlighting for the code snippets
you include in your blog posts (see example above). It supports many programming
languages and different themes.

To get it into your blog, simply add the following snippets to the "Code
injection" section of your Ghost settings:

Blog Header:

```html
<style>
  .hljs {
    color: #a9b7c6;
    background: #282b2e;
    display: block;
    overflow-x: auto;
    padding: 0.5em;
  }
  .hljs-number,
  .hljs-literal,
  .hljs-symbol,
  .hljs-bullet {
    color: #6897bb !important;
  }
  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-deletion {
    color: #cc7832 !important;
  }
  .hljs-variable,
  .hljs-template-variable,
  .hljs-link {
    color: #629755 !important;
  }
  .hljs-comment,
  .hljs-quote {
    color: #808080 !important;
  }
  .hljs-meta {
    color: #bbb529 !important;
  }
  .hljs-string,
  .hljs-attribute,
  .hljs-addition {
    color: #6a8759 !important;
  }
  .hljs-section,
  .hljs-title,
  .hljs-type {
    color: #ffc66d !important;
  }
  .hljs-name,
  .hljs-selector-id,
  .hljs-selector-class {
    color: #e8bf6a !important;
  }
  .hljs-emphasis {
    font-style: italic;
  }
  .hljs-strong {
    font-weight: bold;
  }
</style>
```

Blog Footer:

```html
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>
<script>
  hljs.initHighlightingOnLoad();
</script>
```

If you want to use a different theme (the one above is called `androidstudio`),
you'll have to copy the minified CSS from your theme into the `<style>` tags of
the header and then add `!important` to all the colors, so they don't get
overwritten by Ghost's theme.

This will load and initialize highlight.js. Hit "Save" to update your blog and
enjoy colorful syntax highlighting!
