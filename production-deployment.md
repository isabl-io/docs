# Production Deployment

## Isabl Cookiecutter

[Isabl Cookiecutter](https://github.com/isabl-io/cookiecutter) is a template to create production-ready [Isabl](https://isabl-io.github.io/docs/#/) projects.

{% hint style="info" %}
[Isabl Cookiecutter](https://github.com/isabl-io/cookiecutter) is a proud fork of [cookiecutter-django](https://github.com/pydanny/cookiecutter-django), please note that most of their [documentation](https://cookiecutter-django.readthedocs.io/en/latest/) remains relevant! Also see [troubleshooting](https://cookiecutter-django.readthedocs.io/en/latest/troubleshooting.html). For reference, we forked out at commit [4258ba9](https://github.com/pydanny/cookiecutter-django/commit/4258ba9e2ddc822953e326f98f1f74842fa0fed1). If you have differences in your preferred setup, please fork [Isabl Cookiecutter](https://github.com/isabl-io/cookiecutter) to create your own version. **New to Django?** [Two Scoops of Django](http://twoscoopspress.com/products/two-scoops-of-django-1-11) is the best dessert-themed Django reference in the universe!
{% endhint %}

### Features

* [Isabl](https://isabl-io.github.io/docs/#/) out of the box
* For Django 2.0 & Python 3.6
* Renders a Django project with 100% starting test coverage
* [12-Factor](http://12factor.net/) based settings via [django-environ](https://github.com/joke2k/django-environ)
* Secure by default with SSL.
* Optimized development and production settings
* Registration via [django-allauth](https://github.com/pennersr/django-allauth)
* Send emails via [Anymail](https://github.com/anymail/django-anymail) \(using [Mailgun](http://www.mailgun.com/) by default, but switchable\)
* Media storage using Amazon S3
* [Docker-compose](https://github.com/docker/compose) for development and production \(using [Caddy](https://caddyserver.com/) with [LetsEncrypt](https://letsencrypt.org/) support\)
* [Procfile](https://devcenter.heroku.com/articles/procfile) for deploying to Heroku
* Run tests with `py.test`
* Customizable PostgreSQL version
* [Celery](http://www.celeryproject.org/) with [Flower](https://github.com/mher/flower)
* **optional** - Serve static files from Amazon S3 or [Whitenoise](https://whitenoise.readthedocs.io/)
* **optional** - Integration with [MailHog](https://github.com/mailhog/MailHog) for local email testing

### Constraints

* Only maintained 3rd party libraries are used.
* Uses PostgreSQL everywhere \(9.2+\)
* Environment variables for configuration \(This won't work with Apache/mod\_wsgi except on AWS ELB\).

## Bootstrap Your Django Project

In order to get started run:

```bash
# install cookiecutter
pip install cookiecutter 

# then bootstrap the project
cookiecutter https://github.com/isabl-io/cookiecutter-api
```

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

{% hint style="info" %}
Check the original `cookiecutter-django` [deployment documentation](https://cookiecutter-django.readthedocs.io/en/latest/deployment-with-docker.html) to learn about AWS deployment, Supervisor Examples, Sentry configuration, and more. If you are deploying on an **intranet**, please see the HTTPS is on by default section.
{% endhint %}

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

```bash
docker-compose -f production.yml build
```

Once this is ready, you can run it with:

```bash
docker-compose -f production.yml up
```

To run the stack and detach the containers, run:

```bash
docker-compose -f production.yml up -d
```

To run a migration, open up a second terminal and run:

```bash
docker-compose -f production.yml run --rm django python manage.py migrate
```

To create a superuser, run:

```bash
docker-compose -f production.yml run --rm django python manage.py createsuperuser
```

If you need a shell, run:

```bash
docker-compose -f production.yml run --rm django python manage.py shell
```

To check the logs out, run:

```bash
docker-compose -f production.yml logs
```

If you want to scale your application, run:

```bash
docker-compose -f production.yml scale django=4
docker-compose -f production.yml scale celeryworker=2
```

{% hint style="danger" %}
**Warning!** don't try to scale `postgres`, `celerybeat`, or `caddy`.
{% endhint %}

To see how your containers are doing run:

```bash
docker-compose -f production.yml ps
```

### Mounting a Remote Data Directory

Its likely that the data resides in a different server than the web application. To make results available for the web server you may want to consider `sshfs`:

```bash
sshfs \
    -o nonempty \
    -o follow_symlinks \
    -o IdentityFile=/path/to/id_rsa \
    -o allow_other \
    $USER@<remote-server>:/remote/path /remote/path
```

{% hint style="info" %}
Note that we are mounting `/remote/path` to `/remote/path` so that the paths pushed by **Isabl CLI** match those available in the web server. Also note that you may need to restart the docker compose services after mounting this directory.
{% endhint %}

### Manage User Groups and Permissions

You can configure user permissions using Django. Isabl offers an optional configuration of groups that you can adopt:

| Group Name | Permissions |
| :--- | :--- |
| **Managers** | Can create, update, and delete Custom Fields, Individuals, Centers, Diseases, Experiments, Techniques, Platforms, Projects, and Submissions. |
| **Analysts** | Can create, update, and delete Custom Fields, Applications, Analyses, and Assemblies. They can also download analyses results. |
| **Engineers** | Engineers have the same permissions of both managers and analysts. |

 In order to create these groups run the following command:

```bash
python manage.py create_default_groups
```

{% hint style="info" %}
These groups are **optional** and you can create your own using the Django Admin.
{% endhint %}

## Isabl CLI in Production

In your production environment you can install [Isabl CLI](https://github.com/isabl-io/cli)  with:

```bash
pip install isabl-cli
```

Then you need to export the API URL:

{% code-tabs %}
{% code-tabs-item title="~/.bash\_profile" %}
```bash
export ISABL_API_URL="https://isabl.mskcc.org/api/v1/"
```
{% endcode-tabs-item %}
{% endcode-tabs %}

By doing this you will have access to Isabl's command line interface:

```bash
isabl --help
```

### Configuring Isabl CLI Settings

Isabl CLI settings can be provided by configuring a Django variable:

{% code-tabs %}
{% code-tabs-item title="settings.py" %}
```python
ISABL_SETTINGS = {
    "CLIENT_SETTINGS": {
        "INSTALLED_APPLICATIONS": [
            "isabl_apps.apps.bwa_mem.apps.BwaMemGRCh37",
            "isabl_apps.apps.qc_data.apps.QualityControlGRCh37",
        ],
    },
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

A better approach however is to create a client object from the admin site, e.g. [https://isabl.mskcc.org/admin/isabl\_api/client/add/](https://isabl.mskcc.org/admin/isabl_api/client/add/), and exporting the object's primary key \(or slug\):

{% code-tabs %}
{% code-tabs-item title="~/.bash\_profile" %}
```bash
export ISABL_CLIENT_ID="<replace with client primary key>"
```
{% endcode-tabs-item %}
{% endcode-tabs %}

Once done, you can configure the your Isabl CLI from the admin site by updating the `settings` field of your client object.

### Custom Isabl CLI Logic and Applications

The CLI packages aims to be as flexible and customizable as possible, so that several functions can be replaced, or new commands can be added. The best way of doing this is using the [cookiecutter-cli](https://github.com/isabl-io/cookiecutter-cli), which generates a python project from which [Isabl CLI](https://github.com/isabl-io/cli) can be extended:

```text
cookiecutter https://github.com/isabl-io/cookiecutter-cli
```

### Wrap Up and Next Steps

With a production-ready instance of Isabl you are now ready to write new applications:

{% page-ref page="writing-applications.md" %}

Learn more about Isabl customization:

{% page-ref page="isabl-settings.md" %}

Or contribute new features to Isabl!

{% page-ref page="contributing-guide.md" %}

