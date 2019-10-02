---
description: "\U0001F4E6 Learn how to import raw data into Isabl using existing metadata."
---

# Importing Data

Isabl-CLI enables tracking and managing of raw data, as well as reference resources that are a function of a _genome assembly_ or an _experimental technique_.

## Data Import

Isabl-CLI supports automated data import by recursively exploring data deposition directories and matching raw data files with identifiers registered in the database. For example, the client can be instructed to explore the `/projects` directory \(**A**\), retrieving only samples from _Project 393_, and match files using _Sample Identifiers_ \(**B**\).

![Isabl supports automatic import from data deposition directories.](https://user-images.githubusercontent.com/8843150/62899370-a1f2e300-bd25-11e9-9e50-1d88e870d19a.png)

Upon `--commit`, Isabl-CLI proceeds to move \(or symlink\) matched files into scalable directory structures \(**C**\). The experiments data path is created by hashing the four last digits of the its primary key. For instance, data for Experiment 57395 will be stored at `{storage-directory}/experiments/73/95/57395/`. This hashing approach ensures a maximum of 1000 subdirectories in any folder at a worst case scenario of 10 million experiments.

### Supported Data Formats

Isabl experiments can be linked to any kind of data. Be default Isabl will match the following data types:

```python
RAW_DATA_FORMATS = [
    ("CRAM", "CRAM"),
    ("FASTQ_R1", "FASTQ_R1"),
    ("FASTQ_R2", "FASTQ_R2"),
    ("FASTQ_I1", "FASTQ_I1"),
    ("BAM", "BAM"),
    ("PNG", "PNG"),
    ("JPEG", "JPEG"),
    ("TXT", "TXT"),
    ("TSV", "TSV"),
    ("CSV", "CSV"),
    ("PDF", "PDF"),
    ("DICOM", "DICOM"),
    ("MD5", "MD5"),
]
```

If you need to support more raw data formats, you will need to extend the [valid data format choices](isabl-settings.md#extra-choices-settings) and provide a new [data importer](isabl-settings.md#isabl-cli-settings). 

{% hint style="info" %}
**Tip:** subclassing `isabl_cli.data.LocalDataImporter` and overwriting `RAW_DATA_INSPECTORS`might be enough to support new data formats.
{% endhint %}

## Import Reference Data and BED files

You can link reference data to assemblies and techniques. Here are a few ways of how to go about it.

### Link Arbitrary Reference Data for Techniques and Assemblies

The need to register _arbitrary_ resources for any assembly or technique \(e.g. gene annotations\) is also supported:

```bash
isabl import-reference-data --help

# extra resources are included in the assembly directory
assemblies/
├── GRCh37
│   ├── chr_alias
│   │   └── hg19_alias.tab
│   ├── cytoband
│   │   └── cytoBand.txt
│   ├── genes
│   │   └── refGene.txt
│   └── genome_fasta
│       └── GRCh37.fasta ...
└── GRCm38
```

### Import Assembly Reference Genome

Isabl supports the ability to track resources for assemblies and techniques. For instance, ensuring that reference FASTA files are uniformly index, named, and tracked across genome builds:

```bash
# indexes are created with `bwa index`, `samtools faidx`, `samtools dict`
isabl import-reference-genome --help

# example of isabl assemblies directories
assemblies/
├── GRCh37
│   └── genome_fasta
│       ├── GRCh37.fasta
│       ├── GRCh37.fasta.amb
│       ├── GRCh37.fasta.ann
│       ├── GRCh37.fasta.bwt
│       ├── GRCh37.fasta.dict
│       ├── GRCh37.fasta.fai
│       ├── GRCh37.fasta.pac
│       └── GRCh37.fasta.sa
└── ...
```

### Import BED Files for Sequencing Techniques

Lastly, you can register BED files for any _sequencing_ technique, which will be compressed, indexed, moved to the technique data directory, and registered in the database:

```bash
# compressed with bgzip, indexed with tabix
isabl import-bedfiles --help

# example of isabl technique directories
techniques/
├── 34
│   └── bed_files
│       └── GRCh37
│           ├── dna-td-hemepact-v4-grch37.baits.bed
│           ├── dna-td-hemepact-v4-grch37.baits.bed.gz
│           ├── dna-td-hemepact-v4-grch37.baits.bed.gz.tbi
│           ├── dna-td-hemepact-v4-grch37.targets.bed
│           ├── dna-td-hemepact-v4-grch37.targets.bed.gz
│           └── dna-td-hemepact-v4-grch37.targets.bed.gz.tbi
└── ...
```

Imported assets are available for systematic processing by Isabl applications.

## Customizing Import Logic

All registration mechanisms are configurable and can be customized by providing an alternative python `sub class`:

| Setting Name | Default |
| :--- | :--- |
| **DATA\_IMPORTER** | isabl\_cli.data.LocalDataImporter |
| **REFERENCE\_GENOME\_IMPORTER** | isabl\_cli.data.LocalReferenceGenomeImporter |
| **REFERENCE\_DATA\_IMPORTER** | isabl\_cli.data.LocalReferenceDataImporter |
| **BED\_IMPORTER** | isabl\_cli.data.LocalBedImporter |

Although only local storage is supported at the time of writing, Isabl-CLI capability can be extrapolated to cloud solutions including integration with cloud workbenches such as Arvados.

