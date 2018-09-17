
# cookiecutter-bee

[![pypi badge][pypi_badge]][pypi_base]
[![travis badge][travis_badge]][travis_base]

[Cookiecutter-bee] is a template for the creation of [bee] projects.

!> [cookiecutter-bee] is a fork of [cookiecutter-django], please note that most of their [documentation] remains relevant! Also see [troubleshooting]. For reference, we forked out at commit [4258ba9].

## Features

* [Bee] out of the box
* For Django 2.0 & Python 3.6
* Renders a Django project with 100% starting test coverage
* [12-Factor] based settings via [django-environ]
* Secure by default with SSL.
* Optimized development and production settings
* Registration via [django-allauth]
* Send emails via Anymail_ (using Mailgun_ by default, but switchable)
* Media storage using Amazon S3
* [Docker-compose] for development and production (using [Caddy] with [LetsEncrypt] support)
* Procfile for deploying to Heroku
* Run tests with py.test
* Customizable PostgreSQL version
* [Celery] with [Flower]
* **optional** - Serve static files from Amazon S3 or [Whitenoise]
* **optional** - Integration with [MailHog] for local email testing

## Constraints

* Only maintained 3rd party libraries are used.
* Uses PostgreSQL everywhere (9.2+)
* Environment variables for configuration (This won't work with Apache/mod_wsgi except on AWS ELB).

## Credits

This package is a proud fork of [cookiecutter-django]. If you have differences in your preferred setup, please fork this to create your own version. **New to django?** [Two Scoops of Django] is the best dessert-themed Django reference in the universe!

<!-- local -->
[bee]: https://leukgen.github.io/guide/#/
[cookiecutter-bee]: https://github.com/leukgen/cookiecutter-bee
[contributing guidelines]: .github/CONTRIBUTING.md
[api guide]: https://leukgen.github.io/guide/#/guides/cookiecutter

<!-- badges -->
[pypi_badge]: https://img.shields.io/pypi/v/cookiecutter-bee.svg
[pypi_base]: https://pypi.python.org/pypi/cookiecutter-bee
[travis_badge]: https://img.shields.io/travis/leukgen/cookiecutter-bee.svg
[travis_base]: https://travis-ci.org/leukgen/cookiecutter-bee
[4258ba9]: https://github.com/pydanny/cookiecutter-django/commit/4258ba9e2ddc822953e326f98f1f74842fa0fed1

<!--  -->
[two scoops of django]: http://twoscoopspress.com/products/two-scoops-of-django-1-11

<!-- cookiecutter-django -->
[cookiecutter]: https://github.com/audreyr/cookiecutter
[documentation]: https://cookiecutter-django.readthedocs.io/en/latest/
[cookiecutter-django]: https://github.com/pydanny/cookiecutter-django
[django-environ]: https://github.com/joke2k/django-environ
[12-factor]: http://12factor.net/
[django-allauth]: https://github.com/pennersr/django-allauth
[django-avatar]: https://github.com/grantmcconnaughey/django-avatar
[procfile]: https://devcenter.heroku.com/articles/procfile
[mailgun]: http://www.mailgun.com/
[whitenoise]: https://whitenoise.readthedocs.io/
[celery]: http://www.celeryproject.org/
[flower]: https://github.com/mher/flower
[anymail]: https://github.com/anymail/django-anymail
[mailhog]: https://github.com/mailhog/MailHog
[sentry]: https://sentry.io/welcome/
[docker-compose]: https://github.com/docker/compose
[pythonanywhere]: https://www.pythonanywhere.com/
[caddy]: https://caddyserver.com/
[letsencrypt]: https://letsencrypt.org/
[troubleshooting]: https://cookiecutter-django.readthedocs.io/en/latest/troubleshooting.html
