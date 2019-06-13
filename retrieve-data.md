---
description: The ultimate guide for data analysts using Isabl.
---

# Retrieving Data

## Introduction to Filters

Users can use **filters** when making queries, allowing to traverse fields across nested and related models in the schema. For example, it's possible to query a set of experiments that belong to the same individual by creating a filter that query every individual field of experiments.

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

### Filter Modifiers

### Limit vs Count Limit

### Finding Available Filters from Redoc

### Traversing the Relational Model

### 

![uml](https://user-images.githubusercontent.com/7906289/56929717-5f740600-6aa8-11e9-8f31-4ce7a4c828f3.png)

### Common Filters

## Retrieving Metadata in the Command Line

**TODO:** Quick intro to filters in the command line

### Get Count

### Get Metadata

### Get Data

### Get BAM Files

### Get Reference

### Get BED Files

### Get Paths

### Get Output Directories

### Get Results

**TODO:** mention how to use `--app-results` 



## Retrieving Metadata within Python

### Importing Isabl CLI



### Isabl Dict

TODO: talk about munch

### Get Instance

**TODO:** `Experiment, Analysis, Assembly`

### Get Instances

**TODO:** `get_experiments, get_analyses, get_projects`

### Get Instances Count

### Create Instance

### Patch Instance

### Delete Instance

### Get Trees

### CLI Utils

#### **chunks**

#### **retry\_request**

#### **api\_request**

