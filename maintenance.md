---
description: 🧼 Some utilities and good practices to keep your isabl instance data safe
---

# Maintenance

## Database backups&#x20;

The [cookiecutter-api](https://github.com/papaemmelab/cookiecutter-api) comes with some handy utilities to manage postgres backups, that you can inspect in your project code directory (`compose/production/postgres/maintenance`):

**1. To create a backup:**

```bash
docker-compose -f <environment>.yml (exec |run --rm) postgres backup
```

**2. To list/view current backups:**

```bash
docker-compose -f <environment>.yml (exec |run --rm) postgres backups
```

**3. To restore a backup:**

```bash
docker-compose -f <environment>.yml (exec |run --rm) postgres restore
```

{% hint style="warning" %}
It's a good practice to run your `backup` script regularly. For example, adding it to a cron job that runs periodically (i.e. every month, or every week)
{% endhint %}
