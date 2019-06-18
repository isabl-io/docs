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

The following example shows the definition of an example tool, that is available in the system that we will normally run as:

```bash
docker papaemmelab/toil_say:v0.1.1 cowsay --message "System ID: DEM_H12000"

# output:
 ______________________
< System ID DEM_H12000 >
 ----------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

Going step by step, to create an `Isabl` _Application_, `isabl_cli` comes with an abstract class that needs some attributes and methods to be defined. 

```python
from isabl_cli import AbstractApplication
from isabl_cli import options

class CowSayGRCh37(AbstractApplication):

    NAME = "COWSAY"
    VERSION = "1.0.0"
    ASSEMBLY = "GRCh37"
    SPECIES = "HUMAN"

    cli_help = "Cow say the System ID."
    cli_options = [options.TARGETS]
    application_description = cli_help
    application_settings = {
        "docker": "/usr/bin/docker",
        "toil_say": "papaemmelab/toil_say:v0.1.1",
        "toil_batch_system": "singleMachine",
    }

    def get_experiments_from_cli_options(self, **cli_options):
        return [([i], []) for i in cli_options["targets"]]

    def validate_experiments(self, targets, references):
        self.validate_dna_only(targets + references)

    def get_command(self, analysis, inputs, settings):
        return [
            settings.docker,
            "run",
            settings.toil_say,
            "cowsay",
            "--message",
            f"'System ID {analysis.targets[0].system_id}'"
            "--batchSytem",
            settings.batchSystem          
        ]
```

### Versioning Applications

```python
NAME = None
VERSION = None
ASSEMBLY = None
SPECIES = None
```

Unique fields constraints that define an _Application_ in the database.

### Application Description

```python
URL = None
application_description = ""
```

Fields with information about the _Application_, that are shown in the frontend when an Analysis view is displayed.

### Command Line Configuration

```python
cli_help = ""
cli_options = []
cli_allow_force = True
cli_allow_restart = True
```

`Isabl` apps use [Click](https://click.palletsprojects.com/en/7.x/), that is a python library to create command line interfaces \(CLI\) tools. 

* `cli_help` is the verbose description of the app when the user types `--help`.
* The `cli_options` attribute is a list of [click.options](https://click.palletsprojects.com/en/7.x/options/), and `isabl_cli.options` comes with a bunch of predefined options to get _Experiments_ by different filter arguments.
* By default, all apps have `--force` and `--restart` options, and `cli_allow_force` and `cli_allow_restart` are flags to opt-out from them. `--force`, allows the user to wipe an analysis' results directory and resubmit it, and `--restart` allows to resubmit it by resuming the analysis without wiping the previous data output.   

## Required Implementations

### Get Experiments From CLI Options

```python
def get_experiments_from_cli_options(self, **cli_options):
    """
    Must return list of target-reference experiment tuples given the parsed options.
    Arguments:
        cli_options (dict): parsed command line options.
    Returns:
        list: of (targets, references) tuples.
    """
    return [([], [])]
```

The `cli_options` pass input arguments that can be used to query the necessary _Experiments_ in the database, to create list of the tuples with targets and references. For example:

```python
import click
from isabl_cli import api

...
project = click.option(
    "--project",
    help="project primary key",
    required=True,
)
technique = click.option(
    "--technique",
    help="technique identifier",
    default="WG",
)

cli_options =[technique, project]

def get_experiments_from_cli_options(self, **cli_options):
    targets = api.get_instances(
        "experiments", 
        projects=cli_options["project"],
        technique__method=cli_options["technique"]
    )
    return [(targets, [])]

```

### Validate Experiments

```python
def validate_experiments(self, targets, references):
        """
        Must raise UsageError if tuple combination isn't valid else return True.
        Arguments:
            targets (list): list of targets dictionaries.
            references (list): list of references dictionaries.
        Raises:
            click.UsageError: if tuple is invalid.
        Returns:
            bool: True if (targets, references, analyses) combination is ok.
        """
        return True
```

This method is a place to write your _Experiment_ validation logic, and raise an error if any is not what you expect for your _Application_. For example, common validations you may want to do are:

* `validate_bams` : Raise error not all experiments have registered bams.
* `validate_dna_only`: Check all Experiments are DNA.
* `validate_same_technique`: Validate targets and references have same bedfile.
* `validate_are_normals`: Validate all _Experiments_ come from a Normal _Sample._
* `validate_same_individual` : Check targets and references come from same _Individual_.

{% hint style="info" %}
As you can write your own validation logic, `isabl.cli.AbstractApplication` comes with a predefined set of methods that you can use. For more information, take a look at them at the [source code](https://github.com/isabl-io/cli/blob/master/isabl_cli/app.py#L1306) of the project.
{% endhint %}

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



