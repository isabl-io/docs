# Bee

[![pypi badge][pypi_badge]][pypi_base]
[![gitter badge][gitter_badge]][gitter_base]
[![travis badge][travis_badge]][travis_base]
[![pyup badge][pyup_badge]][pyup_base]
[![codecov badge][codecov_badge]][codecov_base]
[![code formatting][black_badge]][black_base]

## Installation

Install django-bee:

    pip install django-bee

Add it to your `INSTALLED_APPS`:

```python
INSTALLED_APPS = [
    ...
    'corsheaders',
    'django_extensions',
    'django_filters',
    'drf_yasg',
    'rest_framework',
    'rest_framework.authtoken',
    'rest_auth',
    'rest_auth.registration',
    'allauth',
    'allauth.account',
    'taggit',
    'bee'
    ...
    ]
```

Add django-bee's URL patterns:

```python
urlpatterns = [
    ...  # your stuff goes here

    # Bee backend URLs
    path("api/v1/", include('bee.urls.v1')),

    # Bee frontend will catch any other url pattern not specified before.
    url(r"^.*", views.FrontendView.as_view(template_name="frontend.html"))
    ]
```

Make sure you include this swagger setting:

```python
# tags shouldn't care about case
TAGGIT_CASE_INSENSITIVE = True

# make sure nested filters are not documented in swagger
SWAGGER_SETTINGS = {
    'DEFAULT_FILTER_INSPECTORS': ["bee.inspectors.ShortParamsInspector"]
}

# required custom serializer for registration
REST_AUTH_REGISTER_SERIALIZERS = {
    'REGISTER_SERIALIZER': 'bee.serializers.CustomRegisterSerializer',
}

# user bee preferences
REST_AUTH_SERIALIZERS = {
    "USER_DETAILS_SERIALIZER": "bee.serializers.CustomUserDetailsSerializer"
}

# custom bee adapter for django-allauth
ACCOUNT_ADAPTER = "bee.adapters.DefaultAccountAdapterCustom"
```

## Run in Development

To run the API django app:

    # Run the API locally
    docker-compose up

## Features

* 🚀 TODO
  * Add `bulk_update` API endpoint.
  * Add ability to create dynamic api filters for `data` field.

## Settings

    RESULTS_FUNCTION
    JIRA_URL_FIELD
    JIRA_GROUP_FIELD
    JIRA_PROJECT_ID
    JIRA_API2_URL
    JIRA_BASE_URL
    JIRA_AUTH
    JIRA_WATCHERS_FIELD
    JIRA_PROJECT_FIELD
    JIRA_PROJECT_ID
    JIRA_PROJECT_ISSUE_TYPE
    GOOGLE_APPLICATION_NAME
    GOOGLE_DRIVE_DIRECTORY_ID
    GOOGLE_CREDENTIAL_PATH
    GOOGLE_CLIENT_SECRET_FILE
    URL_FRONTEND

[Cookiecutter]: https://github.com/audreyr/cookiecutter
[cookiecutter-djangopackage]: https://github.com/pydanny/cookiecutter-djangopackage
[codecov_badge]: https://codecov.io/gh/leukgen/django-bee/branch/master/graph/badge.svg
[codecov_base]: https://codecov.io/gh/leukgen/django-bee
[gitter_badge]: https://badges.gitter.im/leukgen/django-bee/Lobby.svg
[gitter_base]: https://gitter.im/leukgen/django-bee
[pypi_badge]: https://img.shields.io/pypi/v/django-bee.svg
[pypi_base]: https://pypi.python.org/pypi/django-bee
[pyup_badge]: https://pyup.io/repos/github/leukgen/django-bee/shield.svg
[pyup_base]: https://pyup.io/repos/github/leukgen/django-bee/
[travis_badge]: https://img.shields.io/travis/leukgen/django-bee/master.svg
[travis_base]: https://travis-ci.org/leukgen/django-bee
[black_badge]: https://img.shields.io/badge/code%20style-black-000000.svg
[black_base]: https://github.com/ambv/black
