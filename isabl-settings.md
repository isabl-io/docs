# Isabl Settings

## Settings Types

In general terms, these are the settings types available for Isabl:

| **Type** | Description |
| :---: | :--- |
| **String** | A regular `string`. |
| **Method Import String** | A `string` that contains the path to a method. For example `isabl_cli.data.make_storage_directory`means that `make_storage_directory` is a method that can be loaded from `isabl_cli_data` |
| **Class Import String** | A `string` that contains the path to a Class. For example `isabl_cli.data.DataImporter` means that `DataImporter` is a class that can be loaded from `isabl_cli_data`. The classes should contain a `as_cli_command` that returns a click command. |
| **Path String** | A `string` that resolves to a path in the current file system. |

## Isabl API Settings

{% hint style="info" %}
TODO
{% endhint %}

## Isabl CLI Settings

The `_DEFAULTS` dictionary in [`isabl_cli.settings`](https://github.com/isabl-io/cli/blob/master/isabl_cli/settings.py#L20) contains the values that can be overwritten or extended in order to control functionality:

#### API\_BASE\_URL

url host where your isabl api is running. Needed to connect the CLI with the API.

* **Type** _String_
* **Default** `http://0.0.0.0:8000/api/v1`

#### BASE\_STORAGE\_DIRECTORY

Directory where data will be store in the file system.

* **Type** _Path String_
* **Default** `~/isabl_storage`

#### TIME\_ZONE

Current timezone used by pytz package.

* **Type** _String_
* **Default** `America/New_York`

#### INSTALLED\_APPLICATIONS

Array of registered applications to be run with the cli tool. These apps can be seen and run sabl apps --help.

* **Type** _Array of Method Import Strings_
* **Default** `[]`

#### CUSTOM\_COMMANDS

Array of custom commands to be added to the custom cli tool.

* **Type** _Array of Method Import Strings_
* **Default** `[]`

#### SYSTEM\_COMMANDS

Array of system commands that are used in isabl-cli.

* **Type** _Array of Method Import Strings_
* **Default** See `isabl_cli.settings`

#### ADMIN\_COMMANDS

Array of commands that are only executable by admin.

* **Type** _Array of Method Import Strings_
* **Default** See `isabl_cli.settings`

#### ADMIN\_USER

Linux user for which admin operations will be limited to

* **Type** _Class Import String_
* **Default** `None`

#### MAKE\_STORAGE\_DIRECTORY

Get and create path to a data directory.

* **Type** _Method Import String_
* **Default** `isabl_cli.data.make_storage_directory`

#### TRASH\_ANALYSIS\_STORAGE

Move analysis storage\_url to a trash directory.

* **Type** _Method Import String_
* **Default** `isabl_cli.data.trash_analysis_storage`

#### REFERENCE\_DATA\_IMPORTER

Register input\_bed\_path in technique's storage dir and update data

* **Type** _Class Import String_
* **Default** `isabl_cli.data.ReferenceDataImporter`

#### DATA\_IMPORTER

Import raw data for multiple experiments.

* **Type** _Class Import String_
* **Default** `isabl_cli.data.DataImporter`

#### BED\_IMPORTER

Register input\_bed\_path in technique's storage dir and update data.

* **Type** _Class Import String_
* **Default** `isabl_cli.data.BedImporter`

#### FASTQ\_READ\_SUFFIX

Suffix in case your fastq files have one. Usually needed for aligners like \[bwa\_mem\].

* **Type** _String_
* **Default** `''`

#### ON\_DATA\_IMPORT

Methods triggered when data has been imported successfully.

* **Type** _Array of Method Import Strings_
* **Default** See `isabl_cli.settings`

#### ON\_STATUS\_CHANGE

Methods triggered when an analysis changes status.

* **Type** _Array of Method Import Strings_
* **Default** See `isabl_cli.setting`

#### ON\_SIGNAL\_FAILURE

Methods triggered when an analysis fails.

* **Type** _Array of Method Import Strings_
* **Default** `None`

## **Isabl Web Settings**

