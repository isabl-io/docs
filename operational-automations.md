---
description: >-
  Once you have set up your instance and created a few applications you can now
  automate your processes! In Isabl, this is achieved using signals.
---

# Operational Automations

## Registering Signals

Registering a signal is as simple as adding your signal functions to the appropriate signals in the `Clients` section of the admin website.

## Signals on Data Import

The Data Import signal is triggered after when data is imported into the system. Any implementing trigger functions will receive an experiment object. You can use the metadata of the experiment to determine what automation should be applied.

### Examples

* Trigger assembly/species/category aware alignment
* Perform Gene quantification or Fusion calling in RNA
* Create symlinks to the raw data that are more human accessible

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

## Signals on Analysis Status Change

The Analysis Status Change signal is triggered when the status of an analysis is changed. Any implementing trigger functions will receive the analysis object. You can use the metadata of the experiment to determine what automation should be applied.

### Examples

* Trigger Quality Control/Coverage calculation after alignment has successfully been run
* Trigger Variant Calling after alignment
* Trigger Report Generation after analyses have been completed
* Merge results on a project/individual level basis
* Create symlinks to the analysis output directory that is more human accessible
* Email an analyst letting them know that results are ready to be reviewed

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

