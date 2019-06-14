---
description: "\uD83E\uDD13 The ultimate guide for data analysts using Isabl!"
---

# Retrieving Data

## Introduction to Filters

**Filters** enable you to subset the data of your interest. For example you can use filters to retrieve all the BAM files of a given project, or get all VCFs from a given variant calling application. Filters are _field-value_ pairs and can be used both in the Command Line and within Python. Check out this examples:

{% code-tabs %}
{% code-tabs-item title="A request to the API" %}
```bash
curl http://my-isabl.io/api/v1/experiments?sample__identifier=the-sample-id
```
{% endcode-tabs-item %}
{% endcode-tabs %}

{% code-tabs %}
{% code-tabs-item title="Using Isabl CLI" %}
```bash
isabl get-outdirs -fi application.name BWA_MEM -fi status SUCCEEDED
```
{% endcode-tabs-item %}
{% endcode-tabs %}

{% code-tabs %}
{% code-tabs-item title="Using Isabl SDK" %}
```python
import isabl_cli as ii
samples = ii.get_instances('samples', individual__species="HUMAN")
```
{% endcode-tabs-item %}
{% endcode-tabs %}

{% hint style="info" %}
Note that fields can _traverse_ the relational model. To do so concatenate the fields with `__` \(e.g. `samples__disease__acronym=AML`,  or a dot in the Command Line `application.name=PINDEL`\)
{% endhint %}

### Filter Modifiers

As indicated in the previous _hint_, filter fields can traverse [database relationships](retrieve-data.md#traversing-the-relational-model):

{% tabs %}
{% tab title="Related Filters" %}
```python
{related_filter}__{related_field}="query"
```

Here is a quick representation of Isabl's relational model, hence related filters:

![Representation of Isabl&apos;s relational model.](https://docs.google.com/drawings/d/e/2PACX-1vTG3QBMOtwM5DhpFG07iQFj0SA0J7CE4e8Xd3ZJcpJy24EiDu9HbGomqslNFgqV3rauJ-z_VU-SY-ja/pub?w=1305&h=791)
{% endtab %}

{% tab title="Lookup Types" %}
Furthermore, all query parameters in this API support advanced lookup types:

| Lookup Type | Description | Example |
| :--- | :--- | :--- |
| **`!`** | Negate any query | `name!=isabel` |
| **`[i]exact`** | Exact match | `name__exact=isabl`  `name__iexact=IsAbL` |
| **`[i]contains`** | Value contains query | `name__contains=isa`  `name__icontains=iSa` |
| **`[i]startswith`** | Value starts with query | `name__startswith=isab`  `name__istartswith=iSab` |
| **`[i]endswith`** | Value starts with query | `name__endswith=bl`  `name__iendswith=bL` |
| **`in`** | Comma separated query | `name__in=isabl,besuhof` |
| **`isnull`** | Value is null | `name__isnull=true` |
| **`regex`** | Use regex pattern | `name__regex=isabl` |
| **`gt`** | Greater than | `total__gt=1` |
| **`gte`** | Greater or equal | `total__gte=1` |
| **`lt`** | Less than | `total__lt=1` |
| **`lte`** | Less than or equal | `total__lte=1` |
{% endtab %}

{% tab title="Datetime Lookups" %}
Moreover, _Datetime_ query parameters support extra lookups:

| Lookup Type | Description | Example |
| :--- | :--- | :--- |
|   `` | No lookup, `ISO` format required | `created=` |
| **`date`** | Filter by date `YYYY-MM-DD`. | `created__date=2016-06-04`  `created__date__gt=2016-06-04` |
| **`day`** | Filter by day `DD` | `created__day=04` |
| **`month`** | Filter by month `MM` | `created__month=06` |
| **`year`** | Filter by year `YYYY` | `created__year=2016` |
| **`time`** | Filter by time `HH-MM-SS` | `created__time=21:00:51` |
{% endtab %}

{% tab title="Full Relational Model" %}
![UML Diagram of Isabl&apos;s relational model.](https://user-images.githubusercontent.com/7906289/56929717-5f740600-6aa8-11e9-8f31-4ce7a4c828f3.png)
{% endtab %}
{% endtabs %}

{% hint style="info" %}
To get a full description of all available filters please visit Isabl's Redoc API documentation by [https://isabl.mskcc.org/api/v1 ](https://isabl.mskcc.org/api/v1/)\(or replacing `isabl.mskcc.org` with your own host.\)
{% endhint %}

### Common Filters

#### Limit vs Count Limit

### Finding Available Filters from Redoc

Filters can be used in the api, the interactive cli or any filter option in apps, and they are a very powerful feature to make complex queries. A good understanding of the database schema and how the models are related are key to use the filters. The following UML diagram shows this database chema relationship:

### Traversing the Relational Model

### 

### Common Filters

## Isabl Command Line Client

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



## Isabl Software Development Kit

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

## **Isabl Web**

### **Searching**

### **Projects Detail Panel**

### **The Samples View**

### **Accessing Raw Data**

### Analyses Results

