# Installation

To manually consume the app:

```html
<!-- index.html -->

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

Custom settings are passed to the web app through the `window.$isabl` object. See [settings](web/settings)
