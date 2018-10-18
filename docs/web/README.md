# isabl-web

[![](https://data.jsdelivr.com/v1/package/npm/isabl-web/badge)](https://www.jsdelivr.com/package/npm/isabl-web) [![npm version](https://badge.fury.io/js/isabl-web.svg)](https://badge.fury.io/js/isabl-web) [![GitHub version](https://badge.fury.io/gh/isabl-io%2Fisabl-web.svg)](https://badge.fury.io/gh/isabl-io%2Fisabl-web)

A [Vue.js] application, meant to be the main frontend client for the [isabl-api](guides/api).

It's served rigth out of the box, in the [isabl-cookiecutter] project, but it can be installed as a standalone app.

## Features {docsify-ignore}

Single Page Application that provides a cripsy user experience for:

* Search, browse and inspect information from the existing models in the database: `Projects`, `Analyses`, `Individuals`, `Samples`, `Experiments`, `Submissions`.
* Submission of excel files to create metadata for individuals/samples/experiments by batch.
* Visualize in a Graph Tree the relationships between individuals/samples/experiments.
* Track analyses and visualize results.
* Use third-party services like JIRA that are integrated in the User Interface.
* Authenticated role-based access control to create, view, edit and customize information.
* Customization of User Profile.

## Guides {docsify-ignore}

- [Installation](web/installation)
- [Settings](web/settings)
- [Create a New Project](web/new_project)
- [Submit form to create models](web/submission)
- [Authentication](web/authenticate)
- [Edit and customize models](web/customize)
- [Visualize Results](web/results)
- [Use JIRA project management](web/jira)


[isabl-api]: https://github.com/isabl-io/api
[isabl-web]: https://github.com/isabl-io/web
[isabl-cli]: https://github.com/isabl-io/cli
[isabl-cookiecutter]: https://github.com/isabl-io/cookiecutter
[Vue.js]: https://vuejs.org/
[yarn]: https://yarnpkg.com/en/docs/install#mac-stable
[web-components]: https://www.sitepen.com/blog/2018/07/06/web-components-in-2018/
