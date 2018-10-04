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

```html
<script>
    window.$isabl = {
        apiHost: "http://my.isabl.api.host",
        name: "My Cool App",
        logo: "/path/to/my/awesome/logo"
    }
</script>
```

?> <strong>Important:</strong> In case you're running your frontend instance in a different host that the backend, you should add this ENV variable to your django project where the [api][isabl-api] is running: <br>
`export FRONTEND_URL="http://your-frontend-host.com"`


[isabl-api]: https://github.com/isabl-io/api
[isabl-web]: https://github.com/isabl-io/web
[isabl-cli]: https://github.com/isabl-io/cli
[isabl-cookie-cutter]: https://github.com/isabl-io/cookie-cutter
