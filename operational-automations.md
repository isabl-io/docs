---
description: "\U0001F916 Once you have set up your Isabl instance and created a few applications you can now automate your processes! In Isabl, this is achieved using signals."
---

# Operational Automations

## Registering Signals

Signals are python functions that take _one_ argument: an **experiment** or an **analysis**. Signals for experiments are triggered on data import, whilst signals for analyses are triggered on status change \(i.e.  analysis failure or completion\). Register signals by including the function import string in either [**`ON_STATUS_CHANGE`**](isabl-settings.md#isabl-cli-settings) or [**`ON_DATA_IMPORT`**](isabl-settings.md#isabl-cli-settings) Isabl CLI settings: 

```python
# experiments signals are triggered on data import
"ON_DATA_IMPORT": [
    "my_apps.signals.trigger_apps"
]

# analyses signals are triggered on status change
"ON_STATUS_CHANGE": [
    "my_apps.signals.trigger_dependencies"
]
```

### Signals on Data Import

Signals for experiments are triggered on data import and receive the experiment object as its only argument. You can use the metadata of the experiment to determine what automation should be applied. 

```python
from isabl_apps import apps


def signal_data_import(experiment):
    """Run upon data import using the cli."""
    species = experiment.sample.individual.species
    category = experiment.technique.category
    dna_aligner = {"HUMAN": apps.BwaMemGRCh37, "MOUSE": apps.BwaMemGRCm38}.get(species)
    tuples = [([experiment], [])]

    if category == "DNA" and dna_aligner:
        dna_aligner().run(tuples=tuples, commit=True)
```

Some examples are:

* Trigger assembly/species/category aware alignment
* Perform Gene quantification or Fusion calling in RNA
* Create symlinks to the raw data that are more human accessible

### Signals on Analysis Status Change

Analyses signals are triggered on status change. Each signal will receive the analysis object as its only argument. You can use the metadata of the experiment to determine what automation should be applied. 

```python
from isabl_apps import apps


def signal_apps_automation(analysis):
    """Run upon an analysis status update in the database."""
    qc_app = {
        "GRCh37": apps.QualityControlGRCh37,
        "GRCm38": apps.QualityControlGRCm38,
    }.get(analysis.application.assembly.name)

    if (
        analysis.status == "SUCCEEDED"
        and analysis.application.name in ["DISAMBIGUATE", "BWA_MEM", "STAR"]
        and qc_app
    ):
        qc_app().run(tuples=[(analysis.targets, [])], commit=True)
```

Some examples are:

* Trigger Quality Control/Coverage calculation after alignment has successfully been run
* Trigger Variant Calling after alignment
* Trigger Report Generation after analyses have been completed

## Working with Signals

Here are a few examples of how to work with signals, trigger them, and get notified if signals fail.

### Running Signals Manually

You can trigger signals manually with Isabl CLI:

```bash
# experiment signals
isabl run-signals experiments -s my_apps.signals.trigger_apps -fi projects 100 

# analyses signals
isabl run-signals analyses -s my_apps.signals.trigger_dependencies -fi projects 100 
```

### Rerunning Failed Signals

When signals fail during automation, database records are created to keep track of this event. Rerun failed signals with:

```bash
# rerun all failed signals
isabl rerun-signals

# rerun failed signals using filters
isabl rerun-signals \
    -fi import_string my_apps.signals.trigger_apps \
    -fi target_endpoint analyses \
    -fi target_id <an analysis primary key>
```

### Get Notified When Signals Fail

You can configure Isabl API to periodically check if any signal has failed and send you email notifications. To do so, head to the admin site at `/admin/django_celery_beat/periodictask/add/` and in _Task \(registered\)_ select `isabl_api.tasks.report_failed_signals_task`, then create a 15 minutes interval, and hit save:

![](.gitbook/assets/image%20%283%29.png)



