---
description: ⚡️Learn how to build Isabl Applications.
---

# Writing Applications

## Introduction

Isabl _Applications_ enable you to systematically deploy data science tools across thousands of _Experiments_ in a metadata driven approach. The most important things to know about applications are:

* Applications are **agnostic** to the underlying tools being utilized.
* Applications can submit analyses to **multiple** compute environments \(local, cluster, cloud\).
* Results are stored as **analyses** for which uniqueness is a function of the experiments used.
* Once implemented, applications can be deployed across any subset of experiments in the database.

{% hint style="info" %}
Isabl applications are not Workflow Management Systems \(see [what Isabl is not trying to solve](./#what-isabl-is-not)\). Instead they use metadata to systematically build and deploy any type of execution commands across thousands of experiments.
{% endhint %}

### How Does an Application Look Like?

During this tutorial we will build a hello world application that show cases the functionalities and advantages of processing data with Isabl. Here is a really simple example of an Isabl application that echoes an experiment's sample identifier and it's raw data.

{% code-tabs %}
{% code-tabs-item title="hello\_world/apps.py" %}
```python
from isabl_cli import AbstractApplication
from isabl_cli import options


class HelloWorldApp(AbstractApplication):

    NAME = "HELLO WORLD"
    VERSION = "1.0.0"
    cli_options = [options.TARGETS]

    def get_command(self, analysis):
        experiment = analysis.targets[0]  
        return f"echo {experiment.sample.identifier} {experiment.raw_data} "

```
{% endcode-tabs-item %}
{% endcode-tabs %}

This application can now be executed system-wide using:

```bash
isabl apps hello-world --filters projects 102
```

{% hint style="info" %}
`cli_options` enabled us to run the app across multiple experiments using RESTful API filters \(i.e. `--filters`\). We will learn more about how to link experiments with analyses [later](writing-applications.md#command-line-configuration).
{% endhint %}

### Analyses and Results

Results produced by applications are stored as analyses. The uniqueness of an analysis is determined by the experiments associated with it. Specifically, analyses can be linked to multiple _targets_ and _references_ experiments \(e.g. tumor-normal pairs\).  The possibility of linking analyses to multiple experiments allow for a wide variety of experimental designs:

* Single target analyses \(e.g. quality control applications\).
* Tumor-normal pairs \(e.g. variant calling applications\).
* One target vs. a pool of references \(e.g. copy number applications\).
* Multiple targets agains multiple references \(e.g. all vs. all contamination testing\).

Importantly, if someone tries to run the same application over the same experiments, a new analysis won't be created and but the existing one will be retrieved.

![Isabl applications are python classes with the role of constructing, validating, and deploying commands for tools \(or pipelines\) into compute environments across several samples, all guided by metadata retrieved from Isabl API.](.gitbook/assets/image%20%281%29.png)

### Getting Started with Isabl Applications

You should store your applications and custom Isabl logic in your own python package. [Cookiecutter Apps](https://github.com/isabl-io/cookiecutter-apps) will help you bootstrap your own Isabl project:

```bash
# first make sure you have cookiecutter installed
pip install cookiecutter

# now lets bootstrap your project
cookiecutter https://github.com/isabl-io/cookiecutter-apps

# finally install you project in a new virtual environment
cd <project-name> && pip install -r requirements.txt
```

An example of a project generated with  [Cookiecutter Apps](https://github.com/isabl-io/cookiecutter-apps) its available [here](https://github.com/isabl-io/example_apps). This project, and every project created with Cookiecutter Apps includes the hello world application described in this tutorial, check it out [here](https://github.com/isabl-io/example_apps/blob/master/example_apps/apps/hello_world/apps.py). Now let's learn about writing apps!

### Registering Applications

To make sure your applications are available when running `isabl --help`, make sure you add them to the client setting [**`INSTALLED_APPLICATIONS`**](isabl-settings.md#isabl-cli-settings): 

```javascript
"INSTALLED_APPLICATIONS": [
    "example_apps.apps.HelloWorldApp",
] 
```

## Creating Applications

All Isabl Applications inherit from `isabl_cli.AbstractApplication`and are configured using a class based approach. Your role is to override attributes and methods to drive the behavior of your app. 

{% hint style="info" %}
Applications are represented both with a python class and a database object. The database object is created and updated automatically when the application is run.
{% endhint %}

### Versioning Applications

Applications are uniquely versioned by setting the `NAME` and `VERSION` attributes. The version of an application is not necessarily the version of the underlying tool being executed:

```python
class HelloWorldApp(AbstractApplication):

    NAME = "Hello World"
    VERSION = "1.0.0"
```

{% hint style="info" %}
A good strategy to version applications is to ask the question: _are results comparable across experiments?_ An optimization that doesn't change outputs might not require a version change.
{% endhint %}

Optionally you can also set `ASSEMBLY` and `SPECIES` to version the application as a function of a given genome assembly. This is particularly useful for NGS applications as often results are only comparable if data was analyzed against the same version of the genome: 

```python
class HelloWorldApp(AbstractApplication):

    NAME = "Hello World"
    VERSION = "1.0.0"
    ASSEMBLY = "GRCh37"
    SPECIES = "HUMAN"
```

You can add additional metadata to be attached to the database object, such as an application description and URLs \(or comma separated URLs\):

```python
class HelloWorldApp(AbstractApplication):
    
    application_description = "An App to show case different Isabl functionalities."
    application_url = "https://docs.isabl.io/writing-applications"
```

### Application Settings

Applications can depend on multiple configurations such as paths to executables, references files, compute requirements, etc. These settings are explicitly defined using the `application_settings` dictionary:

```python
class HelloWorldApp(AbstractApplication):

    application_import_strings = {"sym_link"}
    application_settings = {
        "echo_path": "echo",
        "default_message": "Hello World",
        "sym_link": "isabl_cli.utils.force_symlink"
    }
```

{% hint style="info" %}
If a setting is meant to be imported, include it in `application_settings_import_strings`.
{% endhint %}

Optional settings can be set to `None` whilst required but not yet defined settings can be set to the`NotImplemented` python object. Settings defined in the application python class are considered to be the _default settings_, yet they can be overridden using the database application field `settings`. 

```python
> HelloWorldApp().application.settings
{
   # settings as a function of Isabl CLI client's primary key
   1: {"echo_path": "/usr/local/bin/echo"}  
}
```

Note that `application.settings` are a function of the [client's primary key](https://TODO.org). This enables you to run the sample application in different compute architectures. You can configure `application.settings` using the Django Admin site or the application method `patch_application_settings`:

```python
HelloWorldApp().patch_application_settings(
    client_id=1,
    echo_path="/usr/bin/echo"
)
```

{% hint style="info" %}
If the value of a setting is a dictionary, the _schema_ \(i.e. keys\) of that setting **will be validated** unless the dictionary contains `"skip_check": True.`
{% endhint %}

### Validate Application Settings

You can make sure applications are properly configured by performing settings validation. To do so, simply define `validate_settings` and raise an `AssertionError` if something is not set properly:

```python
from shutil import which

class HelloWorldApp(AbstractApplication):

    def validate_settings(self, settings):
        assert which(settings.echo_path), f"{settings.echo_path} not in PATH"
```

{% hint style="info" %}
The`application_settings` dictionary defines _default settings_, but during execution your app may have different settings for clients or environments. For example, you may have a small test reference file for testing and the real one for production. That's why you can define `NotImplemented` by default, but **validate** that it's in fact implemented on execution.
{% endhint %}

## Running Applications

Applications can be launched from both the command line and from python \(we will learn more about the latter in the [operational automations guide](operational-automations.md)\). 

### Command Line Configuration

To support CLI capabilities you have to tell the application how to link analyses to experiments using command line options:

```python
from isabl_cli import options

class HelloWorldApp(AbstractApplication):

    cli_help = "This is the Hello World App - a way to learn Isabl applications."
    cli_options = [options.TARGETS]
```

The attribute `cli_options` is set to a list of [Click Options](https://click.palletsprojects.com/en/7.x/options/) that will be used to retrieve experiments from the API and link them to new analyses. Out of the box, Isabl supports the following CLI options to retrieve experiments:

| `isabl.options` | Description |
| :--- | :--- |
| **`TARGETS`** | Enable `--filters (-fi)` to provide key value pair of RESTful API filters used to retrieve experiments \(e.g. `-fi sample.category TUMOR`\). Each experiment will be linked to a new analysis in a one-to-one basis using the _analysis.targets_ field.  |
| **`PAIRS`**, **`PAIR`**, **`PARS_FROM_FILE`**  | Enable `--pairs (-p), --pair (-p), --paris-from-file (-pf)` to provide pairs of target, reference experiments \(e.g. `-p TUMOR-ID NORMAL-ID`\). Each pair will be linked to a new analysis \(_targets_ list is one experiment, _references_ list is one experiment\).  |
| **`REFERENCES`**, **`NULLABLE_REFERENCES`** | Enable `--references-filters (-rfi)` to provide filters to retrieve reference experiments. This has to be coupled with**`TARGETS`**, each analysis will then be linked to one target, and to as many references. |

When these options are not adequate for your experimental design, you can implement `get_experiments_from_cli_options`_._ This function takes the _evaluated_ `cli_options` and must return a list of tuples: one tuple per analysis, each tuple with **2** lists: the target experiments and the reference experiments. Here is a an example of an application that creates only one analysis linked to all Whole Genome experiments in a project:

```python
from isabl_cli import api
import click

class HelloWorldApp(AbstractApplication):

    cli_options = [
        click.option("--project", help="project key", required=True),
        click.option("--method", help="technique method", default="WG"),
    ]

    def get_experiments_from_cli_options(self, **cli_options):
        project = cli_options["project"]
        method = cli_options["method"]
        filters = dict(projects=project, technique__method=method)
        targets = api.get_instances("experiments", **filters)
        return [(targets, [])]  # will result in only one analysis
```

By default, applications come with `--force` to remove and start analyses from scratch, `--restart` to run failed analyses again without trashing them, `--local` to run analyses locally, one after the other:

```python
class HelloWorldApp(AbstractApplication):

    cli_allow_force = True
    cli_allow_restart = True
    cli_allow_local = True
```

As such, the CLI configuration for our Hello World app will result in the following help message:

```bash
$ isabl apps hello-world-1.0.0 --help

Usage: isabl apps hello-world-1.0.0 [OPTIONS]

  This is the Hello World App - a way to learn Isabl applications.

Options:
  --targets-filters       API filters for target experiments [required] <TEXT TEXT>...
  --commit                Submit application analyses.  [default: False]
  --force                 Wipe unfinished analyses and start from scratch.
  --restart               Attempt restarting failed analyses from previous checkpoint.
  --help                  Show this message and exit.
```

{% hint style="success" %}
You can use`cli_options` to include any other argument your app may need in order to successfully build and deploy data processing tools.
{% endhint %}

### Validate Experiments Before Creating Analyses

Some of the advantages of metadata-driven applications is that we can prevent analyses that don't make sense, for example running a variant calling application on imaging data. Simply raise an `AssertionError` if something doesn't make sense, and the error message will be provided to the user:

```python
class HelloWorldApp(AbstractApplication):

    def validate_experiments(self, targets, references):
        assert len(targets) == 1, "only one target experiment per analysis"
        assert targets[0].raw_data, "target experiment has no linked raw data"
        self.validate_dna_only(targets)  # multiple validators are readily available
```

Analyses are understood to be unique if their _targets_, _references_, and _application_ are the same \([as well as previously linked dependencies](writing-applications.md#dependencies-on-other-applications)\). If you need custom _get or create_ logic, you can override the `get_or_create_analyses` method.

{% hint style="info" %}
`AbstractApplication`comes with [readily available validators](https://github.com/isabl-io/cli/blob/master/isabl_cli/app.py#L1306) that you may want to use. Here are some examples of commonly used ones:

* **`validate_dna_only`** Check technique category is`DNA.`
* **`validate_same_technique`** Validate experiments have same experimental technique.
* **`validate_same_individual`** Check experiments come from same individual.
{% endhint %}

### Building Commands Using Metadata

Now that we know how to link analyses to experiments, lets dive into creating data processing commands. Our only objective is to use the _analysis_ and _settings_ objects to build a `shell` command and return it as a string \(ignore `inputs` for now, we will learn more about it when specifying [application dependencies](writing-applications.md#dependencies-on-other-applications)\).

```python
from os.path import join
import click

class HelloWorldApp(AbstractApplication):
    
    cli_options = [options.TARGETS, click.option("--message")]
    
    def get_command(self, analysis, inputs, settings):
        echo = settings.echo_path
        target = analysis.targets[0]
        message = settings.run_args.message or settings.default_message
        output_file = join(analysis.storage_url, "output.txt")
        input_file = join(analysis.storage_url, "input.txt")
        settings.sym_link(target.raw_data[0].file_url, input_file)
        return (
            f"bash -c '{echo} Sample: {target.sample.identifier} > {output_file}' && "
            f"bash -c '{echo} Message: {message} >> {output_file}' && "
            f"bash -c '{echo} Data: >> {output_file}' && "
            f"bash -c 'cat {input_file} >> {output_file}' "
        )
```

All options passed in `cli_options` are available during `get_command` using the settings attribute `run_args`. In this simple example, we allowed the user to pass a custom `--message`.

{% hint style="info" %}
Isabl is **agnostic** to compute architecture, `get_command` does not need to worry about HPC schedulers, or cloud architecture \(e.g. LSF, AWS\), it's only role is to return a shell command.
{% endhint %}

### Submitting Analyses to Compute Architectures

`Isabl` is a framework agnostic of the computing setting you're working on. And it can be configured to work with different batch systems, whether is a Cloud platform or HPC environment. In [MSK](https://www.mskcc.org/) specific use case \(where this project was developed\), we ran our computation in an HPC cluster with IBM LSF scheduler. For us we developed a simple util to wrap the commands depending of the scheduler.

#### LSF Batch Submission

Isabl comes with prebuilt logic to submit thousands of analyses to `LSF`, to do so simply set the Isabl CLI setting [**`SUBMIT_ANALYSES`**](isabl-settings.md#isabl-cli-settings) as follows:

```javascript
"SUBMIT_ANALYSES": "isabl_cli.batch_systems.lsf.submit_lsf",
```

This submitter can check for the following configurations in [**`SUBMIT_CONFIGURATION`**](https://app.gitbook.com/@isabl/s/docs/~/edit/drafts/-Lo6bCi7iKfY_zd4B8U1/isabl-settings#isabl-cli-settings):

| Configuration Name | Type | Description |
| :--- | :--- | :--- |
| **`get_requirements`** | Import String | An import string to a function that will determine LSF requirements as a function of the experimental methods, see below. |
| **`extra_args`** | String | Default LSF args to be used across all submissions. |
| **`throttle_by`** | Integer | The total number of analyses that are allowed to run at the same time \(default is 50\). |

The method `get_requirements` must take the application and a list of targets' technique methods \(which are submitted together in the same job array\):

```python
def get_lsf_requirements(app, targets_methods):
    if isinstance(app, apps.HelloWorldApp):
        memory = 10 if "WG" in targets_methods else 1
        return f"-n {1} -R 'rusage[mem={memory}]'"
```

#### Other Schedulers

You can implement [**`SUBMIT_ANALYSES`**](isabl-settings.md#isabl-cli-settings) ****functions for other schedulers, the function must take a list of tuples, each tuple being an analysis and the analysis script. 

## Application Results

You can provide an specification your application results using the `application_results` dictionary. Each key is a result _id_ and the value is a dictionary with specs of the result:

```python
class HelloWorldApp(AbstractApplication):

    application_results = {
        "input": {
            "frontend_type": "text-file",
            "description": "Symlink to experiment raw data.",
            "verbose_name": "Hello World Input",
            "external_link": "https://en.wikipedia.org/wiki/Symbolic_link",
        },
        "output": {
            "frontend_type": "text-file",
            "description": "Sample id, hello world message, and content of raw data.",
            "verbose_name": "Hello World Result",
            "external_link": "https://hello.world/",
        },
        "count": {
            "frontend_type": "number",
            "description": "Count of characters in output file.",
            "verbose_name": "Characters Count",
        },
    }
```

{% hint style="info" %}
By default, all applications come with 3 default settings `command_script`, `command_log`, and `command_err`. These point to the standard output, standard error, and analysis head job command, respectively.
{% endhint %}

Results can be paths to files, strings \(e.g. MD5s\), numbers, and any other serializable value. Here is a full list of the different specifications a result can have:

* **`description`** Information about the result \(required\)
* **`verbose_name`** Name displayed for the result in the results list \(required\)
* **`optional`**If `False`and result is missing, an alert will be shown online \(optional\)
* **`external_link`** URL to a resource that may explain about the result \(optional\)
* **`frontend_type`** Defines [how the result should be displayed](writing-applications.md#frontend-result-types) in the frontend.

{% hint style="info" %}
By default, analysis results are protected upon completion \(i.e. permissions are set to read only\). If you want your application to be re-runnable indefinitely, set `application_protect_results = False`.
{% endhint %}

### Frontend Result Types

Here is a full list of the result types that are supported for rendering in Isabl Web:

| Frontend Type | Description |
| :--- | :--- |
| **`text-file`** | It's shown as a raw file, and its content is streamed as the user requests it. |
| **`tsv-file`** | It can be shown as raw text or tabulated for easier inspection \(i.e. VCF, TSV\). |
| **`string`**, **`number`** | It's shown as a string and can't be downloaded. |
| **`image`** | Previews are displayed in a gallery in the _analysis_ view. |
| **`html`**, **`pdf`** | Rendered as html in an `iframe`. |
| **`igv_bam[:index]`** | Can be streamed to visualized in an embedded IGV viewer. If another result called `bai` is the BAM index, you can set it to`igv_bam:bai`. |

### Re-runnable Applications

By default, analysis results are protected upon completion \(i.e. permissions are set to read only\). If you want your application to be re-runnable indefinitely, set:

```python
class HelloWorldApp(AbstractApplication):

    application_protect_results = False
```

### Databasing Analysis Results

When `application_results` is defined, you must implement `get_analysis_results`. This method must return a serializable dictionary of results and its only run after the analysis has been completed successfully. For our example it can be something like:

```python
class HelloWorldApp(AbstractApplication):

    def get_analysis_results(self, analysis):
        output = join(analysis.storage_url, "output.txt")

        with open(output) as f:
            count = sum(len(i) for i in f)

        return {
            "input": join(analysis.storage_url, "input.txt"),
            "output": output,
            "count": count
        }
```

### Project and Individual Level Auto-merge

Isabl applications can produce auto-merge analyses at a _project_ and _individual_ level. For example, you may want to merge variants whenever new results are available for a given project, or update quality control reports when a new sample is added to an individual. A newly versioned analysis will be created for each type of auto-merge and your role is to take a list of succeeded analysis and implement the merge logic.

```python
class HelloWorldApp(AbstractApplication):

    application_project_level_results = {
        "merged": {
            "frontend_type": "text-file",
            "description": "Merged output files.",
            "verbose_name": "Merged Output Files",
        },
        "count": {
            "frontend_type": "number",
            "description": "Count of characters for merged output.",
            "verbose_name": "Merged Outth put Characters Count",
        },
    }
    
    def merge_project_analyses(self, analysis, analyses):
        with open(join(analysis.storage_url, "merged.txt"), "w") as f:
            for i in analyses:
                with open(i.results.output) as output:
                    f.write(output.read())

    def get_project_analysis_results(self, analysis):
        merged = join(analysis.storage_url, "merged.txt")

        with open(merged) as f:
            count = sum(len(i) for i in f)

        return {"merged": merged, "count": count}
    
    # we can reuse the project merge logic at the individual level
    application_individual_level_results = application_project_level_results
    merge_individual_analyses = merge_project_analyses
    get_individual_analysis_results = get_project_analysis_results
```

{% hint style="info" %}
You can validate analyses before running the merge operation by implementing validate\_project\_analyses, and validate\_individual\_analyses.
{% endhint %}

#### Submitting Merge Analysis to A Compute Architecture

Merge operations are triggered automatically when the last analysis that is meant to be merged finish running. By default, the merge operation will be conducted right after the analysis is patched to `SUCCEEDED`. However, you can define how merge analyses are submitted using Isabl CLI setting [**`SUBMIT_MERGE_ANALYSIS`**](isabl-settings.md#isabl-cli-settings). For example in `LSF`:

```python
import subprocess

def submit_merge_analysis_to_lsf(instance, application, command):
    """Submit project merge to LSF."""
    command = ["bsub", "-n", "1", "-W", "40000", "-M", "32"] + command.split()
    subprocess.check_call(command)
    print("Submited merge analysis using: " + " ".join(command))
```

## Optional Functionality

This section lists additional optional functionality supported by Isabl applications. Particularly, dependencies on other applications, after completion analyses status, and unique analyses per individual.

###  Analyses Inputs and Dependencies on Other Applications

Application _inputs_ are analysis-specific settings \(_settings_ are the same for all analyses, yet _inputs_ are potentially different for each analysis\). Inputs can be formally defined using `application_inputs`, inputs set to `NotImplemented` are considered required and must be resolved using `get_dependencies`:

```python
from isabl_cli import utils


class HelloWorldApp(AbstractApplication):
  
    application_inputs = {"previously_generated_result": NotImplemented}

    # get dictionary of inputs this function is run before get_command.
    # must return a tuple: (list of analyses dependencies primary keys, inputs dict)
    def get_dependencies(self, targets, references, settings):
        result, analysis_key = utils.get_result(  # return result value and key of analysis that generated it
            experiment=targets[0],                # get result for the first target experiment
            application_key=123,                  # primary key of previous app in database
            result_key="a_result_name",           # name of result in the app definition
        )

        return [analysis_key], {"previously_generated_result": result}
```

{% hint style="info" %}
The main objective of `application_inputs` and `get_dependencies`is to retrieve results and analyses that should be linked to the newly created analysis. Linked analyses are accessible from the analysis detail frontend view.
{% endhint %}

### Get After Completion Status

In certain cases you don't want your analyses to be marked as `SUCCEEDED` after completion, as you may want to flag them for manual review or leave them to know that you need to run an extra step on them. For these cases, you may want to set the _after-completion_ status to `IN_PROGRESS`:

```python
class HelloWorldApp(AbstractApplication):
    def get_after_completion_status(self, analysis):
        return "IN_PROGRESS"
```

### Unique Analysis Per Individual

It is possible to create applications that are unique at the individual level. To do so set `unique_analysis_per_individual = True`. A good example of a unique per individual application could be a patient centric report that aggregates results across all samples. If you are interested on how analyses for these applications are created, give a look at `AbstractApplication.get_individual_level_analyses.`

{% hint style="info" %}
Individual Level Auto-Merge and Unique Analyses Per Individual are different concepts. Applications that require a unique analysis per individual **don't** support individual level auto-merge. 
{% endhint %}

## Testing Applications

Our goal is to make it extremely easy to test your applications. Ideal apps can be tested locally, with fake/dummy data using _factory-created_ database instances. [Isabl CLI](https://github.com/isabl-io/cli) and [Cookiecutter Apps](https://github.com/isabl-io/cookiecutter-apps) come with a range of utilities to help you test your applications.

### Useful Pytest Fixtures

If you created your project using [Cookiecutter Apps](https://github.com/isabl-io/cookiecutter-apps), the following `pytest` fixtures are available to you: 

| Name | Description |
| :--- | :--- |
| **`commit`** | Enables you to run `pytest` using a `--commit` flag, this flag can [later](writing-applications.md#application-test-example) be used to actually commit the application. |
| **`datadir`** | Path to the dummy data directory. Your tests directory comes with a `data` folder, which can be populated with dummy, small files - useful to run your apps. |
| **`tmpdir`** | This is like the regular pytest [`tmpdir`](http://doc.pytest.org/en/latest/tmpdir.html) yet it comes with some perks. First, it sets the current [**`DATA_STORAGE_DIRECTORY`**](isabl-settings.md#isabl-cli-settings) to a temporary directory. Second, it comes with `tmpdir.docker`, a method to create executable scripts to docker containers and with specific `entrypoints`. For example `tmpdir.docker("ubuntu", "echo")` creates an executable script that calls `echo` using an Ubuntu image. |

Look at the [test example](https://app.gitbook.com/@isabl/s/docs/~/edit/drafts/-Lo6bCi7iKfY_zd4B8U1/writing-applications#application-test-example) to learn how use these fixtures.

### Creating Fake Data and Metadata

Isabl CLI comes with a full set of factories that facilitate the creation of fake metadata. Here is an example of how to create two experiments for the same sample:

```python
from isabl_cli import api
from isabl_cli import factories


meta_data = factories.ExperimentFactory()
meta_data["sample"]["individual"]["species"] = "HUMAN"
experiment = api.create_instance("experiments", **meta_data)
assert experiment.pk > 0, "failed to create database instance"
```

{% hint style="info" %}
We recommend limiting use of these factories to development instances of Isabl API. By default, `ISABL_API_URL` is set to [http://0.0.0.0:8000/api/v1/](http://0.0.0.0:8000/api/v1/). 
{% endhint %}

Being able to actually run the applications \(i.e. passing `--commit`\) during testing might be something valuable to you. In the case of Next Generation Sequencing, for example, you could create fake BAMs and really small reference genomes \(few KBs\) to test variant calling applications.

### Application Test Example

Here is a comprehensive example to test our `HelloWorldApp`, projects created [Cookiecutter Apps](https://github.com/isabl-io/cookiecutter-apps) will include this test:

```python
def test_hello_world_app(tmpdir, datadir, commit):
    # path to hello_world test data
    hello_world_datadir = join(datadir, "hello_world")
    raw_data = [
        dict(
            file_url=join(hello_world_datadir, "test.txt"),
            file_data=dict(extra="annotations"),
            file_type="FASTQ_R1",
        ),
    ]

    # overwrite default configuration for the default client
    meta_data = factories.ExperimentFactory(raw_data=raw_data)
    meta_data["sample"]["individual"]["species"] = "HUMAN"
    meta_data["storage_url"] = hello_world_datadir
    experiment = api.create_instance("experiments", identifier="a", **meta_data)

    # create files if you may test with real data at some point
    app = HelloWorldApp()
    app.application.settings.default_client = {
        "default_message": "Hello from Elephant Island.",
        "echo_path": tmpdir.docker("ubuntu", "echo")
    }

    # run application and make sure results are reported
    utils.assert_run(
        application=app,
        tuples=[([experiment], [])],
        commit=commit,
        results=["output", "count", "input"],
    )
```

{% hint style="info" %}
[The actual test](https://github.com/isabl-io/example_apps/blob/master/tests/test_hello_world.py) is much more comprehensive. It creates two experiments per individual and validates that [auto-merge](writing-applications.md#project-and-individual-level-auto-merge) was actually conducted, that the application is [re-runnable](writing-applications.md#re-runnable-applications), and that the [command line configuration](writing-applications.md#command-line-configuration) works well.
{% endhint %}

