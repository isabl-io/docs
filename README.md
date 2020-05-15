---
description: >-
  Isabl is a platform for the integration, management, and processing of
  individual-centric multimodal data. Welcome to the Isabl Documentation!
---

# Home

Isabl is a plug-and-play data science framework designed to support automated processing and management of patient-centric digital assets and their metadata. Isabl's patient centric model enables advanced integrations with multimodal data types and linkage to other institutional information systems such as clinical databases and visualization interfaces. Have questions? Ask [here](https://gitter.im/isabl-io/community).

{% page-ref page="quick-start.md" %}

## Features

* 👾 **Backend, Data Model and RESTful API**
  * Metadata version control
  * Fully featured and brisk RESTful API with extensive swagger documentation
  * Comprehensive permissions controls and user groups
  * Patient centric relational model with support for:
    * _Individuals_, _samples_,  _experiments_ and _cohorts_
    * _Assembly_ aware bioinformatics _applications_ and _analyses_
    * Choice models such as _diseases_, _centers_ and more
    * **Custom fields** for all schemas!
* 🤖 **Command Line Interface and Software Development Kit**
  * Digital Assets Management \(Permissions, Storage, Tracking\)
  * Automated execution and tracking of bioinformatics applications
  * Project and patient level results auto-merge
  * Operational automations on data import and analyses status change
  * Dynamic retrieval of data and results using versatile queries
  * Fully featured SDK for post-processing analyses
* 🚀 **Web Application**
  * User Interface to browse and manage the operations metadata
  * Analyses tracking and results visualization
  * Flexibility to edit and customize models
  * Batch creation of metadata by excel file submission
  * Single Page Application that provides a crispy user experience
  * Possibility to integrate third-party services like JIRA
* ✅ **Plug-n-play and reliable codebase**
  * Docker-compose is the only dependency for the web application and the backend
  * The Command Line Interface is a portable pip installable package
  * Continuously Integrated with +98 % coverage across all codebase
  * isabl is upgradable, no need to fork out from codebase

## Who is using Isabl

* [Elli Papaemmanuil's lab](https://www.mskcc.org/research-areas/labs/elli-papaemmanuil).
* The [Department of Pediatrics](https://www.mskcc.org/blog/one-one-how-msk-using-precision-medicine-tailor-treatment-children-cancer) at Memorial Sloan Kettering.
* [Sohrab Shah's lab](https://www.mskcc.org/profile/sohrab-shah) \(they have nicely [documented](https://shahlab.ca/isabl_api/) their experience with Isabl\).

## Infrastructure

Isabl is a modular infrastructure with four main components: \(1\) an individual-centric and extensible relational database \(Isabl-db\); \(2\) a comprehensive RESTful API \(Isabl-api\) used to support integration with data processing environments and enterprise systems \(e.g. clinical databases, visualization platforms\); \(3\) a Command Line Client \(CLI; Isabl-cli\) used to manage digital assets and deploy bioinformatics applications; \(4\) a front end single page web application \(Isabl-web\) with system wide queries enabled.

![Isabl is composed of a patient centric relational model, a web-based metadata architecture, and a command line client.](https://docs.google.com/drawings/d/e/2PACX-1vQnO2UBtPAGuUqobgfAH2GFbvuE5aCAzrYpxa_nBb8tigeT-GdfAkurTnOpzrpa_QDxBH-nrQ-lnxEk/pub?w=998&h=712)

RESTful API capabilities are documented with Swagger \([https://swagger.io](https://swagger.io)\) and Redoc \([https://github.com/Rebilly/ReDoc](https://github.com/Rebilly/ReDoc)\) following OpenAPI specifications \([https://www.openapis.org](https://www.openapis.org/)\). Importantly, Isabl's metadata infrastructure is decoupled and agnostic of compute and data storage environments \(e.g. local, cluster, cloud\). This functionality separates dependencies and fosters interoperability across compute environments.

![](https://docs.google.com/drawings/d/e/2PACX-1vTLYVgPubPSlSgyUahpZ3fOT-p9lmrMet5qCl1klS2VzEnFIE4zLW0WK3cDZaCgAmwcsa3Ta-J9ujdG/pub?w=889&h=667)

## Data Model

**I**sabl's relational model maps workflows for data provenance, processing, and governance. Metadata is captured across the following thematic categories: \(1\) project, individual and sample level attributes; \(2\) raw data properties including experimental technique, technology, and related parameters \(e.g. read length\); \(3\) analytical workflows to include a complete audit trail of versioned algorithms, related execution parameters, reference files, analyses status tracking, and results deposition; \(4\) data governance information for management of system and data access across stakeholders.

![](https://docs.google.com/drawings/d/e/2PACX-1vTG3QBMOtwM5DhpFG07iQFj0SA0J7CE4e8Xd3ZJcpJy24EiDu9HbGomqslNFgqV3rauJ-z_VU-SY-ja/pub?w=1305&h=791)

## Why Isabl

Isabl ensures that all bioinformatics operations follow the DATA reproducibility checklist \(Documentation, Automation, Traceability, and Autonomy\), whilst guarantees that assets are managed according to the FAIR principles \(Findable, Interoperable, Accessible, Reusable\).

![](https://docs.google.com/drawings/d/e/2PACX-1vRCagXfy-ubxEHKL3GOSTTEGE1g9hWk1Ic0yTx3tWsBJHWSIfO5Y2Hcu0wTeBtb3mA1DeEXKw4c1fBd/pub?w=1216&h=810)

Here are some reasons why you may want to use Isabl:

* You don't have a +10 engineers group but do have hundreds of samples
* You'll rather not have your data managed by postdocs, PhD students
* Crosslink samples from different cohorts
* Answer new questions using existing data
* Full log and audit trail of your informatics operations
* Automatically merge results as new samples are added to big cohorts
* You want to have programmatic access to the entire data capital
* Seamlessly run reproducible pipelines across your projects

{% embed url="https://www.youtube.com/watch?v=L1JhVqZ3oBY" caption="" %}

## Similar projects

* [The Genome Modeling System](https://github.com/genome/gms) _Genome Institute at Washington University platform._
* [SeqWare](https://seqware.github.io/) _analyze massive genomics datasets._
* [QuickNGS](http://bifacility.uni-koeln.de/quickngs/web/) _efficient high-throughput data analysis of Next-Generation Sequencing data._
* [HTS-flow](https://github.com/arnaudceol/htsflow) _a framework for the management and analysis of NGS data._

## What Isabl is not

* Isabl is not a _Workflow Management System_ such as [toil](https://github.com/DataBiosphere/toil), [bpipe](https://github.com/ssadedin/bpipe), instead Isabl facilitates automated deployment and databasing of data processing pipelines.
* Isabl is not a _Platform as a Service \(PAAS\)_ provider such as [DNA nexus](https://www.dnanexus.com), [Seven Bridges](https://www.sevenbridges.com) or [Fire Cloud](https://software.broadinstitute.org/firecloud/), instead an information system that could potentially feed in metadata and data to these services.
* Isabl differs from _Server Workbenches_ such as [Galaxy](https://usegalaxy.org/) or Pegasus, instead of being configuration friendly, Isabl is designed to conduct systematic analyses automatically and in a standardized way with as little human input as possible.
* Isabl is not a _Workflow Language_, instead the Bioinformatics Applications in `isabl` only define meta-data driven validation and logic to build commands to trigger pipelines written in any language.

