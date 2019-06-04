# Production Deployment

{% hint style="warning" %}
Check the original `cookiecutter-django` [deployment documentation](https://cookiecutter-django.readthedocs.io/en/latest/deployment-with-docker.html) to learn about AWS deployment, Supervisor Examples, Sentry configuration, and more. If you are deploying on an **intranet**, please see the HTTPS is on by default section.
{% endhint %}

### Understanding the Docker Compose Setup

Before you begin, check out the `production.yml` file in the root of this project. Keep note of how it provides configuration for the following services:

* `django`: your application running behind `Gunicorn`;
* `postgres`: PostgreSQL database with the application's relational data;
* `redis`: Redis instance for caching;
* `caddy`: Caddy web server with HTTPS on by default.

Provided you have opted for Celery \(via setting `use_celery` to `y`\) there are three more services:

* `celeryworker` running a Celery worker process;
* `celerybeat` running a Celery beat process;
* `flower` running [Flower](https://github.com/mher/flower) \(for more info, check out [CeleryFlower](https://cookiecutter-django.readthedocs.io/en/latest/developing-locally-docker.html#celeryflower) instructions for local environment\).

### Configuring the Stack

The majority of services above are configured through the use of environment variables. Just check out [envs](https://cookiecutter-django.readthedocs.io/en/latest/developing-locally-docker.html#envs) and you will know the drill.

You will probably also need to setup the Mail backend, for example by adding a [Mailgun](https://mailgun.com) API key and a Mailgun sender domain, otherwise, the account creation view will crash and result in a 500 error when the backend attempts to send an email to the account owner.

### HTTPS is On by Default

The Caddy web server used in the default configuration will get you a valid certificate from Lets Encrypt and update it automatically. All you need to do to enable this is to make sure that your DNS records are pointing to the server Caddy runs on. You can read more about this here at [Automatic HTTPS](https://caddyserver.com/docs/automatic-https) in the Caddy docs. Please note:

* If you are not using a subdomain of the domain name set in the project, then remember to put the your staging/production IP address in the `DJANGO_ALLOWED_HOSTS` environment variable \(see [settings](https://cookiecutter-django.readthedocs.io/en/latest/settings.html#settings)\) before you deploy your website. Failure to do this will mean you will not have access to your website through the HTTP protocol.
* Access to the Django admin is set up by default to require HTTPS in production or once _live_.
* **⚠️ Attention!** If you are running your application on an intranet you may want to use [tls](https://caddyserver.com/docs/tls) caddy setting. Make sure that the `DOMAIN_NAME` configuration has the `https://` schema prepended in the caddy environment file `.envs/.production/.caddy` \(see this [ticket](https://github.com/mholt/caddy/issues/1673) to learn more\). Then include the following configuration in `compose/production/caddy/Caddyfile` in order to use a self signed certificate:

  ```text
    tls self_signed
  ```

  Alternatively, If you have a local certificate and key provided by your institution, you will need to copy the keys in the caddy `compose/production/caddy/Dockerfile` and use:

  ```text
    tls /path/to/cert path/to/key
  ```

### Postgres Data Volume Modifications

**Optional** \| Postgres is saving its database files to the `production_postgres_data` volume by default. Change that if you want something else and make sure to make [backups](https://cookiecutter-django.readthedocs.io/en/latest/docker-postgres-backups.html) since this is not done automatically.

### Building & Running Production Stack

You will need to build the stack first. To do that, run:

```text
docker-compose -f production.yml build
```

Once this is ready, you can run it with:

```text
docker-compose -f production.yml up
```

To run the stack and detach the containers, run:

```text
docker-compose -f production.yml up -d
```

To run a migration, open up a second terminal and run:

```text
docker-compose -f production.yml run --rm django python manage.py migrate
```

To create a superuser, run:

```text
docker-compose -f production.yml run --rm django python manage.py createsuperuser
```

If you need a shell, run:

```text
docker-compose -f production.yml run --rm django python manage.py shell
```

To check the logs out, run:

```text
docker-compose -f production.yml logs
```

If you want to scale your application, run:

```text
docker-compose -f production.yml scale django=4
docker-compose -f production.yml scale celeryworker=2
```

{% hint style="danger" %}
**Warning!** don't try to scale `postgres`, `celerybeat`, or `caddy`.
{% endhint %}

To see how your containers are doing run:

```text
docker-compose -f production.yml ps
```

