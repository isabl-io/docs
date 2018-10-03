# Settings

You can configure the `window.$isabl`.

* `apiHost`: url host where your [isabl api](guides/api) is running.
    * Type: `String`
    * Default: `''`

* `name`: custom app title that is shown in the top of the app.
    * Type: `String`
    * Default: `''`

* `logo`: custom image path that is shown as the main logo of the app. Use a square size image for better display.
    * Type: `String`
    * Default: `''`

```html
<script>
    window.$isabl = {
        apiHost: "http://my.isabl.api.host",
        name: "My Cool App",
        logo: "/path/to/my/awesome/logo"
    }
</script>
```

In case you're running your frontend instance in a different host that the backend, you should add this env variable to your django project where the [api][isabl-api] is running:

```bash
export FRONTEND_URL="http://your-frontend-host.com"
```

[isabl-api]: https://github.com/isabl-io/api
[isabl-web]: https://github.com/isabl-io/web
[isabl-cli]: https://github.com/isabl-io/cli
[isabl-cookie-cutter]: https://github.com/isabl-io/cookie-cutter
