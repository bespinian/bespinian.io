---
title: Docker for Local Development
author: Lena Fuhrimann
date: 2017-06-08
tags: ["docker", "development", "containers", "local-development"]
excerpt:
  "Learn how to use Docker to quickly set up and tear down backend services for
  local development, keeping your machine clean and your workflows efficient."
---

I'm using [Docker](https://www.docker.com/). Daily. It has become a very
valuable part of my tool chain because it allows me to quickly set up any
backend my applications might need to run and tear it down the second I don't
need it anymore. Gone are the days when you had to have all kinds of databases
and other services installed just to be able to run your apps locally. With
Docker, you can do all of that and isolate it from your machine.

Most backend systems are accessible through HTTP and through a specific port.
You can use that to your advantage and have many services, each running in its
own Docker container and exposing the respective port to your local host.

## Install Docker

If you don't have Docker installed yet, I suggest you do so now and come back
afterwards. I for one, have really come to like
[Docker for Mac](https://docs.docker.com/docker-for-mac/install/) which you can
also install through [Homebrew](https://brew.sh/) by running the following
command:

```shell
$ brew cask install docker
```

Installing Docker on Windows can be done with
[Docker for Windows](https://www.docker.com/docker-windows), and installing it
on Linux is as easy as it gets: Just use your local package manager.

## Run Services

Now let's get to actually running the services. The magic formula here is the
following command:

```shell
$ docker run -d -p <port>:<port> <service>
```

Replace `<port>` with the default port of your service and `<service>` with its
name, and you got yourself a running instance. The `-d` flag specifies, that you
want to run the Docker container in
[detached mode](https://docs.docker.com/engine/reference/run/#detached--d),
which means that it will continue running in the background even if you close
your terminal. Here are a couple of examples to run services with the above
command:

```shell
# MongoDB
$ docker run -d -p 27017:27017 mongo
```

Easy!

```shell
# Redis
$ docker run -d -p 6379:6379 redis:3
```

Here, we also specified the Redis version we intend to use. You can find the
available versions by searching for the respective image on
[Docker Store](https://store.docker.com).

```shell
# MySQL
$ docker run -d -p 3306:3306 -e 'MYSQL_ALLOW_EMPTY_PASSWORD=yes' mysql
```

In this case, we are using the `-e` flag to set an additional environment
variable required by the MySQL image.

I'm sure you get the idea after seeing these examples. Bear in mind though that
you can apply these commands to almost any service which can run in a container.
You can now connect to the containerized services from your application just
like they were running on your local machine. This is because the `-p` flag
tells the containers to forward their internal ports to your local ones.

For example, if you have a MongoDB container running which forwards its port
`27017` to your local port `27017`, you can easily connect to the database in
the container with the `mongo` shell just like if the DB was running locally.

## Docker Shortcuts

While using Docker, I've discovered a couple of handy shortcut commands which
allow cleaning up unused services, so they don't clutter your computer anymore.
Another advantage of this is that you can cleanly and easily flush your
databases and other persistent services to make sure you're testing a clean
state.

A first important shortcut is that you can always abbreviate any container ID to
its first couple of letters (as long as it's the only such entity which has an
ID starting with these letters). So instead of using the full ID and typing
`docker stop 4f263b9aad2d`, I could simply type `docker stop 4f` (as long as
this container is the only running one which has an ID starting with "4f").

Some other useful commands are:

```shell
# Stop all running containers
$ docker stop $(docker ps -a -q)

# Remove all stopped containers
$ docker rm $(docker ps -a -q)

# Remove all unused images
$ docker rmi $(docker images -q)

# Remove all unused volumes
$ docker volume rm $(docker volume ls -q)

# Remove all unused networks
$ docker network rm $(docker network ls -q)

# Remove everything
$ docker system prune --all
```
