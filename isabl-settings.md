# Isabl Settings

To see the _default_ values for each setting. See the `_DEFAULTS` dictionary in [`isabl_cli.settings`](https://github.com/isabl-io/cli/blob/master/isabl_cli/settings.py#L20).

| Setting Name | Type | Description |
| :--- | :--- | :--- |
| **API\_BASE\_URL** | _String_ | url host where your isabl api is running. Needed to connect the CLI with the API. |
| **BASE\_STORAGE\_DIRECTORY** | _String_ | Directory where data will be store in the file system. |
| **TIME\_ZONE** | _String_ | Current timezone used by `pytz` package. |
| **INSTALLED\_APPLICATIONS** | _Array of Method Import Strings_ | Array of registered applications to be run with the cli tool. These apps can be seen and run `isabl apps --help`. |
| **CUSTOM\_COMMANDS** | _Array of Method Import Strings_ | Array of custom commands to be added to the custom cli tool. |
| **SYSTEM\_COMMANDS** | _Array of Method Import Strings_ | Array of system commands that are used in isabl-cli. |
| **ADMIN\_COMMANDS** | _Array of Method Import Strings_ | Array of commands that are only executable by admin. |
| **ADMIN\_USER** | _String_ | Linux user for which admin operations will be limited. |
| **DEFAULT\_LINUX\_GROUP** | _String_ | Linux group for data admin\_user to use. |
| **MAKE\_STORAGE\_DIRECTORY** | _Method Import String_ | Get and create path to a data directory. |
| **TRASH\_ANALYSIS\_STORAGE** | _Method Import String_ | Move analysis `storage_url` to a trash directory. |
| **REFERENCE\_DATA\_IMPORTER** | _Class Import String_ | Register input\_bed\_path in technique's storage dir and update data. |
| **DATA\_IMPORTER** | _Class Import String_ | Import raw data for multiple experiments. |
| **BED\_IMPORTER** | _Class Import String_ | Register input\_bed\_path in technique's storage dir and update data. |
| **FASTQ\_READ\_SUFFIX** | _String_ | Suffix in case your fastq files have one. Usually needed for aligners like _bwa\_mem_. |
| **ON\_DATA\_IMPORT** | _Array of Method Import Strings_ | Methods triggered when data has been imported successfully. |
| **ON\_STATUS\_CHANGE** | _Array of Method Import Strings_ | Methods triggered when an analysis changes status. |
| **ON\_SIGNAL\_FAILURE** | _Array of Method Import Strings_ | Methods triggered when an analysis fails |

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

| Setting Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |


| **API\_BASE\_URL** | _String_ | `http://0.0.0.0:8000/api/v1` | url host where your isabl api is running. Needed to connect the CLI with the API. |
| :--- | :--- | :--- | :--- |


| **BASE\_STORAGE\_DIRECTORY** | _String_ | `~/isabl_storage` | Directory where data will be store in the file system. |
| :--- | :--- | :--- | :--- |


| **TIME\_ZONE** | _String_ | `America/New_York` | Current timezone used by pytz package. |
| :--- | :--- | :--- | :--- |


| **INSTALLED\_APPLICATIONS** | _Array of Method Import Strings_ | `[]` | Array of registered applications to be run with the cli tool. These apps can be seen and run `isabl apps --help`. |
| :--- | :--- | :--- | :--- |


| **CUSTOM\_COMMANDS** | _Array of Method Import Strings_ | `[]` | Array of custom commands to be added to the custom cli tool. |
| :--- | :--- | :--- | :--- |


| **SYSTEM\_COMMANDS** | _Array of Method Import Strings_ | `[]` | Array of system commands that are used in isabl-cli. |
| :--- | :--- | :--- | :--- |


| **ADMIN\_COMMANDS** | _Array of Method Import Strings_ | `[]` | Array of commands that are only executable by admin. |
| :--- | :--- | :--- | :--- |


| **ADMIN\_USER** | _Class Import String_ | `None` | Linux user for which admin operations will be limited to. |
| :--- | :--- | :--- | :--- |


<table>
  <thead>
    <tr>
      <th style="text-align:left"><b>MAKE_STORAGE_DIRECTORY</b>
      </th>
      <th style="text-align:left"><em>Method Import String</em>
      </th>
      <th style="text-align:left">
        <p><code>isabl_cli</code>
        </p>
        <p><code>.data</code>
        </p>
        <p><code>.make_storage_directory</code>
        </p>
      </th>
      <th style="text-align:left">Get and create path to a data directory.</th>
    </tr>
  </thead>
  <tbody></tbody>
</table><table>
  <thead>
    <tr>
      <th style="text-align:left"><b>TRASH_ANALYSIS_STORAGE</b>
      </th>
      <th style="text-align:left"><em>Method Import String</em>
      </th>
      <th style="text-align:left">
        <p><code>isabl_cli</code>
        </p>
        <p><code>.data</code>
        </p>
        <p><code>.trash_analysis_storage</code>
        </p>
      </th>
      <th style="text-align:left">Move analysis storage_url to a trash directory.</th>
    </tr>
  </thead>
  <tbody></tbody>
</table><table>
  <thead>
    <tr>
      <th style="text-align:left"><b>REFERENCE_DATA_IMPORTER</b>
      </th>
      <th style="text-align:left"><em>Class Import String</em>
      </th>
      <th style="text-align:left">
        <p><code>isabl_cli</code>
        </p>
        <p><code>.data</code>
        </p>
        <p><code>.ReferenceDataImporter</code>
        </p>
      </th>
      <th style="text-align:left">Register input_bed_path in technique&apos;s storage dir and update data.</th>
    </tr>
  </thead>
  <tbody></tbody>
</table><table>
  <thead>
    <tr>
      <th style="text-align:left"><b>DATA_IMPORTER</b>
      </th>
      <th style="text-align:left"><em>Class Import String</em>
      </th>
      <th style="text-align:left">
        <p><code>isabl_cli</code>
        </p>
        <p><code>.data</code>
        </p>
        <p><code>.DataImporter</code>
        </p>
      </th>
      <th style="text-align:left">Import raw data for multiple experiments.</th>
    </tr>
  </thead>
  <tbody></tbody>
</table><table>
  <thead>
    <tr>
      <th style="text-align:left"><b>BED_IMPORTER</b>
      </th>
      <th style="text-align:left"><em>Class Import String</em>
      </th>
      <th style="text-align:left">
        <p><code>isabl_cli</code>
        </p>
        <p><code>.data</code>
        </p>
        <p><code>.BedImporter</code>
        </p>
      </th>
      <th style="text-align:left">Register input_bed_path in technique&apos;s storage dir and update data.</th>
    </tr>
  </thead>
  <tbody></tbody>
</table>| **FASTQ\_READ\_SUFFIX** | _String_ | `''` | Suffix in case your fastq files have one. Usually needed for aligners like _bwa\_mem_. |
| :--- | :--- | :--- | :--- |


| **ON\_DATA\_IMPORT** | _Array of Method Import Strings_ | See `isabl.settings` | Methods triggered when data has been imported successfully. |
| :--- | :--- | :--- | :--- |


| **ON\_STATUS\_CHANGE** | _Array of Method Import Strings_ | See `isabl.settings` | Methods triggered when an analysis changes status. |
| :--- | :--- | :--- | :--- |


| **ON\_SIGNAL\_FAILURE** | _Array of Method Import Strings_ | `None` | Methods triggered when an analysis fails |
| :--- | :--- | :--- | :--- |


Customization of the User Interface can be achieved by defining a global `$isabl` settings dictionary in the main `index.html`.

```markup
<script>
    window.$isabl = { }
</script>
```

You can configure the `window.$isabl` with the following parameters:

| Setting Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **`apiHost`** | `String` | `''` | Url host where your `isabl api` is running. |
| **`name`** | `String` | `'isabl'` | Custom app title that is shown in the top of the app. |
| **`logo`** | `String` | ![:size=18x18](.gitbook/assets/logo.png) | Custom image path that is shown as the main logo of the app. Use a square size image for better display. |
| **`jira`** | `Boolean` | `false` | Activate the jira card in the projects view. If the jira endpoint is available from the api, it will show the current tickets for each project. Learn more about [jira integration](https://developer.atlassian.com/server/jira/platform/rest-apis/). |
| **`oncoTree`** | `Boolean` | `false` | If it's enabled, more information about the [onco tree ](http://oncotree.mskcc.org/#/home)disease is added in the _Sample details_. |
| **`customFields`** | `Object` | `{}` | Every detail info for each model shown in the frontend can be customized, by overwriting the specific key of a fields object. Available fields can be seen [here](https://github.com/isabl-io/web/blob/master/src/utils/fields.js). Learn more on how to create custom fields \(**TODO**\). |
| **`restartButton`** | `Boolean` | `false` | If enabled,`FAILED` analyses can send a signal to restart or force to the database. Learn more in signals \(**TODO**\). |
| **`lightTheme`** | `Object` | See [defaults](https://github.com/isabl-io/web/blob/master/src/utils/settings.js#L8) | Colors to customize the light theme. |
| **`darkTheme`** | `Object` | See [defaults](https://github.com/isabl-io/web/blob/master/src/utils/settings.js#L20) | Colors to customize the dark theme. |
| **`modelIcons`** | `Object` | `{}` | [Material Icon](https://material.io/resources/icons/?style=baseline) names to customize panel icons. |

### Example of a custom UI configuration 🌈

```markup
<script>
    const customFields = {
        // overwrite 2 of the fields of the analysis panel
        analysisFields: {
            // Add a new formatter for status
            status: {
                section: 'Analysis Details',
                verboseName: 'Status',
                field: 'status',
                formatter: value => {
                    if (value === 'SUCEEDED') {
                        return 'DONE!'
                    } else if (value === 'FAILED') {
                        return 'OOPS...'
                    } else {
                        return value
                    }
                }
            },
            // Make notes not editable
            notes: {
                section: 'Analysis Details',
                verboseName: 'Notes',
                field: 'notes',
                editable: false
            }
        },
        // display a new custom field for project that exist in the db.
        // Use http://<api-host>/admin/ to create custom fields.
        projectFields: {
            // custom field
            irbConstent: {
              section: 'Project Details',
              verboseName: 'IRB Consent',
              field: 'custom_fields.irb_consent',
              editable: true,
              apiPermission: 'change_project'
            }
          }
        }
    }

    window.$isabl = {
        apiHost: "http://my.isabl.api.host",
        name: "My Cool App",
        logo: "/path/to/my/awesome/logo",
        customFields,
        restartButton: true,
        jira: true,
        oncoTree: true,
        darkTheme: {
          primary: '#1dc5a7',
          background: '#1a202c',
          surface: '#3a4556',
          accent: '#4a5568'
        },
        modelIcons: {
          project: 'insert_chart',
          analysis: 'bubble_chart',
          individual: 'person',
          sample: 'gesture',
          experiment: 'flash_on',
          search: 'search',
          submission: 'assignment'
        },
    }
</script>
```

{% hint style="warning" %}
**Important:** In case you're running your frontend instance in a different host that the backend, you should add this `ENV` variable to your django project where the `isabl-api` is running:

```bash
export FRONTEND_URL="http://your-frontend-host.com"
```
{% endhint %}

{% hint style="success" %}
If you want to consume `isabl-web` and serve your own html, outside of `isabl-api`. You can consume the frontend just as:

{% code-tabs %}
{% code-tabs-item title="index.html" %}
```markup
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <meta charset="UTF-8">
        <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet" type="text/css">
        <link rel="icon" href="favicon.ico">
        <title>My Awesome App</title>
    </head>
    <body>

 <div id="isabl-web"></div>
        <script src="https://cdn.jsdelivr.net/npm/vue"></script>
        <script src="https://cdn.jsdelivr.net/npm/isabl-web"></script>
        <script>
            window.$isabl = {
                apiHost: "http://my.isabl.api.host",
                //... other settings
            }
        </script>
    </body>
</html>
```
{% endcode-tabs-item %}
{% endcode-tabs %}
{% endhint %}

