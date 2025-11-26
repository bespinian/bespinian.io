---
title: Run WordPress on Cloud Foundry
author: Lena Fuhrimann
pubDate: 2017-08-25
tags: ["wordpress", "cloud-foundry", "php", "s3", "cms"]
description:
  "Deploy WordPress on Cloud Foundry with externalized file storage using S3 to
  handle media uploads in a cloud-native way."
image: ../../assets/blog/wordpress.jpg
---

[WordPress](https://wordpress.org/) runs a huge portion of all websites on the
internet. It, therefore, seems obvious, to run this software on Cloud Foundry.
There's just one small problem: WordPress uses the file system to store all
uploaded media. On Cloud Foundry and other container-based systems, that doesn't
work because the container can be restarted at any time, which would remove all
stored files. For that reason, we need to externalize all file storage to a
separate service. In our case, this will be an S3 compatible storage.

## Download WordPress

To get WordPress, simply download the latest version from their
[website](https://wordpress.org/download/) and extract it to any directory. Then
`cd` into that directory from your terminal and copy the file
`wp-config-sample.php` to `wp-config.php`.

```shell
$ cp wp-config-sample.php wp-config.php
```

We'll use this file to configure WordPress.

## Create Services

Next, we'll need to create our database and S3 storage as services in Cloud
Foundry. To create the database, run the following command:

```shell
$ cf create-service mariadbent usage wp-db
```

I'm using the [Swisscom Application Cloud](https://developer.swisscom.com/). If
you use another Cloud Foundry provider, this command may differ. Just make sure
you create an SQL service called "wp-db".

Next, we'll need an S3 compatible storage that contains a publicly accessible
bucket. Please follow
[this tutorial](/manage-buckets-on-cloud-foundry-s3-services/) on how to create
one and call the service "wp-storage".

## Configure WordPress

WordPress itself doesn't run on Cloud Foundry out of the box. We'll need to make
some adjustments to the `wp-config.php` file. Open it and replace these lines:

```php
// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'database_name_here');

/** MySQL database username */
define('DB_USER', 'username_here');

/** MySQL database password */
define('DB_PASSWORD', 'password_here');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');
```

with the following ones:

```php
// ** Read service properties from _ENV['VCAP_SERVICES'] ** //
$services = json_decode(getenv('VCAP_SERVICES'), true);
$db_service = $services['mariadbent'][0];
$db_conf = $db_service['credentials'];
$s3_service = $services['dynstrg'][0];
$s3_conf = $s3_service['credentials'];

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', $db_conf['database']);

/** MySQL database username */
define('DB_USER', $db_conf['username']);

/** MySQL database password */
define('DB_PASSWORD', $db_conf['password']);

/** MySQL hostname */
define('DB_HOST', $db_conf['host'] . ':' . $db_conf['port']);

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/** The endpoint of your S3 provider (defaults to AWS) */
define('S3_UPLOADS_ENDPOINT_URL', 'https://' . $s3_conf['accessHost']);

/** The name of your S3 bucket */
define('S3_UPLOADS_BUCKET', 'my-bucket');

/** Your S3 access key ID */
define('S3_UPLOADS_KEY', $s3_conf['accessKey']);

/** Your S3 secret access key */
define('S3_UPLOADS_SECRET', $s3_conf['sharedSecret']);

/** Your S3 region */
define('S3_UPLOADS_REGION', 'none');

/** The URL where your uploads will be available */
define('S3_UPLOADS_BUCKET_URL', 'https://' . $s3_conf['namespace'] . '.ds11s3ns.swisscom.com/' . S3_UPLOADS_BUCKET);
```

Don't forget to replace `my-bucket` with the actual name of your bucket.

This config allows us to get the credentials to the database and the
configuration for our S3 uploads from the environment, as it's usually done in
Cloud Foundry applications.

## Install S3-Uploads Plugin

Luckily for us, there is a neat plugin for WordPress that allows uploads to be
stored in S3 instead of the local file system. You can find the plugin on
[GitHub](https://github.com/humanmade/S3-Uploads). We will directly clone it
into the `plugins` directory of our WordPress, so that we can push it to Cloud
Foundry with WordPress itself:

```shell
$ git clone https://github.com/humanmade/S3-Uploads.git wp-content/plugins/S3-Uploads
```

This will make the plugin available for activation on WordPress' admin GUI.

## Create S3-Endpoint Plugin

You can skip this step if you are using AWS S3.

The S3-Uploads plugin works really well with
[AWS S3](https://aws.amazon.com/s3/). If, however, we want to use it with a 3rd
party S3 provider (e.g. the Swisscom Application Cloud Dynamic Storage), we'll
have to add some more code to also allow us to specify a custom S3 endpoint. To
do so, we'll create a tiny that reads the endpoint out of `wp-config.php`. In
the `wp-content` directory, create a new directory called `mu-plugins`. It holds
so-called [Must Use Plugins](https://codex.wordpress.org/Must_Use_Plugins) which
are always used. In this directory, create a file called `S3-endpoint.php` and
fill it with the following content:

```php
<?php
/*
Plugin Name:  S3 Uploads Endpoint
Description:  Add S3_UPLOADS_ENDPOINT_URL to S3-Uploads
Version:      1.0.0
*/

add_filter('s3_uploads_s3_client_params', 's3_uploads_add_endpoint_param');
function s3_uploads_add_endpoint_param($params)
{
    if (S3_UPLOADS_ENDPOINT_URL) {
        $params['endpoint'] = S3_UPLOADS_ENDPOINT_URL;
    }

    return $params;
}
```

This simple one-file plugin checks if the constant `S3_UPLOADS_ENDPOINT_URL` is
defined and, if so, enriches the S3 parameters with it as the `endpoint`
parameter. If the variable is not defined, it will not set the `endpoint`
parameter to make it use the default of AWS again.

## Create manifest.yml

Finally, we'll create a `manifest.yml` file to push our app to the cloud more
easily. Create the file at the root of your `wordpress` directory and fill it
with the following content:

```yaml
applications:
  - name: wordpress
    host: my-wordpress
    memory: 256M
    buildpacks:
      - https://github.com/cloudfoundry/php-buildpack.git
    services:
      - wp-db
      - wp-storage
```

If the hostname is already taken, choose another one. You can use whatever you
want.

## Push the app

Now it's time to push our app to the cloud. Run the following command:

```shell
$ cf push
```

Then visit your site and the respective URL and follow the WordPress
installation wizard. Once you are on your WordPress Admin page, go to the
"Plugins" section and activate the "S3 Uploads" plugin. From now on, all the
uploads you make should go directly to S3. You now have a cloud native WordPress
installation!
