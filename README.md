# Isabl

Isabl is an open source plug-n-play framework for scalable bioinformatics operations with support for metadata management and automated data processing. It is composed of an individual-centric and extensible relational database \(Isabl-db\), a comprehensive RESTful API \(Isabl-api\), a Command Line Client \(Isabl-cli\), and a front end single page web application \(Isabl-web\).

### Quick Start

Take a tour with our 10 minutes [quick start guide](tutorials/quick_start)!

### Features

* 👾 **Backend, Data Model and RESTful API**
  * Fully featured and brisk RESTful API with extensive swagger documentation
  * Comprehensive permissions controls and user groups
  * Patient centric relational model with support for:
    * _Individuals_, _samples_, sequencing _experiments_ and _cohorts_
    * _Assembly_ aware bioinformatics _applications_ and _analyses_
    * Choice models such as _diseases_, _centers_ and more
    * **Custom fields** for all schemas
* 🤖 **Command Line Interface and Software Development Kit**
  * NGS Assets Management \(Permissions, Storage, Tracking\)
  * Automated execution and tracking of bioinformatics applications
  * Project and patient level results automerge
  * Operational automations on data import and analyses status change
  * Dynamic retrieval of data and results using versatile queries
  * Fully featured SDK for postprocessing analyses
* 🚀 **Web Application**
  * User Interface to browse and manage the operations metadata
  * Analyses tracking and results visualization
  * Flexibility to edit and customize models
  * Batch creation of metadata by excel file submission
  * Single Page Application that provides a cripsy user experience
  * Possibility to integrate third-party services like JIRA
* ✅ **Plug-n-play and reliable codebase**
  * Docker-compose is the only dependency for the web application and the backend
  * The Command Line Interface is a portable pip installable package
  * Continuously Integrated with +98 % coverage across all codebase
  * isabl is upgradable, no need to fork out from codebase

### Infrastructure

`isabl` is composed of an extendable, performant and well documented backend and RESTful API, a lightweight Command Line Utility used to manage NGS data and deploy bioinformatics applications at scale, and a intuitive web application that enables dynamic interrogations across all the NGS capital. This 'microservice' approach results in a collection of loosely coupled services with explicit and lightweight functions, making the infrastructure much more accessible, testable and approachable for the community.

![](https://docs.google.com/drawings/d/e/2PACX-1vQF28gk8NrZ8nZXi7w8trxHWZRc-j-hWYec3UWdNbXY1WAgT8SNMIZX3B5KEaQ7iEPVzpfj2HAmIpwu/pub?w=1101&h=625)

### Data model

`isabl` models a NGS data generation process where sequencing _Experiments_ such as Whole Genome Sequencing are performed on _Samples_ collected from different _Individuals_. This normalization approach reduces data redundancy and improves data integrity. The concept of cohorts, where multiple _Experiments_ are grouped and analyzed together, is fundamental and well supported. Furthermore, `isabl` also tracks and executes _Assembly_ aware _Bioinformatics Applications_ making sure that results are a function of the reference genome. Instances of these applications are also tracked and referred as _Analyses_.

![](https://docs.google.com/drawings/d/e/2PACX-1vTfH_lsxbY2RtIS56F_r3FFQEdC1JghHWU5HWG3J5-TLo59FMKuFWIgBaHdJaNO1L-2muoVLIPxWFwg/pub?w=1102&h=484)

### Similar projects

* [The Genome Modeling System](https://github.com/genome/gms)
* [SeqWare](https://seqware.github.io/)
* [QuickNGS](http://bifacility.uni-koeln.de/quickngs/web/)
* [HTS-flow](https://github.com/arnaudceol/htsflow)

### What Isabl is not

This project is not a:

* Workflow Management System such as [toil](https://github.com/DataBiosphere/toil), [bpipe](https://github.com/ssadedin/bpipe), istead Isabl facilitates automated deployment and databasing of data processing pipelines.
* Platform as a Service \(PAAS\) provider such as [DNA nexus](https://www.dnanexus.com), [Seven Bridges](https://www.sevenbridges.com) or [Fire Cloud](https://software.broadinstitute.org/firecloud/), instead an information system that could potentially feed in metadata and data to these services.
* A Server Workbench such as [Galaxy](https://usegalaxy.org/) or Pegasus, instead of being configuration friendly, Isabl is designed to conduct systematic analyses automatedly and in a standardized way with as little human input as possible.
* workflow language, instead the _Bioinformatics Applications_ in `isabl` only define meta-data driven validation and logic to build commands to trigger pipelines written in any language.

## 

