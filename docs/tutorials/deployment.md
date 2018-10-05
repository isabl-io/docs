# Deployment

!> Check the original `cookiecutter-django` [deployment documentation] to learn about AWS deployement, Supervisor Examples, Sentry configuration, and more. If you are deploying on an **intranet**, please see the [HTTPS is on by default](#HTTPS-is-on-by-default) section.

- [Understanding the Docker Compose Setup](#understanding-the-docker-compose-setup)
- [Configuring the Stack](#configuring-the-stack)
- [HTTPS is On by Default](#https-is-on-by-default)
- [Postgres Data Volume Modifications](#postgres-data-volume-modifications)
- [Building & Running Production Stack](#building--running-production-stack)

## Understanding the Docker Compose Setup

Before you begin, check out the `production.yml` file in the root of this project. Keep note of how it provides configuration for the following services:

- `django`: your application running behind `Gunicorn`;
- `postgres`: PostgreSQL database with the application's relational data;
- `redis`: Redis instance for caching;
- `caddy`: Caddy web server with HTTPS on by default.

Provided you have opted for Celery (via setting `use_celery` to `y`) there are three more services:

- `celeryworker` running a Celery worker process;
- `celerybeat` running a Celery beat process;
- `flower` running [Flower] (for more info, check out [CeleryFlower] instructions for local environment).

## Configuring the Stack

The majority of services above are configured through the use of environment variables. Just check out [envs] and you will know the drill.

You will probably also need to setup the Mail backend, for example by adding a [Mailgun] API key and a Mailgun sender domain, otherwise, the account creation view will crash and result in a 500 error when the backend attempts to send an email to the account owner.

## HTTPS is On by Default

The Caddy web server used in the default configuration will get you a valid certificate from Lets Encrypt and update it automatically. All you need to do to enable this is to make sure that your DNS records are pointing to the server Caddy runs on. You can read more about this here at [Automatic HTTPS] in the Caddy docs. Please note:

- If you are not using a subdomain of the domain name set in the project, then remember to put the your staging/production IP address in the `DJANGO_ALLOWED_HOSTS` environment variable (see [settings]) before you deploy your website. Failure to do this will mean you will not have access to your website through the HTTP protocol.

- Access to the Django admin is set up by default to require HTTPS in production or once *live*.

- **⚠️ Attention!** If you are running your application on an intranet you may want to use [tls] caddy setting. Make sure that the `DOMAIN_NAME` configuration has the `https://` schema prepended in the caddy environment file `.envs/.production/.caddy` (see this [ticket] to learn more). Then include the following configuration in `compose/production/caddy/Caddyfile` in order to use a self signed certificate:

        tls self_signed

    Alternatively, If you have a local certificate and key provided by your institution, you will need to copy the keys in the caddy `compose/production/caddy/Dockerfile` and use:

        tls /path/to/cert path/to/key

## Postgres Data Volume Modifications

**Optional** | Postgres is saving its database files to the `production_postgres_data` volume by default. Change that if you want something else and make sure to make [backups] since this is not done automatically.

## Building & Running Production Stack

You will need to build the stack first. To do that, run:

    docker-compose -f production.yml build

Once this is ready, you can run it with:

    docker-compose -f production.yml up

To run the stack and detach the containers, run:

    docker-compose -f production.yml up -d

To run a migration, open up a second terminal and run:

    docker-compose -f production.yml run --rm django python manage.py migrate

To create a superuser, run:

    docker-compose -f production.yml run --rm django python manage.py createsuperuser

If you need a shell, run:

    docker-compose -f production.yml run --rm django python manage.py shell

To check the logs out, run:

    docker-compose -f production.yml logs

If you want to scale your application, run:

    docker-compose -f production.yml scale django=4
    docker-compose -f production.yml scale celeryworker=2

!> **Warning!** don't try to scale `postgres`, `celerybeat`, or `caddy`.

To see how your containers are doing run:

    docker-compose -f production.yml ps

[deployment documentation]: https://cookiecutter-django.readthedocs.io/en/latest/deployment-with-docker.html
[flower]: https://github.com/mher/flower
[celeryflower]: https://cookiecutter-django.readthedocs.io/en/latest/developing-locally-docker.html#celeryflower
[sentry.io]: https://sentry.io/welcome
[Mailgun]: https://mailgun.com
[envs]: https://cookiecutter-django.readthedocs.io/en/latest/developing-locally-docker.html#envs
[backups]: https://cookiecutter-django.readthedocs.io/en/latest/docker-postgres-backups.html
[tls]: https://caddyserver.com/docs/tls
[Automatic HTTPS]: https://caddyserver.com/docs/automatic-https
[ticket]: https://github.com/mholt/caddy/issues/1673
[settings]: https://cookiecutter-django.readthedocs.io/en/latest/settings.html#settings
