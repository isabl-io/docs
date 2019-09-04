---
description: ⚡️Learn how to embed your Applications into Isabl
---

# Writing Applications

## Introduction

_Applications_ are the data processing algorithms that ran over the _Experiments_ raw data. And `Isabl` is agnostic as the type of tool you want to run on your data, or the technology the tool is written in. You can have a _fastq_ aligner written in Perl, or a CWL pipeline for running a variant caller written in JAVA with a variant annotator written in R . It doesn't matter, as what Isabl allows you to do is to run your registered _Applications_ in large batches of _Experiments_ by using the available metadata stored in your database. \(See [What isabl is not!](./#what-isabl-is-not)\)

All the logic of the filters to query the _Experiments_ you need, the validations you want to perform on the data, the inputs and outputs that your tools need, as well as how to build the command to execute it, are defined into a python **Isabl Abstract Application Class**.

{% hint style="info" %}
Important Definitions:

**Application**_**:**_ is a tool registered in Isabl, with an specific version and sequence reference assembly. For instance, Mutect v2.0.0 for GRh37 will be a different Application than Mutect v2.0.0 for hg19 as its results can't be comparable between each other. This means that the fields that make an Application unique are: NAME, VERSION, ASSEMBLY and SPECIES.

**Analysis:** is an Application ran over a list of target Experiments and a list of reference Experiments. The uniqueness of an Analysis is defined by these, so if someone tries to ran the same Application over the same list of targets and references, a new Analysis won't be created and the existing one will be retrieved. Examples of these tuples of targets and references can be: a variant caller ran in a tumor-normal pair, a cross-individual validation all-vs-all individual samples, a quality-control script over a simple target, or an annotation tool ran over a tumor with a pool of normals as references.
{% endhint %}

![Application examples, with different targets-references requirements.](https://docs.google.com/drawings/d/e/2PACX-1vQyGMRlI2yezwTOzWGx5kL_MS899ILuU5AwmciVx0uRWwXL2lUbbOEmyWtzi5ZeN0rjkVCnunjK_bi8/pub?w=608&h=558)

## A Class Based Approach

The following working example, shows how to register a very simple tool that's available to execute in the system by running:

```bash
docker run papaemmelab/toil_say:v0.1.1 cowsay --message "System ID: DEM_H12000"

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

In order to create an `Isabl` _Application_, `isabl_cli` comes with an abstract class that needs some attributes and methods to be defined.

```python
from isabl_cli import AbstractApplication
from isabl_cli import options

class CowSay(AbstractApplication):

    NAME = "COWSAY"
    VERSION = "1.0.0"
    ASSEMBLY = "BovineMineV1.6"
    SPECIES = "BOVINE"

    cli_help = "Cow say the System ID."
    cli_options = [options.TARGETS]
    application_description = cli_help
    application_settings = {
        "docker": "/usr/bin/docker",
        "image": "papaemmelab/toil_say:v0.1.1",
        "batch_system": "singleMachine",
    }

    def get_experiments_from_cli_options(self, **cli_options):
        return [([i], []) for i in cli_options["targets"]]

    def validate_experiments(self, targets, references):
        for experiment in targets:
            assert experiment['sample']['individual']['species'] == "BOVINE"

    def get_command(self, analysis, inputs, settings):
        return [
            settings.docker,
            "run",
            settings.image,
            "cowsay",
            "--message",
            f"'System ID {analysis.targets[0].system_id}'"
            "--batchSytem",
            settings.batch_system
        ]
```

The following are all the available attributes and methods that can be defined **inside** the Isabl _AbstractApplication_ Class_:_

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
* The `cli_options` attribute is a list of [click.options](https://click.palletsprojects.com/en/7.x/options/), and [`isabl_cli.options`](https://github.com/isabl-io/cli/blob/master/isabl_cli/options.py) comes with a bunch of predefined options to get _Experiments_ by different filter arguments.
* By default, all apps have `--force` and `--restart` options, and `cli_allow_force` and `cli_allow_restart` are flags to opt-out from them. `--force`, allows the user to wipe an analysis' results directory and resubmit it, and `--restart` allows to resubmit it by resuming the analysis without wiping the previous data output.

This is an example of how the cli help will look like:

```bash
$ isabl apps-bovineminev1.6 cowsay-1.0.0 --help

Usage: isabl apps-grch37 cowsay-1.0.0 [OPTIONS]

  Cow say the System ID.

Options:
  --url                           Show the url or main repo of the app.
  -fi, --targets-filters <TEXT TEXT>...
                                  API filters for target experiments
                                  [required]
  --quiet                         Don't print verbose output of the operation.
                                  [default: False]
  --commit                        Submit application analyses.  [default:
                                  False]
  --force                         Wipe unfinished analyses and start from
                                  scratch.
  --restart                       Attempt restarting failed analyses from
                                  previous checkpoint.
  --help                          Show this message and exit.
```

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
...
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
As you can write your own validation logic, `isabl.cli.AbstractApplication`comes with a predefined set of methods that you can use. For more information, take a look at them at the [source code](https://github.com/isabl-io/cli/blob/master/isabl_cli/app.py#L1306) of the project.
{% endhint %}

## Application Settings And Inputs

### Application Settings

`application_settings = {}` is a dictionary of settings for your _Application_ that you expect to be constantly changing. i.e. the path of your executable, the version of the application , or variable inputs of your application such as references or configuration files. These settings will be the default ones, but they can be changed from the _Admin_, without having to change the code or app definition.

```python
...
application_settings = {
    "docker": "/usr/opt/docker_v16/bin/docker",
    "reference_file": "/data/references/grch37.fasta",
    "default_memory_per_node": "4Gb"
}
```

### Application results

`application_results = {}` is a dictionary of output files of your _Application_, and the definition of the type of each one.

```python
...
application_results = {
    "annotated_vcf": {
        "frontend_type": "tsv-file",
        "description": "Annotated Indels from Mutect.",
        "verbose_name": "Annotated Mutect Indels VCF",
        "optional": False,
        "external_link" "https://samtools.github.io/hts-specs/VCFv4.2.pdf"
    }
}
```

Each result has some fields that need to be defined in order to display the result properly in the isabl frontend:

* `frontend_type`: _Required_. It defines the type of the file and the way it should be displayed in the frontend. The following options are available:
  * `text-file`: it's shown as a raw file, and its content is streamed partially as the user requests it.
  * `tsv-file`: it can be shown as raw text or tabulated for easier inspection. i.e. a VCF is a TSV.
  * `string`: it's shown as a string and can't be downloaded.
  * `number`: it's shown as a string and can't be downloaded.
  * `image`: rendered as images and previews are displayed in a gallery in the _Analysis_ View.
  * `html`: rendered as html in an iframe.
  * `pdf`: is not rendered but can be opened in a new window to use the browser pdf viewer.
  * `igv_bam:<name>`:  can be streamed to visualized in an embedded IGV viewer.
* `description` : _Required_. information about the result shown in the _Analysis_ view.
* `verbose_name`: _Required_. name displayed for the result in the results list.
* `optional`: if `False` and result is missing, an alert warning about the missing result will be shown.
* `external_link`: an URL that will allow the user to browse into an external resource to get more information about the obtained result.

### Application Inputs

`application_inputs = {}` is a dictionary of input file paths or values your _Application_ expects to have as input requirements. Each input should be defined as `NotImplemented` and resolved for each analysis during the `get_dependencies` method. See the example in the `get_dependencies` definition.

```python
...
application_inputs = {
    "contamination_file": NotImplemented,
    "ploidy_value": NotImplemented
}
```

### Dependencies on other Applications

```python
...
def get_dependencies(self, targets, references, settings):
    """
    Get dictionary of inputs, this function is run before `get_command`.

    Arguments:
        targets (list): created analysis instance.
        references (list): created analysis instance.
        settings (object): settings namespace.

    Returns:
        tuple: (list of analyses dependencies primary keys, inputs dict).
    """
    return [], {}
```

The main objective of the `get_dependencies` method is to retrieve the necessary dependencies of previous analyses and results that should be linked to the current _Analysis_.

i.e. Let's say in order to run your indels variant annotator you need as requirement your Mutect application has already been ran and completed in the same target and references tuples. Let's suppose Mutect is registered in your database with primary key `10` and its results are: `snvs_vcf` and `indels_vcf`

```python
...
application_inputs = {
    "mutect_indels_vcf": NotImplemented
}

def get_dependencies(self, targets, references, settings):
    input_vcf, analysis_key = self.get_result(
        experiment=targets[0],
        application_key=10,         # Primary key of Mutect in your database
        result_key="indels_vcf",    # Name of the result in your Mutect definition
    )
    return [analysis_key], {"mutect_indels_vcf": input_vcf}
```

### Application Import Strings

`application_import_strings = {}` is a set or list of python import-strings, that you may need imported into your application settings.

## Optional Functionality

### Get Analysis Results

```python
...
def get_analysis_results(self, analysis):
    """
    Get dictionary of analysis results. This function is run on completion.

    Arguments:
        analysis (dict): succeeded analysis instance.

    Returns:
        dict: a jsonable dictionary.
    """
    return {}
```

If your application has defined `application_results`, this method is used to store the results with their respective file paths or values, after the analysis has been ran successfully. For example:

```python
from my_utils import count_variants
from my_utils import plot_variants

...
application_results = {
    "snvs_vcf": {
        "frontend_type": "tsv-file",
        "description": "Mutect snvs variants.",
        "verbose_name": "snvs vcf",
    },
    "snvs_count": {
        "frontend_type": "number",
        "description": "Total number of called variants",
        "verbose_name": "snvs count",
    },
    "snvs_plot": {
        "frontend_type": "image",
        "description": "Distribution plot of variants",
        "verbose_name": "snvs plot",
    }
}

def get_analysis_results(self, analysis):
    outdir = analysis["storage_url"]
    snvs_file = os.path.join(outdir, "results", "snvs,vcf")
    return {
        "snvs_vcf": snvs_file,
        "snvs_count": count_variants(snvs_file),
        "snvs_plot": plot_variants(snsv_file)
    }
```

### Get After Completion Status

```python
...
def get_after_completion_status(self, analysis):
    """Possible values are FINISHED and IN_PROGRESS."""
    return "FINISHED"
```

In certain cases you don't want your analyses to be marked as `SUCCEEDED` after completion, as you may want to flag them for manual review or leave them to know that you need to run an extra step on them. For these cases, you may want to flag them as `FINISHED` or `IN_PROGRESS`.

### Validate Settings

```python
...
def validate_settings(self, settings):
    """Validate settings."""
    return
```

Method to write validation for your _Application_ settings. For instance, check the settings are properly defined, files can be accessed, or they have the proper format, etc.

```python
...
application_settings = {
    "reference": "reference_data_id:genome_fasta",
    "bedfiles_dir": NotImplemented,
    "cores": "16",
}
def validate_settings(self, settings):
    self.validate_reference_genome(settings.reference)
    self.validate_is_dir(settings.reference)
    assert int(settings.core) < 32
```

{% hint style="info" %}
`application_settings` defines the default settings, but during execution your app may have different settings for different clients or environments. For example, you may have a small test reference file for testing and the real one for production. That's why you can define `NotImplemented` by default, but **validate** that it's in fact implemented on execution.
{% endhint %}

## Submission of Analyses

`Isabl` is a framework agnostic of the computing setting you're working on. And it can be configured to work with different batch systems, whether is a Cloud platform or HPC environment. In [MSK](https://www.mskcc.org/) specific use case \(where this project was developed\), we ran our computation in an HPC cluster with IBM LSF scheduler. For us we developed a simple util to wrap the commands depending of the scheduler.

### Local Submission

### LSF Batch Submission

### Other Schedulers

## Get or Create Analyses

explain what makes an unique analyses

## Project and Individual Level Auto-merge

`Isabl` allows you to ran automatic result aggregations on a Project-basis and Individual-basis, as soon as any analysis finishes. For instance: you may want to generate a summary for a Patient report for every time an RNA fusion analysis is ran on an Experiment, or you want to merge all PASS variants of the Experiments that are grouped in a project every time a variant-caller in ran.

For doing this, you can optionally implement the following methods:

### Merge Analyses

```python
...
def merge_project_analyses(self, analysis, analyses):
    """
    Merge analyses on a project level basis.

    If implemented, a new project level analyses will be created. This
    function will only be called if no other analysis of the same
    application is currently running or submitted.

    Arguments:
        analysis (dict): the project level analysis.
        analyses (list): list of succeeded analyses instances.
    """
    pass
```

```python
...
def merge_individual_analyses(self, analysis, analyses):
    """
    Merge analyses on a individual level basis.

    If implemented, a new individual level analyses will be created. This
    function will only be called if no other analysis of the same
    application is currently running or submitted.

    Arguments:
        analysis (dict): the individual level analysis.
        analyses (list): list of succeeded analyses instances.
    """
    pass
```

In these methods, goes the logic or the execution of the commands to perform the results aggregation.

```python
import os
from my_utils import merge_vcfs

...
def merge_project_analyses(self, analysis, analyses):
    all_vcfs = [i["results"]["snvs_vcf"] for i in analyses]
    outfile = os.path.join(analysis['outdir'], 'project_all_snvs.vcf')
    merge_vcfs(all_vcfs, outfile)

def validate_project_analyses(self, project, analyses):
    assert (
        len(analyses) <= 500
    ), "Project level merge only valid for projects with less than 500 samples"

def get_project_analysis_results(self, analysis):
    return {
        "all_snvs": os.path.join(analysis['outdir'], 'project_all_snvs.vcf')
    }
```

### Get Merged Analysis Results

Methods to define the output results, for both project-level and individual-level analyses, the same way is done with [`get_analysis_results`](writing-applications.md#get-analysis-results).

```python
...
def get_project_analysis_results(self, analysis):
    """
    Get dictionary of results for a project level analysis.

    This function is run on completion.

    Arguments:
        analysis (dict): succeeded analysis instance.

    Returns:
        dict: a jsonable dictionary.
    """
    return {}
```

```python
 ...
 def get_individual_analysis_results(self, analysis):
    """
    Get dictionary of results for a individual level analysis.

    This function is run on completion.

    Arguments:
        analysis (dict): succeeded analysis instance.

    Returns:
        dict: a jsonable dictionary.
    """
    return {}
```

### Validate Analyses Before Merge

Methods to write the validation logic when running aggregated analyses:

```python
...
def validate_project_analyses(self, project, analyses):
    """Raise AssertionError if project level analysis logic shouldn't happen."""
    assert True
```

```python
...
def validate_individual_analyses(self, individual, analyses):
    """Raise AssertionError if individual level analysis logic shouldn't happen."""
    assert True
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

