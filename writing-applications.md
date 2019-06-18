---
description: ⚡️Learn how to embed your Applications into Isabl
---

# Writing Applications

## Introduction

_Applications_ are the data processing algorithms that ran over the _Experiments_ sequencing data. And `Isabl` is agnostic as the type of tool you want to run on your data, or the technology the tool is written in. You can have a fastq aligner written in Perl, or a CWL pipeline for running a variant caller written in JAVA and a variant annotator written in R . It doesn't matter, as what Isabl allows you to do is to run your registered _Applications_ in large batches of _Experiments_ by using the available metadata stored in your database. \(See [What isabl is not!](./#what-isabl-is-not)\)

All the logic of the filters to query the _Experiments_ you need, the validations you want to perform on the data, the inputs and outputs that your tools need, as well as how to build the command to execute it, are defined into a **python Isabl Application Class**. 

{% hint style="info" %}
Important Definitions: 

**Application**_**:**_ is a tool registered in Isabl, with an specific version and sequence reference assembly. For instance, Mutect v2.0.0 for GRh37 will be a different Application than Mutect v2.0.0 for hg19 as its results can't be comparable between each other. This means that the fields that make an Application unique are: NAME, VERSION, ASSEMBLY and SPECIES.

**Analysis:** is an Application ran over a list of target Experiments and a list of reference Experiments. The uniqueness of an Analysis is defined by these, so if someone tries to ran the same Application over the same list of targets and references, a new Analysis won't be created and the existing one will be retrieved. Examples of these tuples of targets and references can be: a variant caller ran in a tumor-normal pair, a cross-individual validation all-vs-all individual samples, or an annotation tool ran over a tumor with a pool of normals as reference. 
{% endhint %}

![](https://docs.google.com/drawings/d/e/2PACX-1vQyGMRlI2yezwTOzWGx5kL_MS899ILuU5AwmciVx0uRWwXL2lUbbOEmyWtzi5ZeN0rjkVCnunjK_bi8/pub?w=608&h=558)

### A Class Based Approach

```python
from isabl_cli import AbstractApplication
from isabl_cli import options

from isabl_apps.toil import build_toil_command
from isabl_apps.utils import get_docker_command


class CowSayGRCh37(AbstractApplication):

    NAME = "COWSAY"
    VERSION = "1.0.0"
    ASSEMBLY = "GRCh37"
    SPECIES = "HUMAN"

    cli_help = "Cow say the System ID."
    cli_options = [options.TARGETS]
    application_description = cli_help
    application_settings = {
        "toil": get_docker_command("papaemmelab/toil_say:v0.1.1", "toil"),
        "toil_say": get_docker_command("papaemmelab/toil_say:v0.1.1", "toil_say"),
        "toil_batch_system": "singleMachine",
    }

    def get_experiments_from_cli_options(self, **cli_options):
        return [([i], []) for i in cli_options["targets"]]

    def validate_experiments(self, targets, references):
        self.validate_dna_only(targets + references)

    def get_command(self, analysis, inputs, settings):
        return build_toil_command(
            outdir=analysis.storage_url,
            jobname=self.get_job_name(analysis),
            executable=settings.toil_say,
            batch_system=settings.toil_batch_system,
            args=["--message", f"'System ID {analysis.targets[0].system_id}'"],
            toil=settings.toil,
            restart=settings.restart,
        )

```

### Versioning Applications

```text
NAME = None
VERSION = None
ASSEMBLY = None
SPECIES = None
```

### Application Description

```text
URL = None
application_description = ""
```

### Command Line Configuration

```text
cli_help = ""
cli_options = []
cli_allow_force = True
cli_allow_restart = True
```

## Required Implementations

### Get Experiments From CLI Options

### Validate Experiments

### Get Command

## Application Settings And Inputs

### Application Settings

```text
application_inputs = {}
application_results = {}
application_settings = {}
application_import_strings = {}
```

### Application Inputs

### Dependencies on Other Applications

```text
def get_dependencies
```

## Optional Functionality

### Get Analysis Results

### Get After Completion Status

### Validate Settings

## Submission of Analyses

### Local Submission

### LSF Batch Submission

### Other Schedulers

## Get or Create Analyses

explain what makes an unique analyses

## Project and Individual Level Auto-merge

Not required neither

### Merge Analyses

```text
def merge_project_analyses
```

```text
def merge_individual_analyses
```

### Get Merged Analysis Results

```text
def get_project_analysis_results(
```

```text
def get_individual_analysis_results
```

### Validate Analyses Before Merge

```text
def validate_project_analyses
```

```text
def validate_individual_analyses(
```

### Submitting Analyses Merge

```text
def submit_merge_analysis
```

### Unique Analysis Per Individual

### Protect Results

## Registering Applications

### Custom Client Package

### Patching Applications Settings

## Testing Applications

### Fake Data and Metadata

### Application Containers

## Complete List of Application Settings



