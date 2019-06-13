# Importing Data

Isabl-CLI enables tracking and managing of NGS data, as well as reference resources that are a function of a _genome assembly_ or a _sequencing technique_.

### NGS Data Import

Isabl-CLI supports automated data import by recursively exploring data deposition directories and matching NGS files with identifiers registered in the database. For example, the client can be instructed to explore the `/projects` directory \(**A**\), retrieving only samples from _Project 393_, and match files using _Sample Identifiers_ \(**B**\).

![import-from](https://docs.google.com/drawings/d/e/2PACX-1vTXjWyPRNRKJaj5R5_dZgQWkVEJ3HjOFdMP2XIir9cFv0pMvXRC7fuzN-xyAAiFr6SWA70hq8yqBxBI/pub?w=749&h=526)

Upon `--commit`, Isabl-CLI proceeds to move \(or symlink\) matched files into scalable directory structures \(**C**\). The experiments data path is created by hashing the four last digits of the its primary key. For instance, data for Experiment 57395 will be stored at `{storage-directory}/experiments/73/95/57395/`. This hashing approach ensures a maximum of 1000 subdirectories in any folder at a worst case scenario of 10 million experiments.

### Import Reference Data and BED files

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

The need to register arbitrary resources for any assembly \(e.g. gene annotations\) is also supported:

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

Lastly, you can register BED files for any sequencing technique, which will be compressed, indexed, moved to the technique data directory, and registered in the database:

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

### Customizing Import Logic

All registration mechanisms are configurable and can be customized by providing an alternative python `sub class`:

| Setting Name | Default |
| :--- | :--- |
| **DATA\_IMPORTER** | isabl\_cli.data.LocalDataImporter |
| **REFERENCE\_GENOME\_IMPORTER** | isabl\_cli.data.LocalReferenceGenomeImporter |
| **REFERENCE\_DATA\_IMPORTER** | isabl\_cli.data.LocalReferenceDataImporter |
| **BED\_IMPORTER** | isabl\_cli.data.LocalBedImporter |

Although only local storage is supported at the time of writing, Isabl-CLI capability can be extrapolated to cloud solutions including integration with cloud workbenches such as Arvados.

