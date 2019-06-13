# Writing Applications

## Introduction

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



