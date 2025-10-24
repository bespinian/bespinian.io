---
title: Run a Crypto Trading Bot on Cloud Foundry
author: Lena Fuhrimann
date: 2017-12-11
tags: ["cryptocurrency", "trading", "cloud-foundry", "automation", "zenbot"]
excerpt:
  "Deploy Zenbot, an open-source cryptocurrency trading bot, to Cloud Foundry to
  automate your crypto trading strategies on platforms like GDAX."
---

Everybody is talking about [Bitcoin](https://en.wikipedia.org/wiki/Bitcoin) and
its peer currencies. The hype is so great that even small investors, who have no
idea about financial constructs, like myself, want to get aboard the investing
and trading train. That's why I recently decided to create my own account on
[GDAX](https://www.gdax.com/) and try my luck.

Trading, at first, was fun, but I realized pretty quickly that I'm not the kind
of person who wants to watch their dashboard every five minutes. Furthermore, I
have no clear strategy about when to invest in what and when to actually pull
out. Being able to read the price charts correctly requires a lot of training
and knowledge. However, there are patterns which can be recognized. Since this
is a purely analytical work, I figured that it would be the perfect job for a
computer. So, I looked online and found my answer with
[Zenbot](https://github.com/carlos8f/zenbot). It's an open source, cloud-ready
trading bot for cryptocurrencies. Let's deploy it to Cloud Foundry.

**Important**: The presented software and concepts are still very young. Please
use them with great caution and don't start out with investing big amounts of
money right away.

## Clone Repo

First, we need to clone the repo from
[GitHub](https://github.com/carlos8f/zenbot). It's advisable to check out the
latest tag, so you're not trusting all your money to a possibly unstable
`master` branch.

## Create Services

Zenbot has two dependencies it needs to work. The first one is
[MongoDB](https://www.mongodb.com/). In most Cloud Foundry installations, you
can get that with a simple command like:

```shell
$ cf create-service mongodb small zenbot-db
```

The next dependency is a GDAX API client. Any of the big trading platforms will
do, but I'm using GDAX to keep things simple.
[Here](https://github.com/carlos8f/zenbot#description) you can find a list of
the supported platforms. To use GDAX, visit their
[website](https://www.gdax.com/) and create an account. The process is a little
tedious because you'll have to provide a photo ID and go through a couple of
more verification steps. But, believe me, eventually it's worth it. After you
are signed up, choose the product you'll want to trade (e.g., BTC/EUR) in the
top-left corner and transfer some money to your account (either from a credit
card, from a bank account or from an existing
[Coinbase](https://www.coinbase.com) account).

After that's done, go to the API settings and create a new set of API keys with
the "Trade" permission. Note down the credentials and create a user provided
service for them (be aware that this allows anybody with the respective
permissions in Cloud Foundry to see your API credentials):

```shell
$ cf create-user-provided-service zenbot-gdax -p '{"key":"YOUR-API-KEY","b64secret":"YOUR-API-SECRET","passphrase":"YOUR-API-PASSPHRASE"}'
```

In case you are using a different trading platform, create a similar user
provided service with their API credentials.

## Configure the Bot

Now that we have the services set up, we'll need to tell Zenbot to use them.
Copy `conf-sample.js` to `conf.js` and add the following lines to automatically
read the respective config items from the `VCAP_SERVICES` environment variable
Cloud Foundry exposes:

```javascript
// Add this part after the existing MongoDB configuration

if (process.env.VCAP_SERVICES) {
  const creds = JSON.parse(process.env.VCAP_SERVICES).mongodb[0].credentials;
  c.mongo.host = creds.host;
  c.mongo.port = creds.port;
  c.mongo.db = creds.database;
  c.mongo.username = creds.username;
  c.mongo.password = creds.password;
}
```

```javascript
// Add this part after the existing GDAX configuration

if (process.env.VCAP_SERVICES) {
  const creds = JSON.parse(process.env.VCAP_SERVICES)["user-provided"][0]
    .credentials;
  c.gdax.key = creds.key;
  c.gdax.b64secret = creds.b64secret;
  c.gdax.passphrase = creds.passphrase;
}
```

This will ensure that the config is read automatically from the environment, if
the `VCAP_SERVICES` variable is there.

Furthermore, we'll make it possible to configure the traded product and the
strategy to use through environment variables. For that, change the following
lines:

```javascript
// default selector. only used if omitting [selector] argument from a command.
c.selector = "gdax.BTC-USD";
// name of default trade strategy
c.strategy = "trend_ema";
```

to these

```javascript
// default selector. only used if omitting [selector] argument from a command.
c.selector = process.env.ZENBOT_SELECTOR || "gdax.BTC-USD";
// name of default trade strategy
c.strategy = process.env.ZENBOT_STRATEGY || "trend_ema";
```

This allows us to set the selector (i.e., the product) and the trading strategy
the bot should use through environment variables. To get a list of possible
values, you can run the following commands in the root folder of the repo:

```shell
$ ./zenbot.sh list-selectors
$ ./zenbot.sh list-strategies
```

## Create manifest

The last step before pushing your bot is to create a `manifest.yml` file to
automate the setup of your deployment. It should look as follows:

```yaml
applications:
  - name: zenbot
    memory: 256M
    buildpacks:
      - https://github.com/cloudfoundry/nodejs-buildpack.git
    no-route: true
    health-check-type: process
    services:
      - zenbot-db
      - zenbot-gdax
    env:
      ZENBOT_SELECTOR: "gdax.BTC-EUR"
```

Replace the selector with the respective product you want to trade, and add
another line if you don't want to use the default trading strategy.

## Push

Now, all that's left is to run `cf push` to deploy your bot. After a successful
deployment, you can use the following command to get a live log stream to see
exactly what your bot is trading:

```shell
$ cf logs zenbot --recent
```

See
[Reading the Console Output](https://github.com/carlos8f/zenbot#reading-the-console-output)
for instructions about how to interpret these logs. Essentially, if the last
number is green, you should be happy with the bot and if the second to last
number is green, you should be happy in general ;-)
