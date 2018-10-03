# Installation

?> This page describes how to install [isabl-api] as a reusable django app. See the [quick start] tutorial if you are not familiar with **django** or get learn how to set up a development environment in [10 minutes].

Follow this steps to use [isabl-api] as a reusable django application.

1. Install `isabl-api`:

        pip install isabl-api

2. Add it to your `INSTALLED_APPS`:

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

3. Add URL patterns:

    ```python
    urlpatterns = [
        ...  # your stuff goes here

        # backend URLs
        path("api/v1/", include('isabl_api.urls.v1')),

        # frontend will catch any other url pattern not specified before
        url(r"^.*", views.FrontendView.as_view(template_name="frontend.html"))
    ]
    ```

4. Third party required configurations.

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

    # required to support login in the browsable API
    REST_FRAMEWORK = {
        "DEFAULT_AUTHENTICATION_CLASSES": (
            "rest_framework.authentication.TokenAuthentication",
            "rest_framework.authentication.BasicAuthentication",
            "isabl_api.authentication.CsrfExemptSessionAuthentication",
        )
    }
    ```

<!-- JIRA -->
[jira]: https://www.atlassian.com/software/jira
[issue types]: https://confluence.atlassian.com/adminjiracloud/issue-types-844500742.html
[epics]: https://www.atlassian.com/agile/project-management/epics
[sprints]: https://confluence.atlassian.com/jirasoftwarecloud/planning-sprints-764478112.html
[boards]: https://confluence.atlassian.com/jirasoftwarecloud/what-is-a-board-764477964.html
[project id]: https://confluence.atlassian.com/jirakb/how-to-get-project-id-from-the-jira-user-interface-827341414.html
[custom fields]: https://confluence.atlassian.com/adminjiraserver/adding-a-custom-field-938847222.html
[custom field id]: https://confluence.atlassian.com/jirakb/how-to-find-id-for-custom-field-s-744522503.html

<!-- local -->
[isabl-api]: https://github.com/isabl-io/api
[10 minutes]: contributing
[quick start]: tutorials/quick_start
