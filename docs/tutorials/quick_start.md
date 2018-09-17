<div style="text-align: right"> ⏱ **tutorial time**: 10 minutes </div>

# Quick Start

This tutorial will walk you through:

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Create projects and participants](#create-projects-and-participants)
- [Register samples and import data](#register-samples-and-import-data)
- [Run applications and visualize results](#run-applications-and-visualize-results)

## Prerequisites

- [Docker Compose] for building and running the application.
- [Virtualenvwrapper] and `python>=3.6` for the Command Line Interface.

## Installation

This guide will install all infrastructure components (Backend, Frontend and Command Line Interface), if you want to use them separately please refer to the [guides](guide).

?> Our project template is a proud fork of [cookiecutter-django]! Many topics from their [guide] are relevant to your project.

<big>Web Application</big>

First install [cookiecutter] and bootstrap your project:

```bash
# cookiecutter is an utility that creates projects from templates
pip install cookiecutter

# now we bootstrap from bee's cookiecutter
cookiecutter https://github.com/leukgen/cookiecutter-bee
```

Lets proceed to build and run the application:

```bash
cd my_project               # go to your project directory
docker-compose build        # build with docker-compose
docker-compose up           # now run the application
```

You will need to create a new user before you can access the system:

```bash
# run on a separate terminal window from the project directory
docker-compose run --rm django python manage.py createsuperuser
```

Visit your browser at http://localhost:8000/ and log in!

<big>Command Line Client</big>

Lastly, install the Command Line Client:

```bash
mkvirtualenv -p python3 my_project     # optional but strongly recommended
pip3 install bee-cli                   # install bee client
```

?> **Note:** use `workon` to activate a virtual environment, deactivate with `deactivate`.

## Create projects and participants

## Register samples and import data

> **Ad:** Tired of typing long commands? Install [alie] and bring aliases to the future!

Lets proceed to import data for the samples we just created. Download the test data, import it and retrieve paths from API:

```bash
# TODO: download test data and reference genome
curl

# import data for test samples
bee import_data \
    -di quick_start_data               `# provide data location ` \
    -fi research_id__startswith quick  `# filter samples to be imported ` \
    -id research_id                    `# match files with experiment's research id`

# retrieve new data locations from api
bee get_sequencing_data -fi research_id__startswith quick
```

Note that data is stored in your home directory, learn about [CLI advanced configuration] to customize functionality.

## Run applications and visualize results

?> You can type <kbd>Ctrl</kbd>+<kbd>C</kbd> to stop the application.

?> Ready for **production**? learn more about [deployment].

<!-- local -->
[CLI advanced configuration]: guides/cli#configuration
[deployment]: tutorials/deployment

<!-- dependencies -->
[guide]: https://cookiecutter-django.readthedocs.io/en/latest/developing-locally-docker.html#
[full documentation]: https://cookiecutter-django.readthedocs.io/en/latest
[docker compose]: https://docs.docker.com/compose/install/
[virtualenvwrapper]: https://virtualenvwrapper.readthedocs.io/en/latest/install.html#basic-installation
[cookiecutter]: https://github.com/audreyr/cookiecutter
[alie]: https://github.com/jsmedmar/alie
[cookiecutter-django]: https://github.com/pydanny/cookiecutter-django
[cookiecutter-bee]: https://github.com/leukgen/cookiecutter-bee
