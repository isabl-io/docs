# Bee

> Bioinformatics operations at scale.

## What is it

Bee is a framework to conduct bioinformatics operations at scale. It addresses the need of entities such as research labs, sequencing centers, bioinformatics cores, molecular diagnostic enterprises and pharmaceuticals to manage their genomics capital and maximize the utilization of Next Generation Sequencing assets by providing them with a modular, opensource, plug-and-play infrastructure.

🚀 Get up and running in 10 minutes with our [quick start guide](tutorials/quick_start)!

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
    * Excel forms submission

* ✅ **Plug-n-play and reliable codebase**
    * Docker-compose is the only dependency for the web application and the backend
    * The Command Line Interface is a portable pip installable package
    * Continuously Integrated with +98 % coverage across all codebase
    * Bee is upgradable, no need to fork out from codebase

## Infrastructure

Bee is composed of an extendable, performant and well documented backend and RESTful API, a lightweight Command Line Utility used to manage NGS data and deploy bioinformatics applications at scale, and a intuitive web application that enables dynamic interrogations across all the NGS capital. This 'microservice' approach results in a collection of loosely coupled services with explicit and lightweight functions, making the infrastructure much more accessible, testable and approachable for the community.

![infrastructure]

## Data model

Bee models a NGS data generation process where sequencing *Experiments* such as Whole Genome Sequencing are performed on *Samples* collected from different *Individuals*. Bee's normalization approach reduces data redundancy and improves data integrity. The concept of cohorts, where multiple *Experiments* are grouped and analyzed together, is fundamental to Bee and is well supported. Bee also tracks and executes *Assembly* aware *Bioinformatics Applications* making sure that results are a function of the reference genome. Instances of these applications are also tracked and referred as *Analyses*.

![data model]

## What bee is not

* Bee is not a workflow execution engine such as [toil] or [bpipe], instead an platform that trigger these engines and track their results

* Bee is not a platform as a service (PAAS) provider such as [DNA nexus], [Seven Briges] or [Fire Cloud], instead an information system that could potentially feed in metadata and data to these services.

* Bee is not a workflow engine, instead the *Bioinformatics Applications* in bee only define mata-data driven validation and logic to build commands to trigger pipelines written in any language.

[data model]: https://docs.google.com/drawings/d/e/2PACX-1vTfH_lsxbY2RtIS56F_r3FFQEdC1JghHWU5HWG3J5-TLo59FMKuFWIgBaHdJaNO1L-2muoVLIPxWFwg/pub?w=737&h=310
[infrastructure]: https://docs.google.com/drawings/d/e/2PACX-1vQF28gk8NrZ8nZXi7w8trxHWZRc-j-hWYec3UWdNbXY1WAgT8SNMIZX3B5KEaQ7iEPVzpfj2HAmIpwu/pub?w=734&h=416

[dna nexus]: https://www.dnanexus.com
[toil]: https://github.com/DataBiosphere/toil
[bpipe]: https://github.com/ssadedin/bpipe
