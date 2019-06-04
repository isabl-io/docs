---
description: '⏱ tutorial time: 20 minutes'
---

# Contributing Guide

This tutorial will help you set up a **full Development environment** with all components of the `isabl` infrastructure.

{% hint style="info" %}
📘 Contributions are welcome, and they are greatly appreciated! Every little bit helps, and credit will always be given. `isabl` could always use more documentation, whether as part of the READMES, in docstrings, or even on the web in blog posts articles, and such. Also, bet you've read the [Zen Of Python](https://www.python.org/dev/peps/pep-0020/#the-zen-of-python).
{% endhint %}

### RESTful API

[![](https://img.shields.io/github/issues/isabl-io/api.svg)](https://github.com/isabl-io/docs/issues) [![](https://img.shields.io/github/issues-pr/isabl-io/api.svg)](https://github.com/isabl-io/api/compare)

1. Clone locally:

   ```text
    git clone git@github.com:isabl-io/api.git
    cd api
   ```

2. Build containers:

   ```text
    docker-compose build
   ```

3. Run tests using [tox](http://tox.readthedocs.io/):

   ```text
    docker-compose run --rm django tox
   ```

   Or run [pytest](https://docs.pytest.org/en/latest/), [pylint](https://www.pylint.org/) or [pydocstyle](http://www.pydocstyle.org/en) individually:

   ```text
    docker-compose run --rm django pytest --ds example.settings --cov=isabl_api
    docker-compose run --rm django pylint isabl_api
    docker-compose run --rm django pydocstyle isabl_api
   ```

#### Create a superuser

Create a superuser with username and password set to `admin` \(we will need it later\):

```text
docker-compose run --rm django python manage.py createsuperuser --email admin@isabl.io --username admin
```

Now you can login in the frontend at [http://localhost:8000](http://localhost:8000) \(there won't be much to see\). An easy way to create objects is to run the client tests.

#### Coverage report

Since tests were run inside a container, we need to combine the coverages to see the html report:

```text
alias opencov="mv .coverage .coverage.tmp && coverage combine && coverage html && open htmlcov/index.html"
pip install coverage && opencov
```

### Command Line Client

 [![cli issue badge](https://img.shields.io/github/issues/isabl-io/cli.svg)](https://github.com/isabl-io/docs/issues) [![cli pullr badge](https://img.shields.io/github/issues-pr/isabl-io/cli.svg)](https://github.com/isabl-io/cli/compare)

1. Clone locally:

   ```text
    git clone git@github.com:isabl-io/cli.git
    cd cli
   ```

2. Install with pip, it is strongly recommended to install in a [virtual environment](https://docs.python.org/3/tutorial/venv.html):

   ```text
    pip install -r requirements.txt
   ```

3. Run tests using [tox](http://tox.readthedocs.io/), make sure you created the admin user:

   ```text
    tox
   ```

   Or run [pytest](https://docs.pytest.org/en/latest/), [pylint](https://www.pylint.org/) or [pydocstyle](http://www.pydocstyle.org/en) individually:

   ```text
    py.test tests/ --cov=isabl_cli -s
    pylint isabl_cli
    pydocstyle isabl_cli
   ```

### Applications

[![apps issue badge](https://img.shields.io/github/issues/isabl-io/apps.svg)](https://github.com/isabl-io/docs/issues) [![apps pullr badge](https://img.shields.io/github/issues-pr/isabl-io/apps.svg)](https://github.com/isabl-io/apps/compare)

1. Clone locally:

   ```text
    git clone git@github.com:isabl-io/apps.git
    cd apps
   ```

2. Install with pip, please make sure the client is installed in the same environment:

   ```text
    pip install -r requirements.txt
   ```

3. Run [pytest](https://docs.pytest.org/en/latest/) with:

   ```text
    py.test tests/ --cov=isabl_apps -s
   ```

4. Execute the applications:

   ```text
    py.test tests/ --cov=isabl_apps -s --commit
   ```

5. Check styling with:

   ```text
    pylint isabl_cli
    pydocstyle isabl_cli
   ```

### Frontend

 [![web issue badge](https://img.shields.io/github/issues/isabl-io/web.svg)](https://github.com/isabl-io/docs/issues) [![web pullr badge](https://img.shields.io/github/issues-pr/isabl-io/web.svg)](https://github.com/isabl-io/web/compare)

1. Clone locally:

   ```text
    git clone git@github.com:isabl-io/web.git
    cd web
   ```

2. Install yarn:

   ```text
    brew install yarn --without-node
   ```

3. Install dependencies:

   ```text
    yarn install
   ```

4. Start the react development server:

   ```text
    yarn serve
   ```

   **Important!** export `FRONTEND_URL=localhost:8080` before running `docker-compose up` in the api repository, note that the port may vary.

### Documentation

[![docs issue badge](https://img.shields.io/github/issues/isabl-io/docs.svg)](https://github.com/isabl-io/docs/issues) [![docs pullr badge](https://img.shields.io/github/issues-pr/isabl-io/docs.svg)](https://github.com/isabl-io/docs/compare)

1. Clone locally:

   ```text
    git clone git@github.com:isabl-io/docs.git
   ```

2. Install [docsify](https://docsify.js.org/#/quickstart):

   ```text
    npm i docsify-cli -g
   ```

3. Serve docs:

   ```text
    cd docs && docsify serve .
   ```

### Contribute with Github

1. Create a branch for local development and get ready to make changes locally:

   ```text
    git pull
    git checkout -b name-of-your-bugfix-or-feature
   ```

2. Commit your changes and push your branch to GitHub \(see the emoji reference\):

   ```text
    git add .
    git config commit.template .gitmessage
    git commit -m ":emoji: your short and nice description"
    git push origin name-of-your-bugfix-or-feature
   ```

3. Create a test in:

   ```text
    tests/
   ```

4. Submit a pull request through the GitHub website.

#### Formatting projects

Python Projects are formatted with [black](https://github.com/ambv/black). Is required for `api`, `cli` and `apps`, simply run:

```text
pip install black && black .
```

Project `web` is formatted following the [Vue style guide](https://vuejs.org/v2/style-guide/). For this one, simply run:

```text
yarn lint
```

#### Bumping version of PyPi

Following the [semantic versioning](http://semver.org/) guidelines and update the `VERSION` file before creating a PR, for instance:

```text
echo v0.1.0 > isabl_api/VERSION
git add isabl_api/VERSION
git commit -m ":gem: bump to version 0.1.0"
```

#### Emoji reference

We use emojis to quickly categorize commits and pull requests. These are some common type of changes we use but feel free to ignore the conventions:

| emoji | name | type of change |
| :--- | :--- | :--- |
| 🚀 | rocket | new feature |
| 🐛 | bug | bug fix |
| 📝 | memo | changes to documentation |
| 🎨 | art | formatting  no code change |
| 🔧 | wrench | refactoring production code |
| ✅ | white\_check\_mark | adding/editing test logic |
| 👕 | shirt | no production code change |
| 💎 | gem | bump to new version |

{% hint style="info" %}
**Tip:** To insert an emoji in mac type control+cmd+space. Alternative, type the emoji's name within two semicolons \(e.g. `:rocket:`\).
{% endhint %}

