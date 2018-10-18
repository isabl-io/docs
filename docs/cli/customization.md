
# Customization

The CLI packages aims to be as flexible and customizable as possible. In a way that several functions can be replaced, or new commands can be added.

## Create my own custom 🕹 `isabl-cli` tool {docsify-ignore}

?> The best way of doing this is using the [cookiecutter-cli], which generates the template of an example cli tool that extends [isabl-cli].

An example of how to get a custom isabl_cli, is just to:

```bash
pip install cookiecutter
cookiecutter https://github.com/isabl-io/cookiecutter-cli
```

The cookiecutter prompts for some configuration settings, if you choose to name the new package `my_awesome_cli`, then after installing it you can access to run it:

```bash
pip install -r requirements.txt
my_awesome_cli --help
```

You will notice that an example new command is added, called `say-message`, that just prints a message and exits.

```bash
my_awesome_cli say-message --message 'isable is awesome!'
```

## Customizable Settings {docsify-ignore}

The `_DEFAULTS` dictionary in [`isabl_cli.settings`] contains the values that can be overwritten or extended in order to control functionality:

* **API_BASE_URL**: url host where your [isabl api](api/) is running. Needed to connect the CLI with the API.
    * Type: `String`
    * Default: `'http://0.0.0.0:8000/api/v1'`

* **BASE_STORAGE_DIRECTORY**: Directory where data will be store in the file system.
    * Type: `Path String`
    * Default: `'~/isabl_storage'`

* **TIME_ZONE**: Current timezone used by [pytz] package.
    * Type: `String`
    * Default: `'America/New_York'`

* **INSTALLED_APPLICATIONS**: Array of registered applications to be run with the cli tool. These apps can be seen and run with `isabl apps --help`.
    * Type: `Array of Method Import Strings`
    * Default: `[]`

* **CUSTOM_COMMANDS**: Array of custom commands to be added to the custom cli tool.
    * Type: `Array of Method Import Strings`
    * Default: `[]`

* **SYSTEM_COMMANDS**: Array of system commands that are used in isabl-cli.
    * Type: `Array of Method Import Strings`
    * Default: See [SYSTEM_COMMANDS][`isabl_cli.settings`]

* **ADMIN_COMMANDS**: Array of commands that are only executable by admin.
    * Type: `Array of Method Import Strings`
    * Default: See [ADMIN_COMMANDS][`isabl_cli.settings`]

* **ADMIN_USER**: <PENDING>
    * Type: `Class Import String`
    * Default: `<PENDING>`

* **MAKE_STORAGE_DIRECTORY**: Get and create path to a data directory.
    * Type: `Method Import String`
    * Default: `'isabl_cli.data.make_storage_directory'`

* **TRASH_ANALYSIS_STORAGE**: Move analysis `storage_url` to a trash directory.
    * Type: `Method Import String`
    * Default: `'isabl_cli.data.trash_analysis_storage'`

* **REFERENCE_DATA_IMPORTER**: Register input_bed_path in technique's storage dir and update `data`.
    * Type: `Class Import String`
    * Default: `'isabl_cli.data.ReferenceDataImporter'`

* **DATA_IMPORTER**: Import raw data for multiple experiments.
    * Type: `Class Import String`
    * Default: `'isabl_cli.data.DataImporter'`

* **BED_IMPORTER**: Register input_bed_path in technique's storage dir and update `data`.
    * Type: `Class Import String`
    * Default: `'isabl_cli.data.BedImporter'`

* **FASTQ_READ_SUFFIX**: Suffix in case your fastq files have one. Usually needed for aligners like [bwa_mem].
    * Type: `String`
    * Default: `''`

* **ON_DATA_IMPORT**: Methods triggered when data has been imported successfully.
    * Type: `Array of Method Import Strings`
    * Default: See [ON_DATA_IMPORT][`isabl_cli.settings`]

* **ON_STATUS_CHANGE**: Methods triggered when an analysis changes status.
    * Type: `Array of Method Import Strings`
    * Default: See [ON_STATUS_CHANGE][`isabl_cli.settings`]

* **ON_SIGNAL_FAILURE**: Methods triggered when an analysis fails.
    * Type: `Array of Method Import Strings`
    * Default: `None`


> ### Types of Settings {docsify-ignore}

>* **String**: a regular `string`.

>* **Method Import String**: is a `string` that contains the path to a method. For example `isabl_cli.data.make_storage_directory` means that `make_storage_directory` is a method that can be loaded from `isabl_cli_data`

>* **Class Import String**: is a `string` that contains the path to a Class. For example `isabl_cli.data.DataImporter` means that `DataImporter` is a class that can be loaded from `isabl_cli_data`. The classes should contain a `as_cli_command` that returns a click command.

>* **Path String**: is a `string` that resolves to a path in the current file system.


[cookiecutter-cli]: https://github.com/isabl-io/cookiecutter-cli
[isabl-cli]: https://github.com/isabl-io/cli
[`isabl_cli.settings`]: https://github.com/isabl-io/cli/blob/master/isabl_cli/settings.py#L20
[pytz]: http://pytz.sourceforge.net/#helpers
[bwa-mem]: http://bio-bwa.sourceforge.net/
