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

### Filters Modifiers

As indicated in the previous _hint_, filter fields can traverse database relationships. However, all filters can be augmented using _lookups:_

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
To get a full description of all available filters please visit Isabl's Redoc API documentation by [https://isabl.mskcc.org/api/v1 ](https://isabl.mskcc.org/api/v1/)\(or replacing `isabl.mskcc.org` with your own host.\) Another useful way to explore the relational model is by using [`isabl get-metadata`](retrieve-data.md#dynamically-explore-metadata).
{% endhint %}

### Common Filters

Here are some common and  useful filters for Isabl.

#### Limit vs Count Limit

The filter `count_limit` enables you to limit the total number of instances that will be retrieved. For example to get the output directory for the first 10 successful analyses you could do:

```bash
isabl get-outdirs -fi status SUCCEEDED -fi count_limit 10
```

On the other side, `limit` will determine how many instances should be retrieved at the same time. For example, the following command would retrieve paths to _all_ successful analyses in batches of 10000:

```bash
isabl get-outdirs -fi status SUCCEEDED -fi limit 100000
```

#### Has BAM File

To get for example all experiments that have a BAM file for `GRCh37` you could do:

```python
experiments = ii.experiments(has_bam_for="GRCh37")
```

## Isabl Command Line Client

Filters in the command line are usually provided using the `-fi` or `--filters` flags. Relations or lookups can be provided using double underscores or dots \(e.g. `application.name` or `application__name`\). Here is a list of Isabl commands available to retrieve information:

| Command | Description | Example |
| :--- | :--- | :--- |
| **`get-count`** | Get count of database instances given a particular query. For example, how many failed analyses are in the system? | `isabl get-count analyses -fi status FAILED` |
| **`get-metadata`** | Retrieve instances metadata in multiple formats. To limit the number of fields you are interested in use `-f` \(i.e. [`--fields`](retrieve-data.md#dynamically-explore-metadata)\). | `isabl get-metadata samples -fi sample_class TUMOR -f disease`  |
| **`get-data`** | This command will retrieved the _raw_ sequencing data linked to experiments as imported in Isabl \(e.g. BAM, FASTQ, CRAM\). Use `--verbose` to see what experiments have _**missing**_ data. | `isabl get-data -fi projects.pk.in 102,103`  |
| **`get-bams`** | Get the _official_ bam registered for a given list of experiments. Use `--assembly`if there are BAMs available for different versions of the genome. Use [`has_bam_for`](retrieve-data.md#has-bam-file) to filter those experiments with a registered BAM. | `isabl get-bams -fi has_bam_for GRCh37` |
| **`get-reference`** | Isabl supports the linkage of auxiliary resources to the _assembly_ instances. [By default](retrieve-data.md#assembly-resources)`get-reference` gives you the path to the reference FASTA, however you can retrieve other linked resources. | `isabl get-reference GRCh37` |
| **`get-bed`** | Retrieve a BED file linked to a particular sequencing technique. By default, the _targets_ BED file is returned, to get the _baits_ BED use `--bed-type`. | `isabl get-bed HEMEPACT --assembly GRCh37` |
| **`get-paths`** | Retrieve the storage directory for any instance in the database. Use [`--pattern`](retrieve-data.md#retrieving-application-results) to retrieve files within those directories. | `isabl get-paths projects 102` |
| **`get-outdirs`** | This command is a short cut of `isabl get-paths analyses`. Learn more about retrieving results [here](retrieve-data.md#retrieving-application-results). | `isabl get-outdirs -fi name PINDEL -fi status SUCCEEDED` |
| **`get-results`** | Retrieve analyses results produced by applications. Use [`--app-results`](retrieve-data.md#retrieving-application-results)to list all available choices for a given application. | `isabl get-results -fi application.pk 1 -r command_script` |

### Dynamically Explore Metadata

Another useful way to explore the relational model is by using `isabl get-metadata`:

```bash
isabl get-metadata experiments --fx
```

![](.gitbook/assets/cli_metadata.slow.gif)

{% hint style="info" %}
Expand and navigate with arrow keys, press e to _expand all_ and E to minimize. Learn more at [`fx` documentation](https://github.com/antonmedv/fx/blob/master/docs.md#interactive-mode). Use `--help` to learn about other ways to visualize metadata \(e.g. `tsv`\).
{% endhint %}

Furthermore, you can limit the amount of information you are retrieving by passing the list of fields you are interested in:

```bash
isabl get-metadata analyses -f application.name -f status
```

### Assembly Resources

By default, the command `get-reference` helps you retrieve the assembly reference genome. 

```bash
isabl get-reference GRCh37    # retrieve reference genome
```

However, by means of the `--data-id` flag, the command `get-reference` also allows you to retrieve the indexes generated during import. To get a list of available files per assembly use `--resources`:

```bash
$ isabl get-reference GRCh37 --resources

    genome_fasta         Reference Genome Fasta File.
    genome_fasta_fai     Index generated by: samtools faidx
    ...
```

Then get the one you are interested in with:

```bash
isabl get-reference GRCh37 --data-id genome_fasta_fai
```

### Retrieving Application Results

You can use `get-outdirs` within the command line to systematically explore output directories. For example:

```bash
isabl get-outdirs -fi status FAILED | xargs tree -L 2
```

Further more you can retrieve files within those directories by using `--pattern`:

```bash
isabl get-outdirs -fi status FAILED --pattern 'head_job.*'
```

Additionally, you can retrieve results directly registered by the application:

```bash
for i in `isabl get-results -fi status FAILED -r command_err`; do
   echo exploring $i;
   cat $i;
done
```

To visualize what results are available for a given application run:

```bash
isabl get-results --app-results <application primary key> 
```

{% hint style="info" %}
You can retrieve the application primary key from the front end.
{% endhint %}

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

