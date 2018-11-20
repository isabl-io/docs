# Settings

You can configure the `window.$isabl` with the following parameters:

* `apiHost`: url host where your [isabl api](api/) is running.
    * Type: `String`
    * Default: `''`

* `name`: custom app title that is shown in the top of the app.
    * Type: `String`
    * Default: `'isabl'`

* `logo`: custom image path that is shown as the main logo of the app. Use a square size image for better display.
    * Type: `String`
    * Default: ![logo](../_media/logo.png ':size=18x18')

* `jira`: activate the jira card in the projects view. If the jira endpoint is available from the api, it will show the current tickets for each project.
    * Type: `Boolean`
    * Default: false

* `customFields`: every detail info for each model shown in the frontend can be customized, by overwritting the specific key of a fields object. Available fields can be seen [here](). Learn more on how to create [custom fields]().

```html
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
            section: 'Project Details',
            verboseName: 'IRB Consent',
            field: 'custom_fields.irb_consent',
            editable: true,
            apiPermission: 'change_project'
        }
    }

    window.$isabl = {
        apiHost: "http://my.isabl.api.host",
        name: "My Cool App",
        logo: "/path/to/my/awesome/logo",
        jira: true,
        customFields
    }
</script>
```

?> <strong>Important:</strong> In case you're running your frontend instance in a different host that the backend, you should add this ENV variable to your django project where the [api][isabl-api] is running: <br>
`export FRONTEND_URL="http://your-frontend-host.com"`


[isabl-api]: https://github.com/isabl-io/api
[isabl-web]: https://github.com/isabl-io/web
[isabl-cli]: https://github.com/isabl-io/cli
[isabl-cookie-cutter]: https://github.com/isabl-io/cookie-cutter
