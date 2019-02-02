<div style="text-align: right"> ⏱ <b>tutorial time:</b> 10 minutes </div>

# Quick Start

Welcome to Isabl's 10 minute demo. This tutorial will walk you through:

- [Prerequisites](#prerequisites)
- [Demo setup](#demo-setup)
- [Create project](#create-project)
- [Register samples](#register-samples)
- [Register reference fasta and BED](#register-reference-fasta-and-bed)
- [Import data](#import-data)
- [Run applications](#run-applications)
- [Retrieve and visualize results](#retrieve-and-visualize-results)
- [Wrap up and next steps](#wrap-up-and-next-steps)

## Prerequisites

- [Docker Compose] for building and running the application.

## Demo setup

Let's start by clone the demo:

```bash
git clone https://github.com/isabl-io/demo.git && cd demo
```

Before we get started, we need let the app know where is the demo directory:

```bash
echo DEMO_DIR=`pwd` > isabl_demo/.env
```

Build and run the application (this might take a few minutes):

```bash
./demo-compose build
```

Now we can run the application in the background:

```bash
./demo-compose -d up
```

You will need to create a new user before you can access the system, on a new console run:

```bash
./demo-django createsuperuser
```

Visit your browser at http://localhost:8000/ and log in!

?> **Notes:** `demo-compose`, `demo-django`, and `demo-cli` are simple wrappers around `docker-compose`, check them out. The `isabl_demo` directory was bootsrapped using [cookiecutter-isabl], a proud fork of [cookiecutter-django]! Many topics from their [guide] will be relevant to your project.

## Create project

Creating a project in Isabl is as simple as adding a title. You can also specify optional fields:

![create project gif](../_media/gifs/create_project.gif)

## Register samples

Before we create samples, lets use `isabl-cli` to add choices for *Center*, *Disease*, *Sequencing Technique*, and *Sequencing Platform*:

    ./demo-cli python assets/metadata/create_choices.py

?> New options can also be easily created using the admin site: http://localhost:8000/admin

Now lets add samples from the frontend:

![create project gif](../_media/gifs/add_samples.gif)

## Register reference fasta and BED

Given that `isabl-cli` will move our test data, lets copy original assets into a *staging* directory:

```bash
mkdir -p assets/staging && cp -r assets/data/* assets/staging
```

Now lets import the genome:

```bash
./demo-cli isabl import-reference-genome \
    --assembly GRCh37 \
    --species HUMAN  \
    --genome-path assets/staging/reference/reference.fasta
```

Now import BED files for our demo *Sequencing Technique*:

```bash
./demo-cli isabl import-bedfiles \
    --technique-slug "DNA_TD_DEMO_TECHNIQUE" \
    --targets-path assets/staging/bed/targets.bed \
    --baits-path assets/staging/bed/baits.bed \
    --assembly GRCh37 \
    --species HUMAN \
    --description "Demo BED files"
```

Check created directories:

!> TODO

## Import data

Lets proceed to import data for the samples we just created. Download the test data, import it and retrieve paths from API:

```bash
./demo-cli isabl import-data \
    -di ./assets/staging            `# provide data location ` \
    -fi tags.name "data demo tag"   `# filter samples to be imported ` \
    -id research_id                 `# match files using experiment research id`
```

Now retrieve imported data for the normal to see how directories are created:

    ./demo-cli isabl get-sequencing-data -fi sample.research_id "demo normal"

## Run applications

## Retrieve and visualize results

## Wrap up and next steps

- Learn about [CLI advanced configuration] to customize functionality.

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
[cookiecutter-django]: https://github.com/pydanny/cookiecutter-django
[cookiecutter-isabl]: https://isabl-io.github.io/docs/#/api/settings
[isabl-cli]: https://isabl-io.github.io/docs/#/cli
[cookiecutter]: https://github.com/audreyr/cookiecutter
