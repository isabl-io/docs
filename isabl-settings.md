# Isabl Settings

## Settings Types

In general terms, these are the settings types available for Isabl:

| **Type**                       | Description |
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

#### 

<table>
  <thead>
    <tr>
      <th style="text-align:left">Setting Name</th>
      <th style="text-align:left">Type</th>
      <th style="text-align:left">Default</th>
      <th style="text-align:left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"><b>API_BASE_URL</b>
      </td>
      <td style="text-align:left"><em>String</em>
      </td>
      <td style="text-align:left"><code>http://0.0.0.0:8000/api/v1</code>
      </td>
      <td style="text-align:left">url host where your isabl api is running. Needed to connect the CLI with
        the API.</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>BASE_STORAGE_DIRECTORY</b>
      </td>
      <td style="text-align:left"><em>String</em>
      </td>
      <td style="text-align:left"><code>~/isabl_storage</code>
      </td>
      <td style="text-align:left">Directory where data will be store in the file system.</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>TIME_ZONE</b>
      </td>
      <td style="text-align:left"><em>String</em>
      </td>
      <td style="text-align:left"><code>America/New_York</code>
      </td>
      <td style="text-align:left">Current timezone used by pytz package.</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>INSTALLED_APPLICATIONS</b>
      </td>
      <td style="text-align:left"><em>Array of Method Import Strings</em>
      </td>
      <td style="text-align:left"><code>[]</code>
      </td>
      <td style="text-align:left">Array of registered applications to be run with the cli tool. These apps
        can be seen and run <code>isabl apps --help</code>.</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>CUSTOM_COMMANDS</b>
      </td>
      <td style="text-align:left"><em>Array of Method Import Strings</em>
      </td>
      <td style="text-align:left"><code>[]</code>
      </td>
      <td style="text-align:left">Array of custom commands to be added to the custom cli tool.</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>SYSTEM_COMMANDS</b>
      </td>
      <td style="text-align:left"><em>Array of Method Import Strings</em>
      </td>
      <td style="text-align:left"><code>[]</code>
      </td>
      <td style="text-align:left">Array of system commands that are used in isabl-cli.</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>ADMIN_COMMANDS</b>
      </td>
      <td style="text-align:left"><em>Array of Method Import Strings</em>
      </td>
      <td style="text-align:left"><code>[]</code>
      </td>
      <td style="text-align:left">Array of commands that are only executable by admin.</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>ADMIN_USER</b>
      </td>
      <td style="text-align:left"><em>Class Import String</em>
      </td>
      <td style="text-align:left"><code>None</code>
      </td>
      <td style="text-align:left">Linux user for which admin operations will be limited to.</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>MAKE_STORAGE_DIRECTORY</b>
      </td>
      <td style="text-align:left"><em>Method Import String</em>
      </td>
      <td style="text-align:left">
        <p><code>isabl_cli</code>
        </p>
        <p><code>.data</code>
        </p>
        <p><code>.make_storage_directory</code>
        </p>
      </td>
      <td style="text-align:left">Get and create path to a data directory.</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>TRASH_ANALYSIS_STORAGE</b>
      </td>
      <td style="text-align:left">&lt;em&gt;&lt;/em&gt;</td>
      <td style="text-align:left">
        <p><code>isabl_cli</code>
        </p>
        <p><code>.data</code>
        </p>
        <p><code>.trash_analysis_storage</code>
        </p>
      </td>
      <td style="text-align:left">Move analysis storage_url to a trash directory.</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>REFERENCE_DATA_IMPORTER</b>
      </td>
      <td style="text-align:left"><em>Class Import String</em>
      </td>
      <td style="text-align:left">
        <p><code>isabl_cli</code>
        </p>
        <p><code>.data</code>
        </p>
        <p><code>.ReferenceDataImporter</code>
        </p>
      </td>
      <td style="text-align:left">Register input_bed_path in technique&apos;s storage dir and update data.</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>DATA_IMPORTER</b>
      </td>
      <td style="text-align:left"><em>Class Import String</em>
      </td>
      <td style="text-align:left">
        <p><code>isabl_cli</code>
        </p>
        <p><code>.data</code>
        </p>
        <p><code>.DataImporter</code>
        </p>
      </td>
      <td style="text-align:left">Import raw data for multiple experiments.</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>BED_IMPORTER</b>
      </td>
      <td style="text-align:left"><em>Class Import String</em>
      </td>
      <td style="text-align:left">
        <p><code>isabl_cli</code>
        </p>
        <p><code>.data</code>
        </p>
        <p><code>.BedImporter</code>
        </p>
      </td>
      <td style="text-align:left">Register input_bed_path in technique&apos;s storage dir and update data.</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>FASTQ_READ_SUFFIX</b>
      </td>
      <td style="text-align:left"><em>String</em>
      </td>
      <td style="text-align:left"><code>&apos;&apos;</code>
      </td>
      <td style="text-align:left">Suffix in case your fastq files have one. Usually needed for aligners
        like <em>bwa_mem</em>.</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>ON_DATA_IMPORT</b>
      </td>
      <td style="text-align:left"><em>Array of Method Import Strings</em>
      </td>
      <td style="text-align:left">See <code>isabl.settings</code>
      </td>
      <td style="text-align:left">Methods triggered when data has been imported successfully.</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>ON_STATUS_CHANGE</b>
      </td>
      <td style="text-align:left"><em>Array of Method Import Strings</em>
      </td>
      <td style="text-align:left">See <code>isabl.settings</code>
      </td>
      <td style="text-align:left">Methods triggered when an analysis changes status.</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>ON_SIGNAL_FAILURE</b>
      </td>
      <td style="text-align:left"><em>Array of Method Import Strings</em>
      </td>
      <td style="text-align:left"><code>None</code>
      </td>
      <td style="text-align:left">Methods triggered when an analysis fails</td>
    </tr>
  </tbody>
</table>## **Isabl Web Settings**

