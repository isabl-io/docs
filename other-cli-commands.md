---
description: ☄️Isabl comes with a bunch of built-in commands to run from the terminal.
---

# Other CLI commands

## Getting Super Powers

The python package of `isabl-cli` comes with a lot of useful functions that allows you to achieve mainly 3 type of needs:

1. Create and Execute analyses \([See Running Applications](writing-applications.md#running-applications)\)
2. Retrieve information \([See Retrieving Data](retrieve-data.md#isabl-command-line-client)\)
3. and, Import and manage files into your workspace \(See [Importing Data](import-data.md#data-import)\)

    $ isabl --help

    Usage: isabl [OPTIONS] COMMAND [ARGS]...

      Run Isabl command line tools.

    Options:
      --version  Show the version and exit.
      --help     Show this message and exit.

    Commands:
      apps-grch37                GRCh37 applications.
      apps-grcm38                GRCm38 applications.
      get-bams                   Get storage directories, use `pattern` to
                                 match...
      get-bed                    Get a BED file for a given Sequencing...
      get-count                  Get count of database instances.
      get-data                   Get file paths for experiments raw data.
      get-metadata               Retrieve metadata for multiple instances.
      get-outdirs                Get analyses outdirs, use `pattern` to match...
      get-paths                  Get storage directories, use `pattern` to
                                 match...
      get-reference              Retrieve reference data from assemblies...
      get-results                Get analyses results.
      import-bedfiles            Register targets and baits BED files in a...
      import-data                Find and import experiments data from many...
      import-reference-data      Register reference data for assemblies...
      import-reference-genome    Register an assembly reference genome.
      login                      Login with isabl credentials.
      merge-individual-analyses  Merge analyses by individual.
      merge-project-analyses     Merge analyses by project.
      patch-results              Update the results field of many analyses.
      process-finished           Process and update finished analyses.
      rerun-signals              Rerun failed signals.
      run-failed-analyses        Command to run failed analyses in batch.
      run-signals                Run any arbitrary signal on analyses or...
      run-web-signals            Run signals triggered from the frontend.


{% hint style="warning" %}
Some of these commands are only available for the **admin** user, like:

* To manage files and data \([See Importing Data](import-data.md)\):`import-data, import-bedfiles, import-reference-data, import-reference-genome`
* To change permissions of finished analyses: `process-finished`
* To update the linked results of completed analyses: `patch-results`
{% endhint %}

### Create your custom CLI Commands

You can customize your available commands, by extending the `isabl-cli`. The following are examples of cases where you want to create commands that execute more than one app at the same time, or create a method for a common metadata query:

{% code title="my\_commands/cli.py" %}
```python
import datetime
import click
from isabl_cli import options
from isabl_cli import commands
from my_apps import apps


@click.command()
@options.PAIRS
@options.PAIRS_FROM_FILE
@options.SKIP
@options.COMMIT
@options.FORCE
@options.RESTART
@options.QUIET
def triple_caller(commit, force, quiet, restart, skip, pairs, pairs_from_file):
    """
    Command to run THE 3-CALLER pipeline.
    """
    for pipe in [
        apps.CallerOneGRCh37,
        apps.CallerTwoGRCh37,
        apps.CallerThreeGRCh37,
    ]:
        pipe().run(
            tuples=pairs + pairs_from_file,
            commit=commit,
            force=force,
            restart=restart,
            verbose=not quiet,
            run_args=dict(skip=skip),
        )
        

@click.command()
@click.pass_context
def get_succeded_kids_analyses(ctx):
    """
    Command to print information from all Succeded Analyses executed on
    Pediatric Children (age <= 18) of MSK Kids.
    """
    current_year = datetime.datetime.now().year
    filters = dict(
        status="SUCCEEDED",
        targets__center__name="MSK Kids",
        targets__sample__individual__birth_year__gte=(current_year - 18),
    )
    fields = [
        "targets__sample__individual__system_id",
        "pk",
        "status",
        "application__name",
        "application__version",
    ]
    ctx.invoke(
        commands.get_metadata,
        identifiers=None,
        endpoint="analyses",
        field=[i.split("__") for i in fields],
        filters=filters,
        no_headers=False,
        json_=False,
        use_fx=False,
    )

```
{% endcode %}

Then you can add the commands to your CLI Settings \([Learn how to customize your cli](isabl-settings.md#isabl-cli-settings)\):

```python
CUSTOM_COMMANDS = [
    my_commands.cli.triple_caller,
    my_commands.cli.get_succeded_kids_analyses
]
```

Now your custom commands will be available:

```bash
$ isabl --help

Usage: isabl [OPTIONS] COMMAND [ARGS]...

  Run Isabl command line tools.

Options:
  --version  Show the version and exit.
  --help     Show this message and exit.

Commands:
  
  ...
  
  triple_caller                Command to run THE 3-CALLER pipeline.
  get-succeded-kids-analyses   Command to print metadata of all Succeded...
```



