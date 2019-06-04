---
description: '⏱ tutorial time: 10 minutes'
---

# Register Metadata

### Isabl Data Model

`isabl` models a NGS data generation process where sequencing _Experiments_ such as Whole Genome Sequencing are performed on _Samples_ collected from different _Individuals_. This normalization approach reduces data redundancy and improves data integrity. The concept of cohorts, where multiple _Experiments_ are grouped and analyzed together, is fundamental and well supported. Furthermore, `isabl` also tracks and executes _Assembly_ aware _Bioinformatics Applications_ making sure that results are a function of the reference genome. Instances of these applications are also tracked and referred as _Analyses_.

{% tabs %}
{% tab title="Data Generation Process" %}
![](https://docs.google.com/drawings/d/e/2PACX-1vQMwiVKHt3qSVyDK9FVErQsKBOD6XSEzCAXV6CN1CPTtL_OhZAnqAFtbd4DmCgo6OUmOr9jiWUx_tLF/pub?w=959&h=540)
{% endtab %}

{% tab title="Database Diagram" %}
![](https://docs.google.com/drawings/d/e/2PACX-1vSwWHBNAC_xh7IjDKaXnh0c4PN0cg1RopPG0_s9jHS2Jg1Zg4P3o4b0qU9tJ-5dQQhH9bTht4p3etGH/pub?w=2512&h=3263)
{% endtab %}

{% tab title="Unique Together Constraints" %}
Unique together constraints enable Isabl link new samples and experiments to existing records in the database. The following fields are enforced to be unique together across the entire system:

<table>
  <thead>
    <tr>
      <th style="text-align:left">Database Schema</th>
      <th style="text-align:left">Unique Together Fields</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"><b>Individual</b>
      </td>
      <td style="text-align:left">
        <ul>
          <li>Center</li>
          <li>Species</li>
          <li>Identifier</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><b>Samples</b>
      </td>
      <td style="text-align:left">
        <ul>
          <li>Individual</li>
          <li>Sample Class</li>
          <li>Identifier</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><b>Experiments</b>
      </td>
      <td style="text-align:left">
        <ul>
          <li>Sample</li>
          <li>Aliquot ID</li>
          <li>Technique</li>
          <li>Identifier</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
{% endtab %}
{% endtabs %}

### Metadata Registration

Isabl offer different mechanisms for metadata registration.

![](https://docs.google.com/drawings/d/e/2PACX-1vRWmNY79RBwL1llZxb7zk_bY7cYmJDsClQnMakgNNit7A2JDNXdedgDTCJ-aTqcWka_ltW95o4SEpoM/pub?w=1264&h=554)



### Register Samples with Excel

TODO

### Register Samples with RESTful API and CLI

TODO





