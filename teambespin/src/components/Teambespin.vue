<template>
  <div>
    <nav class="navbar is-link is-fixed-top">
      <div class="navbar-brand">
        <div class="navbar-burger burger">
          <span></span> <span></span> <span></span>
        </div>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <a class="navbar-item" href="#mission"> <span>{{ $t('mission.navitem') }}</span> </a>
          <a class="navbar-item" href="#services"> <span>{{ $t('services.navitem') }}</span> </a>
          <a class="navbar-item" href="#tech"> <span>{{ $t('technologies.navitem') }}</span> </a>
          <a class="navbar-item" href="#team"> <span>{{ $t('team.navitem') }}</span> </a>
          <a class="navbar-item" href="#contact"> <span>{{ $t('contact.navitem') }}</span> </a>
        </div>
      </div>
    </nav>

    <section class="hero is-link is-fullheight">
      <div class="hero-body">
        <div class="container" style="position:fixed;">
          <div class="columns">
            <div class="column is-offset-1-desktop" style="padding-top:7rem;">
              <h1 class="title is-1 is-spaced">
                be<span class="is-blinking">|</span>spin
              </h1>
              <h2 class="subtitle is-4">{{ $t('subtitle') }}</h2>
            </div>
            <div class="column is-offset-4-desktop has-text-centered">
              <img src="../assets/cloudcity.svg" class="cloud-city" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="mission">
      <div class="columns is-centered" style="position:relative;">
        <div class="column is-half">
            <h3 class="title is-2 is-spaced">{{ $t('mission.title') }}</h3>
          <p>
            {{ $t('mission.text') }}
          </p>
          <div class="content" style="margin-top:4rem;">
            <div class="columns">
              <div
                class="column is-centered is-half-desktop is-offset-one-quarter-desktop"
              >
                <div class="box">
                  <div class="card-content">
                    <p class="title is-4">
                    {{ $t('mission.solutions.title') }}
                    </p>
                    <div class="content">
                      <p>
                        <span
                          class="icon has-text-link"
                          style="margin-right:0.7rem"
                          ><i class="fas fa-check"></i></span
                      >{{ $t('mission.solutions.operate') }}
                      </p>
                      <p>
                        <span
                          class="icon has-text-link"
                          style="margin-right:0.7rem"
                          ><i class="fas fa-check"></i></span
                      >{{ $t('mission.solutions.adaptable') }}
                      </p>
                      <p>
                        <span
                          class="icon has-text-link"
                          style="margin-right:0.7rem"
                          ><i class="fas fa-check"></i></span
                      >{{ $t('mission.solutions.scalable') }}
                      </p>
                      <p>
                        <span
                          class="icon has-text-link"
                          style="margin-right:0.7rem"
                          ><i class="fas fa-check"></i></span
                      >{{ $t('mission.solutions.optimized') }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="services">
      <div class="columns is-centered" style="position:relative;">
        <div class="column is-half">
            <h3 class="title is-2 is-spaced">{{ $t('services.title') }}</h3>
          <p>
            {{ $t('services.text') }}
          </p>
          <div class="content" style="margin-top:4rem;">
            <div class="timeline is-centered">
              <div class="timeline-item">
                <div class="timeline-marker is-icon is-link">
                  <i class="fa fa-clipboard-list"></i>
                </div>
                <div class="timeline-content">
                    <p class="heading">{{ $t('services.timeline.assess.title') }}</p>
                  <p>
                  {{ $t('services.timeline.assess.text') }}
                  </p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker is-icon is-link">
                  <i class="fa fa-recycle"></i>
                </div>
                <div class="timeline-content">
                    <p class="heading">{{ $t('services.timeline.transform.title') }}</p>
                  <p>
                    {{ $t('services.timeline.transform.text') }}
                  </p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker is-icon is-link">
                  <i class="fa fa-pencil-alt"></i>
                </div>
                <div class="timeline-content">
                    <p class="heading">{{ $t('services.timeline.design.title') }}</p>
                  <p>
                  {{ $t('services.timeline.design.text') }}
                  </p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker is-icon is-link">
                  <i class="fa fa-box"></i>
                </div>
                <div class="timeline-content">
                    <p class="heading">{{ $t('services.timeline.build.title') }}</p>
                  <p>
                    {{ $t('services.timeline.build.text') }}
                  </p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker is-icon is-link">
                  <i class="fa fa-rocket"></i>
                </div>
                <div class="timeline-content">
                    <p class="heading">{{ $t('services.timeline.run.title') }}</p>
                  <p>
                  {{ $t('services.timeline.run.text') }}
                  </p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker is-icon is-link">
                  <i class="fa fa-undo"></i>
                </div>
                <div class="timeline-content">
                    <p class="heading">{{ $t('services.timeline.rethink.title') }}</p>
                  <p>
                    {{ $t('services.timeline.rethink.text') }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="tech">
      <div class="columns is-centered" style="position:relative;">
        <div class="column is-half">
          <h3 class="title is-2 is-spaced">Our Technologies</h3>
          <p>
            We are convinced that technology should follow ideas and not the
            other way around. Together we design and implement architectures
            based on modern technologies which enable your team to spend more
            time on delivering business value and less on infrastructure
            operations. Here's a selection of the <strong>platforms</strong> we
            are native to:
          </p>
          <div class="tile is-ancestor">
            <div class="tile is-parent is-vertical">
              <div class="tile is-parent">
                <div class="tile is-parent is-vertical">
                  <div class="tile is-parent">
                    <div class="tile is-child tech-logo has-text-centered">
                      <figure class="image"><img src="../assets/aws.svg" /></figure>
                      <br />
                      <a href="https://aws.amazon.com" target="_blank">AWS</a>
                    </div>
                    <div class="tile is-child has-text-centered tech-logo">
                      <figure class="image">
                        <img src="../assets/openshift.svg" />
                      </figure>
                      <br />
                      <a href="https://www.openshift.com" target="_blank"
                        >OpenShift</a
                      >
                    </div>
                    <div class="tile is-child has-text-centered tech-logo">
                      <figure class="image">
                        <img src="../assets/cloudfoundry.svg" />
                      </figure>
                      <br />
                      <a href="https://www.cloudfoundry.org" target="_blank"
                        >Cloud Foundry</a
                      >
                    </div>
                    <div class="tile is-child has-text-centered tech-logo">
                      <figure class="image">
                        <img src="../assets/kubernetes.svg" />
                      </figure>
                      <br />
                      <a href="https://kubernetes.io" target="_blank"
                        >Kubernetes</a
                      >
                    </div>
                    <div class="tile is-child has-text-centered tech-logo">
                      <figure class="image">
                        <img src="../assets/docker.svg" />
                      </figure>
                      <br />
                      <a href="https://www.docker.com" target="_blank"
                        >Docker</a
                      >
                    </div>
                  </div>
                </div>
              </div>
              <p>
                Even though we passionately write code, reinventing the wheel is
                not our game. We know when to use an existing product to solve a
                problem and we share this knowledge with your team. Here are
                some of our favorite <strong>tools</strong>:
              </p>
              <div class="tile is-parent">
                <div class="tile is-parent is-vertical">
                  <div class="tile is-parent">
                    <div class="tile is-child has-text-centered tech-logo">
                      <figure class="image">
                        <img src="../assets/golang.svg" />
                      </figure>
                      <br />
                      <a href="https://golang.org" target="_blank">Go</a>
                    </div>
                    <div class="tile is-child has-text-centered tech-logo">
                      <figure class="image">
                        <img src="../assets/nodejs.svg" />
                      </figure>
                      <br />
                      <a href="https://nodejs.org" target="_blank">Node.js</a>
                    </div>
                    <div class="tile is-child has-text-centered tech-logo">
                      <figure class="image">
                        <img src="../assets/springboot.svg" />
                      </figure>
                      <br />
                      <a
                        href="https://spring.io/projects/spring-boot"
                        target="_blank"
                        >Spring Boot</a
                      >
                    </div>
                    <div class="tile is-child has-text-centered tech-logo">
                      <figure class="image"><img src="../assets/react.svg" /></figure>
                      <br />
                      <a href="https://reactjs.org" target="_blank">React</a>
                    </div>
                    <div class="tile is-child has-text-centered tech-logo">
                      <figure class="image">
                        <img src="../assets/graphql.svg" />
                      </figure>
                      <br />
                      <a href="https://graphql.org" target="_blank">GraphQL</a>
                    </div>
                  </div>
                  <div class="tile is-parent">
                    <div class="tile is-child has-text-centered tech-logo">
                      <figure class="image">
                        <img src="../assets/terraform.svg" />
                      </figure>
                      <br />
                      <a href="https://www.terraform.io" target="_blank"
                        >Terraform</a
                      >
                    </div>
                    <div class="tile is-child has-text-centered tech-logo">
                      <figure class="image">
                        <img src="../assets/concourse.svg" />
                      </figure>
                      <br />
                      <a href="https://concourse-ci.org" target="_blank"
                        >Concourse</a
                      >
                    </div>
                    <div class="tile is-child has-text-centered tech-logo">
                      <figure class="image">
                        <img src="../assets/jenkins.svg" />
                      </figure>
                      <br />
                      <a href="https://jenkins.io" target="_blank">Jenkins</a>
                    </div>
                    <div class="tile is-child has-text-centered tech-logo">
                      <figure class="image">
                        <img src="../assets/rabbitmq.svg" />
                      </figure>
                      <br />
                      <a href="https://www.rabbitmq.com" target="_blank"
                        >RabbitMQ</a
                      >
                    </div>
                    <div class="tile is-child has-text-centered tech-logo">
                      <figure class="image"><img src="../assets/kafka.svg" /></figure>
                      <br />
                      <a href="https://kafka.apache.org" target="_blank"
                        >Kafka</a
                      >
                    </div>
                  </div>
                  <div class="tile is-parent">
                    <div class="tile is-child has-text-centered tech-logo">
                      <figure class="image"><img src="../assets/redis.svg" /></figure>
                      <br />
                      <a href="https://redis.io" target="_blank">Redis</a>
                    </div>
                    <div class="tile is-child has-text-centered tech-logo">
                      <figure class="image">
                        <img src="../assets/elasticsearch.svg" />
                      </figure>
                      <br />
                      <a
                        href="https://www.elastic.co/products/elasticsearch"
                        target="_blank"
                        >Elasticsearch</a
                      >
                    </div>
                    <div class="tile is-child has-text-centered tech-logo">
                      <figure class="image">
                        <img src="../assets/mongodb.svg" />
                      </figure>
                      <br />
                      <a href="https://www.mongodb.com" target="_blank"
                        >MongoDB</a
                      >
                    </div>
                    <div class="tile is-child has-text-centered tech-logo">
                      <figure class="image">
                        <img src="../assets/postgresql.svg" />
                      </figure>
                      <br />
                      <a href="https://www.postgresql.org" target="_blank"
                        >PostgreSQL</a
                      >
                    </div>
                    <div class="tile is-child has-text-centered tech-logo">
                      <figure class="image">
                        <img src="../assets/dynamodb.svg" />
                      </figure>
                      <br />
                      <a href="https://aws.amazon.com/dynamodb" target="_blank"
                        >DynamoDB</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="team">
      <div class="columns is-centered" style="position:relative;">
        <div class="column is-half">
          <h3 class="title is-2 is-spaced">The Team</h3>
          <p>
            We are cloud-native software engineers with experience in both the
            corporate and the startup world. We pride ourselves in being expert
            consultants, competent coaches and seasoned coders at the same time.
            Interested in meeting us? Feel free to approach us on social media
            or at a meetup near you!
          </p>
          <div class="content" style="margin-top:4rem;">
            <div class="tile is-ancestor">
              <div class="tile is-parent">
                <article class="tile is-child">
                  <div class="card">
                    <div class="card-content">
                      <div class="media">
                        <div class="media-left">
                          <figure class="image is-128x128">
                            <img
                              class="is-rounded"
                              src="https://pbs.twimg.com/profile_images/928975001105166336/dhnwx8fA_400x400.jpg"
                            />
                          </figure>
                        </div>
                        <div class="media-content">
                          <p class="title is-4">Hans Muster</p>
                          <p class="subtitle is-6">Keeper of Simple</p>
                        </div>
                      </div>
                      <br />
                      <p>
                        Software Architect specialized in microservices,
                        container technologies and cloud-native engineering
                      </p>
                    </div>
                    <footer class="card-footer">
                      <a
                        class="card-footer-item"
                        href="https://twitter.com/"
                        target="_blank"
                      >
                        <span class="icon">
                          <i class="fab fa-twitter"></i>
                        </span>
                      </a>
                      <a
                        class="card-footer-item"
                        href="https://github.com/"
                        target="_blank"
                      >
                        <span class="icon">
                          <i class="fab fa-github"></i>
                        </span>
                      </a>
                      <a
                        class="card-footer-item"
                        href="https://www.linkedin.com/in/"
                        target="_blank"
                      >
                        <span class="icon">
                          <i class="fab fa-linkedin"></i>
                        </span>
                      </a>
                      <a
                        class="card-footer-item"
                        href="https://www.xing.com/profile/"
                        target="_blank"
                      >
                        <span class="icon"> <i class="fab fa-xing"></i> </span>
                      </a>
                    </footer>
                  </div>
                </article>
              </div>
              <div class="tile is-parent">
                <article class="tile is-child">
                  <div class="card">
                    <div class="card-content">
                      <div class="media">
                        <div class="media-left">
                          <figure class="image is-128x128">
                            <img
                              class="is-rounded"
                              src="https://pbs.twimg.com/profile_images/928975001105166336/dhnwx8fA_400x400.jpg"
                            />
                          </figure>
                        </div>
                        <div class="media-content">
                          <p class="title is-4">Tobi Fuhrimann</p>
                          <p class="subtitle is-6">Head in the Clouds</p>
                        </div>
                      </div>
                      <br />
                      <div class="content">
                        <p>
                          Software Engineer specialized in cloud services,
                          distributed systems and web development with modern
                          technologies
                        </p>
                      </div>
                    </div>
                    <footer class="card-footer">
                      <a
                        class="card-footer-item"
                        href="https://twitter.com/mastertinner"
                        target="_blank"
                      >
                        <span class="icon">
                          <i class="fab fa-twitter"></i>
                        </span>
                      </a>
                      <a
                        class="card-footer-item"
                        href="https://github.com/mastertinner"
                        target="_blank"
                      >
                        <span class="icon">
                          <i class="fab fa-github"></i>
                        </span>
                      </a>
                      <a
                        class="card-footer-item"
                        href="https://www.linkedin.com/in/tobi-fuhrimann-83642746"
                        target="_blank"
                      >
                        <span class="icon">
                          <i class="fab fa-linkedin"></i>
                        </span>
                      </a>
                      <a
                        class="card-footer-item"
                        href="https://berndsgn.ch"
                        target="_blank"
                      >
                        <span class="icon">
                          <i class="fas fa-rss-square"></i>
                        </span>
                      </a>
                    </footer>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="contact">
      <div class="columns is-centered" style="position:relative;">
        <div class="column is-half">
          <h3 class="title is-2 is-spaced">Contact Us</h3>
          <p>
            Have a question? Need a quote? Wanna grab a coffee or a beer? Drop
            us a line and we'll be happy to get back to you as soon as possible!
          </p>
          <form
            class="content"
            style="margin-top:4rem;"
            action="https://formspree.io/tobias.fuhrimann@gmail.com"
            method="POST"
          >
            <div class="field">
              <p class="control has-icons-left">
                <input class="input" name="name" placeholder="Name" />
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input
                  class="input"
                  type="email"
                  name="email"
                  placeholder="Email"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input class="input" name="subject" placeholder="Subject" />
                <span class="icon is-small is-left">
                  <i class="fas fa-info"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <textarea
                class="textarea"
                name="message"
                placeholder="Message"
                rows="8"
              ></textarea>
            </div>
            <div class="field">
              <input
                type="submit"
                value="Send"
                class="button is-link is-fullwidth"
              />
            </div>
          </form>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="content has-text-centered">
        <p><strong>team be|spin</strong> 2018</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Teambespin'
}
</script>

<style>
.navbar-item {
  padding-right: 1.5rem;
  padding-left: 1.5rem;
}

.cloud-city {
  width: 26rem;
}

@media only screen and (max-width: 456px) {
  .cloudcity {
    margin-top: 5rem;
    width: 100%;
  }
}

.tech-logo {
  padding: 5%;
}

.card {
  height: 100%;
}

.is-blinking {
  -webkit-animation: 1s blink step-end infinite;
  animation: 1s blink step-end infinite;
}

@keyframes "blink" {
  from,
  to {
    color: transparent;
  }
  50% {
    color: white;
  }
}

@-webkit-keyframes "blink" {
  from,
  to {
    color: transparent;
  }
  50% {
    color: white;
  }
}
</style>

<i18n>
{
  "en": {
    "mission": {
        "navitem": "Mission",
        "title": "Our Mission",
        "text": "At team be|spin we love software. Especially if it's simple, efficient and spot on the requirements. Awesome software is made by awesome teams. That's why all of our services are focused on close collaboration with your team. Also, we feel at home in private, hybrid and public clouds. That makes us your ideal partner for creating great cloud-native solutions.",
        "solutions": {
            "title": "Together, we create solutions which are",
            "operate": "easy to operate",
            "adaptable": "adaptable to change",
            "scalable": "scalable under load",
            "optimized": "optimized for your business"
        }
    },
    "services": {
        "navitem": "Services",
        "title": "Our Services",
        "text": "No matter whether you are embarking on a new endeavour, reworking an idea or transforming your existing applications, we work hands-on with your team in every iteration of your project. Here are some of the services we offer. If what you require is not on the list, let us know! We're always happy to innovate.",
        "timeline": {
            "assess": {
                "title": "Assess",
                "text": "Perfect match or too good to be true? We help you choose the right partners for your project."
            },
            "transform": {
                "title": "Transform",
                "text": "Everyone has a history. Together, we review your existing applications and get them ready for the cloud."
            },
            "design": {
                "title": "Design",
                "text": "A diagram says more than a thousand words. Let’s structure your business domain and identify crucial concepts."
            },
            "build": {
                "title": "Build",
                "text": "From napkin to code. We help you realize your ideas in lean and cloud-native software."
            },
            "run": {
                "title": "Run",
                "text": "Zero downtime. Together we continuously deploy your applications and run them at scale."
            },
            "rethink": {
                "title": "Rethink",
                "text": "Everything is simple in hindsight. Let’s embrace that fact and take your solution to the next level."
            }
        }
    },
    "technologies": {
        "navitem": "Technologies"
    },
    "team": {
        "navitem": "Team"
    },
    "contact": {
        "navitem": "Contact"
    },
    "subtitle": "Cloud Native Citizens"
  }
}
</i18n>
