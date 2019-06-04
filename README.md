# Overview

Isabl is a plug-and-play open-source framework for scalable bioinformatics operations designed to support automated processing and management of NGS assets and their metadata. Isabl's patient centric model enables advanced integrations with multinomial data types and linkage to other institutional information systems such as clinical databases and visualization interfaces.

![It is composed of an extensible relational database \(Isabl-db\), a comprehensive RESTful API \(Isabl-API\), a Command Line Client \(Isabl-CLI\), and a front end single page web application \(Isabl-web\)](https://docs.google.com/drawings/d/e/2PACX-1vQnO2UBtPAGuUqobgfAH2GFbvuE5aCAzrYpxa_nBb8tigeT-GdfAkurTnOpzrpa_QDxBH-nrQ-lnxEk/pub?w=998&h=712)

### Quick Start

Take a tour with our 10 minutes [quick start guide](quick-start.md)! 

{% page-ref page="quick-start.md" %}

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

