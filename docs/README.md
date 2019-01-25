!> **Attention** Work in progress! repos will be released after publication 🚧

# Isabl

Isabl is an open source plug-n-play framework for scalable bioinformatics operations with support for metadata management and automated data processing. It is composed of an individual-centric and extensible relational database (Isabl-db), a comprehensive RESTful API (Isabl-api), a Command Line Client (Isabl-cli), and a front end single page web application (Isabl-web).

## Quick Start

Take a tour with our 10 minutes [quick start guide](tutorials/quick_start)!

## Features

* 👾 **Backend, Data Model and RESTful API**
    * Fully featured and brisk RESTful API with extensive swagger documentation
    * Comprehensive permissions controls and user groups
    * Patient centric relational model with support for:
        * *Individuals*, *samples*, sequencing *experiments* and *cohorts*
        * *Assembly* aware bioinformatics *applications* and *analyses*
        * Choice models such as *diseases*, *centers* and more
        * **Custom fields** for all schemas

* 🤖 **Command Line Interface and Software Development Kit**
    * NGS Assets Management (Permissions, Storage, Tracking)
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

## Infrastructure

`isabl` is composed of an extendable, performant and well documented backend and RESTful API, a lightweight Command Line Utility used to manage NGS data and deploy bioinformatics applications at scale, and a intuitive web application that enables dynamic interrogations across all the NGS capital. This 'microservice' approach results in a collection of loosely coupled services with explicit and lightweight functions, making the infrastructure much more accessible, testable and approachable for the community.

![infrastructure]

## Data model

`isabl` models a NGS data generation process where sequencing *Experiments* such as Whole Genome Sequencing are performed on *Samples* collected from different *Individuals*. This normalization approach reduces data redundancy and improves data integrity. The concept of cohorts, where multiple *Experiments* are grouped and analyzed together, is fundamental and well supported. Furthermore, `isabl` also tracks and executes *Assembly* aware *Bioinformatics Applications* making sure that results are a function of the reference genome. Instances of these applications are also tracked and referred as *Analyses*.

![data model]

## Similar projects

* [The Genome Modeling System]
* [SeqWare]
* [QuickNGS]
* [HTS-flow]

## What Isabl is not

This project is not a:

* Workflow Management System such as [toil], [bpipe], istead Isabl facilitates automated deployment and databasing of data processing pipelines.
* Platform as a Service (PAAS) provider such as [DNA nexus], [Seven Bridges] or [Fire Cloud], instead an information system that could potentially feed in metadata and data to these services.
* A Server Workbench such as [Galaxy] or Pegasus, instead of being configuration friendly, Isabl is designed to conduct systematic analyses automatedly and in a standardized way with as little human input as possible.
* workflow language, instead the *Bioinformatics Applications* in `isabl` only define meta-data driven validation and logic to build commands to trigger pipelines written in any language.

[bpipe]: https://github.com/ssadedin/bpipe
[data model]: https://docs.google.com/drawings/d/e/2PACX-1vTfH_lsxbY2RtIS56F_r3FFQEdC1JghHWU5HWG3J5-TLo59FMKuFWIgBaHdJaNO1L-2muoVLIPxWFwg/pub?w=1102&h=484
[dna nexus]: https://www.dnanexus.com
[fire cloud]: https://software.broadinstitute.org/firecloud/
[galaxy]: https://usegalaxy.org/
[hts-flow]: https://github.com/arnaudceol/htsflow
[infrastructure]: https://docs.google.com/drawings/d/e/2PACX-1vQF28gk8NrZ8nZXi7w8trxHWZRc-j-hWYec3UWdNbXY1WAgT8SNMIZX3B5KEaQ7iEPVzpfj2HAmIpwu/pub?w=1101&h=625
[quickngs]: http://bifacility.uni-koeln.de/quickngs/web/
[seqware]: https://seqware.github.io/
[seven bridges]: https://www.sevenbridges.com
[the genome modeling system]: https://github.com/genome/gms
[toil]: https://github.com/DataBiosphere/toil
