---
title: Building Tough Applications
author: Lena Fuhrimann
pubDate: 2025-12-03
tags: ["cloud", "kubernetes", "resiliency", "scaling"]
description:
  "Learn how to build strong cloud applications using four simple ideas:
  Tolerance, Fortitude, Resilience, and Adaptability."
image: ../../assets/blog/tough-applications.jpg
---

When you run apps in the cloud, things will break. It's not a question of _if_
but _when_. Networks go down. Servers crash. Databases stop working for a while.
The apps that survive aren't the ones that never fail. They're the ones that
handle failure well.

In [one of his videos](https://www.youtube.com/watch?v=SE9_1PYsaP0),
entrepreneur Alex Hormozi talks about mental toughness. He defines it as "the
percent chance a bad thing changes how you act against your goals." He breaks it
into four parts: **Tolerance**, **Fortitude**, **Resilience**, and
**Adaptability**. These ideas work really well for building cloud native apps
too.

## Tolerance

Tolerance is how long your fuse is. It's how much trouble you can handle before
you start acting differently. Someone with high tolerance doesn't let small
problems knock them off track.

For apps, tolerance means _how much stress your system can take before it starts
breaking_. An app with good tolerance handles traffic spikes, slow databases,
and other problems without falling apart right away.

Here's what this looks like:

- Using queues to hold requests instead of saying "no" right away when traffic
  goes up
- Using connection pools that can handle it when the database slows down
- Having systems that can absorb sudden bursts of activity without failing
- Setting timeouts that give things enough time to finish normally

In Kubernetes, you set resource requests and limits to define how much tolerance
your app has. Higher limits let your app handle sudden spikes without crashing
at the first sign of trouble.

```yaml
resources:
  requests:
    memory: "128Mi"
    cpu: "100m"
  limits:
    memory: "512Mi"
    cpu: "1000m"
```

Apps with low tolerance crash at the first problem. One slow database query uses
up all the connections. A small traffic spike causes everything to fail. Every
little issue turns into a big problem.

## Fortitude

Fortitude measures how much you change once you hit your limit. Someone with
high fortitude stays pretty calm even when things get bad. Someone with low
fortitude falls apart completely.

For apps, fortitude means _failing nicely instead of completely breaking_. When
your system does hit its limit, how badly does it break?

This includes:

- Circuit breakers that show cached or backup responses instead of error
  messages
- Load shedding that drops less important requests while keeping the important
  ones working
- Bulkheads that keep failures isolated so one broken part doesn't crash
  everything
- Backup plans that give you some functionality instead of none

A good readiness probe is a fortitude tool. When things go wrong, your app stops
taking new requests instead of accepting work it can't finish.

```yaml
readinessProbe:
  httpGet:
    path: /health/ready
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 10
  failureThreshold: 3
```

Apps with low fortitude go from "working" to "completely broken" with nothing in
between. They have no middle ground. When the database slows down, they don't
just slow down—they crash and break other things too.

## Resilience

Resilience is how quickly you bounce back after something bad happens. Once
you've been hit, how fast do you recover?

For apps, resilience means _getting back to normal quickly_. After a failure,
how fast does your system get stable again and start working at full speed?

This means:

- Fast startup times so new copies can replace broken ones quickly
- Stateless design so any copy can handle any request right away
- Health checks that correctly show when the app is ready to work
- Automatic recovery through Kubernetes restarts and autoscaling

Kubernetes deployments with good liveness probes and restart policies help with
resilience. Broken pods get replaced automatically. The system fixes itself
without anyone having to step in.

```yaml
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
livenessProbe:
  httpGet:
    path: /health/live
    port: 8080
  initialDelaySeconds: 10
  periodSeconds: 15
```

Apps with low resilience take forever to recover. They start up slowly, need
someone to fix them manually, or get stuck in a broken state even after the
problem is gone.

## Adaptability

Adaptability is the most interesting part. It measures how you compare after a
problem versus before. Do you come back stronger, weaker, or the same?

For apps, adaptability means _learning and getting better from failures_. Does
your system come out of problems better prepared to handle similar things in the
future?

This includes:

- Auto-scaling that adjusts how many copies you run based on what it's learned
  about traffic
- Rate limiting that learns what normal traffic looks like and adjusts limits
- Chaos engineering where you break things on purpose to find weak spots
- After-incident reviews that lead to real improvements in the system

In Kubernetes, the Horizontal Pod Autoscaler with custom metrics helps with
adaptability. Your system learns from traffic patterns and adjusts how many
copies it runs.

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: my-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app
  minReplicas: 3
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
```

Apps with low adaptability keep making the same mistakes. They don't learn from
outages. Each problem is a surprise, even when the same thing has happened
before. They come back the same—or worse—after each problem.

## Conclusion

Mental toughness in people isn't just on or off. It has four different parts.
The same is true for apps.

- **Tolerance**: How much stress can your app take before it starts breaking?
- **Fortitude**: When it does break, does it fail nicely or completely crash?
- **Resilience**: How quickly does it get back to normal?
- **Adaptability**: Does it come back stronger after problems?

You can be good at some parts and weak at others. An app might handle a lot of
stress before breaking (high tolerance) but take forever to recover when it does
(low resilience). Another might break at the first sign of trouble (low
tolerance) but recover right away (high resilience).

Understanding these four parts helps you find where your apps are weak. Then you
can focus on making them stronger. The cloud is not a stable place. Building
tough apps is not optional.

Do you want to build your own tough applications? Check out our
[Cloud Native Empowerment](/en/services/cloud-native-empowerment?utm_source=bespinian_blog&utm_medium=blog&utm_campaign=tough_applications)
service and book your free workshop.
