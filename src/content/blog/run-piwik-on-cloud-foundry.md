---
title: Run Piwik on Cloud Foundry
author: Lena Fuhrimann
date: 2016-11-30
tags: ["piwik", "analytics", "cloud-foundry", "php", "mysql"]
excerpt:
  "Deploy Piwik, an open-source analytics platform, on Cloud Foundry as an
  alternative to Google Analytics with full control over your data."
image: ../../assets/blog/analytics.jpg
---

[Piwik](https://piwik.org/) is an open-source analytics platform based on
[PHP](https://secure.php.net/) and [MySQL](https://www.mysql.com/). That makes
it a perfect application to be run on Cloud Foundry-based platforms. So, in case
you are tired of sending all your data to Google Analytics but rather want to
have your own analytics platform in place, this tutorial is for you. We will see
what it takes to run Piwik on Cloud Foundry and what modifications are necessary
to integrate it smoothly into our platform.

In this tutorial, I will use the
[Swisscom Application Cloud](https://developer.swisscom.com/) as an example, but
any
[Cloud Foundry-based platform](https://www.cloudfoundry.org/use/cloud-foundry-certified/)
will do.

## Get Piwik

Download the latest version of Piwik from <https://piwik.org/download>. Then
unzip it and `cd` into its root folder. The folder contains another subfolder
called "piwik" and an instructions link. We don't need this nested structure.
Execute the following command to normalize it:

```shell
$  cp -rf piwik .. && rm -rf piwik
```

## Set Up Database

As a first step, we need to create the service in Cloud Foundry:

```shell
$ cf create-service mariadbent usage piwik-db
```

In the Swisscom Application Cloud, the SQL service is called `mariadbent`. You
might have to adjust this if you are using a different CF provider.

Then we need to instruct Piwik to connect to our database provided as a Cloud
Foundry service. Create a new file `bootstrap.php` in the root of your project
and insert the following content:

```php
<?php
  $_ENV["SQLDB"] = NULL;
  $_ENV["SQLHOST"] = NULL;
  $_ENV["SQLPORT"] = NULL;
  $_ENV["SQLUSER"] = NULL;
  $_ENV["SQLPASSWORD"] = NULL;

  $application = getenv("VCAP_APPLICATION");
  $application_json = json_decode($application,true);

  if (isset($application_json["application_uris"])) {
    $_ENV["APPURIS"] = $application_json["application_uris"];
  }

  $services = getenv("VCAP_SERVICES");
  $services_json = json_decode($services,true);

  if (isset($services_json)) {
    if (isset($services_json["mariadbent"][0]["credentials"])) {
      $mysql_config = $services_json["mariadbent"][0]["credentials"];
      $_ENV["SQLDB"] = $mysql_config["database"];
      $_ENV["SQLHOST"] = $mysql_config["host"];
      $_ENV["SQLPORT"] = $mysql_config["port"];
      $_ENV["SQLUSER"] = $mysql_config["username"];
      $_ENV["SQLPASSWORD"] = $mysql_config["password"];
    }
  }
?>
```

This code runs before Piwik starts, so it allows us to overwrite the default
variables that are used to connect to the database. Again, you'll have to adjust
the keyword `mariadbent` in the code if the SQL service is called differently
with your CF provider.

When Piwik is started for the first time, it shows a configuration wizard where
the user has to provide the database credentials. We can overwrite the defaults
for these values with the ones coming from the service environment variables, so
you can just click "next" in this wizard and don't have to look them up every
time. To do so, open the file `plugins/Installation/FormDatabaseSetup.php` and
navigate to the definition of the `init` method. There, replace the following
lines:

```php
// default values
$this->addDataSource(new HTML_QuickForm2_DataSource_Array(array(
                                                               'host'          => '127.0.0.1',
                                                               'type'          => $defaultDatabaseType,
                                                               'tables_prefix' => 'piwik_',
                                                          )));
```

with these:

```php
// default values
$this->addDataSource(new HTML_QuickForm2_DataSource_Array(array(
                                                               'host'          => $_ENV["SQLHOST"].':'.$_ENV["SQLPORT"],
                                                               'username'      => $_ENV["SQLUSER"],
                                                               'password'      => $_ENV["SQLPASSWORD"],
                                                               'dbname'        => $_ENV["SQLDB"],
                                                               'type'          => $defaultDatabaseType,
                                                               'tables_prefix' => 'piwik_',
                                                          )));
```

## Security

Next, we have to add our site's URL that we also retrieve from the CF
environment in `bootstrap.php` as a trusted host to Piwik. Open the file
`plugins/Installation/Controller.php` and navigate to definition of the
`addTrustedHosts` method. There, replace the following line

```php
$trustedHosts = array();
```

with these:

```php
$trustedHosts = Config::getInstance()->General['trusted_hosts'];

if (!is_array($trustedHosts)) {
    $trustedHosts = array();
}
```

We want Piwik to enforce the use of HTTPS in favor of HTTP. To activate that,
open the `config/global.ini.php` file and change the setting of `force_ssl` to
`1`:

```php
force_ssl = 1
```

## Routing

Next, we'll improve some more of the defaults Piwik uses during the setup
wizard. These changes will suggest that Piwik tracks itself using its analytics
as a first site. Open the file `plugins/Installation/FormFirstWebsiteSetup.php`
and replace the following lines of the `init` method:

```php
// default values
$this->addDataSource(new HTML_QuickForm2_DataSource_Array(array(
                                                               'url' => $urlExample,
                                                          )));
```

with these:

```php
// default values
$this->addDataSource(new HTML_QuickForm2_DataSource_Array(array(
                                                               'siteName' => $_ENV["APPURIS"][0],
                                                               'url' => "https://" . $_ENV["APPURIS"][0],
                                                          )));
```

## Composer

Since Piwik already comes with its dependencies installed, we don't want
[Composer](https://getcomposer.org/) to run again in Cloud Foundry. The PHP
Buildpack won't run Composer if it doesn't find any files that would indicate
that. So let's ignore the Composer files when pushing. Add a `.cfignore` file to
the root of your project and paste the following line into it:

```txt
/composer.*
```

## Buildpack Configuration

The PHP Buildpack allows us to configure any PHP app using a dedicated file.
Create a folder `.bp-config` at the root of your project and inside, add a file
called `options.json`. This file sets the version of PHP to use, which
extensions to install, and many more options. You can read more about it
[here](http://docs.cloudfoundry.org/buildpacks/php/gsg-php-config.html). Paste
the following content into our new file to install the needed PHP extensions and
to use the latest PHP version:

```json
{
  "PHP_EXTENSIONS": [
    "bz2",
    "zlib",
    "curl",
    "mcrypt",
    "gd",
    "cli",
    "geoip",
    "pdo",
    "pdo_mysql",
    "mbstring",
    "openssl"
  ],
  "PHP_VERSION": "{PHP_70_LATEST}"
}
```

## manifest.yml

To specify how the app should behave in Cloud Foundry, let's add a
`manifest.yml` file to the root of our project. Then insert the following
content:

```yaml
applications:
  - name: piwik
    host: my-piwik
    memory: 256M
    buildpacks:
      - https://github.com/cloudfoundry/php-buildpack.git
    services:
      - piwik-db
```

Be creative with the `host` because the default one is probably already taken.

## Deploy

Now it's time to deploy our app to Cloud Foundry. Since we have already
configured everything in our manifest file, all we need to do is

```shell
$ cf push
```

When we navigate to our Piwik instance, we are presented with the configuration
wizard. Since we have set all the correct defaults above, you can just click
"next" on most of the steps. Piwik will complain about the file integrity check
reporting some errors, but we can safely ignore that since we were the ones
modifying the files. After the wizard, you should have a fully functioning Piwik
installation running on Cloud Foundry. Yay!

This tutorial is based on a very similar but outdated one of the
[Bluemix Blog](https://www.ibm.com/blogs/bluemix/2014/07/getting-started-piwik-ibm-bluemix/).
