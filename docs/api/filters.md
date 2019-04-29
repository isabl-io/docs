# Filters

Users can use **filters** when making queries, allowing to tranverse fields across nested and related models in the schema. For example, it's possible to query a set of experiments that belong to the same individual by creating a filter that query every individual field of experiments.


Using the api:
```bash
curl http://<your-api-host>/api/v1/experiments?sample__individual__system_id=XXX_H000001
```

Using the cli:
```bash
isabl get-outdirs -fi application.name BWA_MEM -fi targets.sample.system_id XXX_H000001_N01`
```

Using the interactive cli:
```python
import isabl_cli as ii
samples = ii.get_instances('samples', individual__custom_fields__has_clinical_trial=True)
```

Filters can be used in the api, the interactive cli or any filter option in apps, and they are a very powerful feature to make complex queries. A good understanding of the database schema and how the models are related are key to use the filters. The following UML diagram shows this database chema relationship:

![uml](https://user-images.githubusercontent.com/7906289/56929717-5f740600-6aa8-11e9-8f31-4ce7a4c828f3.png)
