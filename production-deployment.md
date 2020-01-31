# Production Deployment

## Isabl API in Production

You can get a **production-ready** Isabl API instance from [isabl.io](https://isabl.io) in less than 30 seconds. Alternatively,  you can [install `isabl-api` on premise](production-deployment.md#isabl-api-on-premise) as a third party application in your own Django project, this might be useful if you need to run Isabl behind a firewall.

## Isabl CLI in Production

In your production environment you can install [Isabl CLI](https://github.com/isabl-io/cli)  with:

```bash
# install isabl-cli from PyPi
pip install isabl-cli

# let the client know what API should be used
export ISABL_API_URL="https://isabl.mskcc.org/api/v1/"

# set client id, you can create a new client in the admin site
export ISABL_CLIENT_ID="<replace with client primary key>"

# isabl should be now available
isabl --help
```

For example, if `ISABL_CLIENT_ID=1` you can update the settings field at [https://my.isabl/admin/isabl\_api/client/1/change/](https://isabl.mskcc.org/admin/isabl_api/client/1/change/). An example of such configuration could be:

```javascript
{
  "ADMIN_USER": "isablbot",
  "DEFAULT_LINUX_GROUP": "isabl",
  "BASE_STORAGE_DIRECTORY": "/isabl/data",
  "SUBMIT_ANALYSES": "isabl_cli.batch_systems.submit_lsf",
  "ON_DATA_IMPORT": ["isabl_apps.signals.signal_data_import"],
  "CUSTOM_COMMANDS": ["isabl_apps.cli.one_click_genome"],
  "ON_STATUS_CHANGE": ["isabl_apps.signals.signal_apps_automation"],
  "INSTALLED_APPLICATIONS": ["isabl_apps.apps.BwaMemGRCh37"]
}
```

This is how the admin website looks like for editing Isabl CLI settings:

![Editing Isabl CLI settings from the Admin.](.gitbook/assets/image%20%281%29.png)

### Multiuser Setup

Isabl CLI can be used by multiple users. By default, any user can import data and result files are owned by whoever triggered the application. These capabilities can be limited to an [**`ADMIN_USER`**](isabl-settings.md#isabl-cli-settings)**.** In this setup, data and results are owned by the`ADMIN_USER` ****yet [applications can be triggered by any user](writing-applications.md#applications-run-by-multiple-users).

{% hint style="info" %}
An[**`ADMIN_USER`**](isabl-settings.md#isabl-cli-settings)is a shared unix account that can be accessed by one or more engineers. These engineers are responsible for the data and results of Isabl installations. 
{% endhint %}

First you need to assign the right API permissions to your users. To facilitate this Isabl comes with the following command:

```bash
# from the django project directory run
python manage.py create_default_groups

# if you are using docker compose
docker-compose -f production.yml run --rm django python manage.py create_default_groups
```

This command will create the following three Django groups:

| Group name | Description | Permissions to |
| :--- | :--- | :--- |
| **Managers** | Individuals who register samples. | CustomField, Individual, Center, Disease, Experiment, Technique, Platform, Project, Submission, Analysis |
| **Analysts** | individuals who run analyses. | CustomField, Application, Analysis, Assembly |
| **Engineers** | A combination of Managers and Analysts | CustomField, Individual, Center, Disease, Experiment, Technique, Platform, Project, Submission, Analysis, Application, Assembly |

Then you will need to configure the `ADMIN_USER` and the `DEFAULT_LINUX_GROUP` in the Isabl CLI _client object_ \(you can do so by updating your client `ISABL_CLIENT_ID` from the Django admin website\). For example:

```javascript
{
  "ADMIN_USER": "isablbot",
  "DEFAULT_LINUX_GROUP": "isabl",
  ...
}
```

Once you follow the [writing applications guide](writing-applications.md), you will understand that Isabl Applications can be managed using a python package. If you have multiple users triggering applications, you may want to have them all pointing to the same package. This can be either using the `PYTHONPATH` environment variable or pip installing locally your apps repo:

```bash
# using an environment variable
export PYTHONPATH=/path/to/my/isabl/apps

# alternatively you can have other users pip install the repo
pip install --editable /path/to/my/isabl/apps

# you may need to update the .eggs directory permissions
chmod -R g+rwX /path/to/my/isabl/apps/.eggs
```

Learn more about [Writing Applications](writing-applications.md):

{% page-ref page="writing-applications.md" %}

Learn more about [Isabl CLI settings](isabl-settings.md#isabl-cli-settings):

{% page-ref page="isabl-settings.md" %}

Learn more about [Retrieving Data](retrieve-data.md) using `isabl-cli` to fetch data:

{% page-ref page="retrieve-data.md" %}

### Initialize Data Lake

With the admin user run the following snippet in the [**`BASE_STORAGE_URL`**](isabl-settings.md#isabl-cli-settings):

```bash
DIRS="00 01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99"
BASE="analyses experiments"

# go to your data lake base directory (see: BASE_STORAGE_DIRECTORY)
cd /path/to/my/data/lake

for i in $BASE;
do
    for j in $DIRS;
    do
        for k in $DIRS;
        do
            DIR="$i/$j/$k"
            mkdir -p $DIR
            chmod u+wrX,g+wrX $DIR
        done;
    
    chmod g-w "$i/$j/"
    done;
done
```

## Isabl API on Premise

You can bootstrap a new Django project using [Cookiecutter API](https://github.com/isabl-io/cookiecutter):

```bash
# install cookiecutter
pip install cookiecutter 

# then bootstrap the project
cookiecutter https://github.com/isabl-io/cookiecutter-api
```

#### Cookiecutter API Features

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

#### Cookiecutter API Constraints

* Only maintained 3rd party libraries are used.
* Uses PostgreSQL everywhere \(9.2+\)
* Environment variables for configuration \(This won't work with Apache/mod\_wsgi except on AWS ELB\).

{% hint style="info" %}
[Isabl Cookiecutter](https://github.com/isabl-io/cookiecutter) is a proud fork of [cookiecutter-django](https://github.com/pydanny/cookiecutter-django), please note that most of their [documentation](https://cookiecutter-django.readthedocs.io/en/latest/) remains relevant! Also see [troubleshooting](https://cookiecutter-django.readthedocs.io/en/latest/troubleshooting.html). For reference, we forked out at commit [4258ba9](https://github.com/pydanny/cookiecutter-django/commit/4258ba9e2ddc822953e326f98f1f74842fa0fed1). If you have differences in your preferred setup, please fork [Isabl Cookiecutter](https://github.com/isabl-io/cookiecutter) to create your own version. **New to Django?** [Two Scoops of Django](http://twoscoopspress.com/products/two-scoops-of-django-1-11) is the best dessert-themed Django reference in the universe!
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

