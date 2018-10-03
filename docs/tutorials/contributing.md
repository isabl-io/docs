<div style="text-align: right"> ⏱ **tutorial time**: 20 minutes </div>

# Contributing

This tutorial will help you set up a **full Development environment** with all components of the `isabl` infrastructure.

- [RESTful API](#restful-api)
    - [Create a superuser](#create-a-superuser)
    - [Coverage report](#coverage-report)
- [Command Line Client](#command-line-client)
- [Applications](#applications)
- [Frontend](#frontend)
- [Documentation](#documentation)
- [Contribute with Github](#contribute-with-github)
    - [Formatting python projects](#formatting-python-projects)
    - [Bumping version of PyPi](#bumping-version-of-pypi)
    - [Emoji reference](#emoji-reference)

?> 📘 Contributions are welcome, and they are greatly appreciated! Every little bit helps, and credit will always be given. `isabl` could always use more documentation, whether as part of the READMES, in docstrings, or even on the web in blog posts articles, and such. Also, bet you've read the [Zen Of Python].

## RESTful API

[![api issue badge][issue_api_badge]][issue_api_base]
[![api pullr badge][pullr_api_badge]][pullr_api_base]

<div style="text-align: right">

</div>

1. Clone locally:

        git clone git@github.com:isabl-io/api.git
        cd api

1. Build containers:

        docker-compose build

1. Run tests using [tox]:

        docker-compose run --rm django tox

    Or run [pytest], [pylint] or [pydocstyle] individually:

        docker-compose run --rm django pytest --ds example.settings --cov=isabl_api
        docker-compose run --rm django pylint isabl_api
        docker-compose run --rm django pydocstyle isabl_api

### Create a superuser

Create a superuser with username and password set to `admin` (we will need it later):

    docker-compose run --rm django python manage.py createsuperuser --email admin@isabl.io --username admin

Now you can login in the frontend at http://localhost:8000 (there won't be much to see). An easy way to create objects is to run the [client tests](#command-line-client).

### Coverage report

Since tests were run inside a container, we need to combine the coverages to see the html report:

    alias opencov="mv .coverage .coverage.tmp && coverage combine && coverage html && open htmlcov/index.html"
    pip install coverage && opencov

## Command Line Client

<div style="text-align: right">

[![cli issue badge][issue_cli_badge]][issue_cli_base]
[![cli pullr badge][pullr_cli_badge]][pullr_cli_base]</div>

1. Clone locally:

        git clone git@github.com:isabl-io/cli.git
        cd cli

1. Install with pip, it is strongly recommended to install in a [virtual environment]:

        pip install -r requirements.txt

1. Run tests using [tox], make sure you [created the admin user](#create-a-superuser):

        tox

    Or run [pytest], [pylint] or [pydocstyle] individually:

        py.test tests/ --cov=isabl_cli -s
        pylint isabl_cli
        pydocstyle isabl_cli

## Applications

<div style="text-align: right">

[![apps issue badge][issue_apps_badge]][issue_apps_base]
[![apps pullr badge][pullr_apps_badge]][pullr_apps_base]</div>

1. Clone locally:

        git clone git@github.com:isabl-io/apps.git
        cd apps

1. Install with pip, please make sure the [client](#command-line-client) is installed in the same environment:

        pip install -r requirements.txt

1. Run [pytest] with:

        py.test tests/ --cov=isabl_apps -s

1. Execute the applications:

        py.test tests/ --cov=isabl_apps -s --commit

1. Check styling with:

        pylint isabl_cli
        pydocstyle isabl_cli

## Frontend

<div style="text-align: right">

[![web issue badge][issue_web_badge]][issue_web_base]
[![web pullr badge][pullr_web_badge]][pullr_web_base]</div>

1. Clone locally:

        git clone git@github.com:isabl-io/web.git
        cd web

1. Install yarn:

        brew install yarn --without-node

1. Install dependencies:

        yarn install

1. Start the react development server:

        yarn serve

    **Important!** export `FRONTEND_URL=localhost:8080` before running `docker-compose up` in the api repository, note that the port may vary.

## Documentation

<div style="text-align: right">

[![docs issue badge][issue_docs_badge]][issue_docs_base]
[![docs pullr badge][pullr_docs_badge]][pullr_docs_base]</div>

1. Clone locally:

        git clone git@github.com:isabl-io/docs.git

1. Install [docsify]:

        npm i docsify-cli -g

1. Serve docs:

        cd docs && docsify serve .

## Contribute with Github

1. Create a branch for local development and get ready to make changes locally:

        git pull
        git checkout -b name-of-your-bugfix-or-feature

1. Commit your changes and push your branch to GitHub (see the [emoji reference](#emoji-reference)):

        git add .
        git config commit.template .gitmessage
        git commit -m ":emoji: your short and nice description"
        git push origin name-of-your-bugfix-or-feature

1. Create a test in:

        tests/

1. Submit a pull request through the GitHub website.

### Formatting projects

Python Projects are formatted with [black]. Is required for `api`, `cli` and `apps`, simply run:

    pip install black && black .

Project `web` is formatted following the [Vue style guide][vue-style-guide]. For this one, simply run:

    yarn lint

### Bumping version of PyPi

Following the [semantic versioning] guidelines and  update the `VERSION` file before creating a PR, for instance:

    echo v0.1.0 > isabl_api/VERSION
    git add isabl_api/VERSION
    git commit -m ":gem: bump to version 0.1.0"

### Emoji reference

We use emojis to quickly categorize commits and pull requests. These are some common type of changes we use but feel free to ignore the conventions:

| emoji | name             | type of change              |
| ----- | ---------------- | --------------------------- |
| 🚀    | rocket           | new feature                 |
| 🐛    | bug              | bug fix                     |
| 📝    | memo             | changes to documentation    |
| 🎨    | art              | formatting  no code change  |
| 🔧    | wrench           | refactoring production code |
| ✅     | white_check_mark | adding/editing test logic   |
| 👕    | shirt            | no production code change   |
| 💎    | gem              | bump to new version         |

?> **Tip:** To insert an emoji in mac type <kbd>control</kbd>+<kbd>cmd</kbd>+<kbd>space</kbd>. Alternative, type the emoji's name within two semicolons (e.g. `:rocket:`).

<!-- badges -->
[issue_api_badge]: https://img.shields.io/github/issues/isabl-io/api.svg
[issue_api_base]: https://github.com/isabl-io/docs/issues
[issue_docs_badge]: https://img.shields.io/github/issues/isabl-io/docs.svg
[issue_docs_base]: https://github.com/isabl-io/docs/issues
[issue_apps_badge]: https://img.shields.io/github/issues/isabl-io/apps.svg
[issue_apps_base]: https://github.com/isabl-io/docs/issues
[issue_cli_badge]: https://img.shields.io/github/issues/isabl-io/cli.svg
[issue_cli_base]: https://github.com/isabl-io/docs/issues
[issue_web_badge]: https://img.shields.io/github/issues/isabl-io/web.svg
[issue_web_base]: https://github.com/isabl-io/docs/issues
[pullr_api_badge]: https://img.shields.io/github/issues-pr/isabl-io/api.svg
[pullr_api_base]: https://github.com/isabl-io/api/compare
[pullr_apps_badge]: https://img.shields.io/github/issues-pr/isabl-io/apps.svg
[pullr_apps_base]: https://github.com/isabl-io/apps/compare
[pullr_cli_badge]: https://img.shields.io/github/issues-pr/isabl-io/cli.svg
[pullr_cli_base]: https://github.com/isabl-io/cli/compare
[pullr_web_badge]: https://img.shields.io/github/issues-pr/isabl-io/web.svg
[pullr_web_base]: https://github.com/isabl-io/web/compare
[pullr_docs_badge]: https://img.shields.io/github/issues-pr/isabl-io/docs.svg
[pullr_docs_base]: https://github.com/isabl-io/docs/compare

<!-- links -->
[coverage]:https://coverage.readthedocs.io
[issue]: https://github.com/isabl-io/api/issues
[pydocstyle]: http://www.pydocstyle.org/en
[pylint]: https://www.pylint.org/
[pytest-env]: https://github.com/MobileDynasty/pytest-env
[pytest]: https://docs.pytest.org/en/latest/
[semantic versioning]: http://semver.org/
[tox]: http://tox.readthedocs.io/
[black]: https://github.com/ambv/black
[virtual environment]: https://docs.python.org/3/tutorial/venv.html
[virtualenvwrapper]: hhttps://virtualenvwrapper.readthedocs.io/en/latest/
[zen of python]: https://www.python.org/dev/peps/pep-0020/#the-zen-of-python
[docsify]: https://docsify.js.org/#/quickstart
[vue-style-guide]: https://vuejs.org/v2/style-guide/
