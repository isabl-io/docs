---
description: '⏱ tutorial time: 10 minutes'
---

# Registering Metadata

### Isabl Data Model

`isabl` models a NGS data generation process where sequencing _Experiments_ such as Whole Genome Sequencing are performed on _Samples_ collected from different _Individuals_. This normalization approach reduces data redundancy and improves data integrity. 

{% tabs %}
{% tab title="Data Generation Process" %}
![](https://docs.google.com/drawings/d/e/2PACX-1vQMwiVKHt3qSVyDK9FVErQsKBOD6XSEzCAXV6CN1CPTtL_OhZAnqAFtbd4DmCgo6OUmOr9jiWUx_tLF/pub?w=959&h=540)
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

{% tab title="Database Diagram" %}
![](https://docs.google.com/drawings/d/e/2PACX-1vSwWHBNAC_xh7IjDKaXnh0c4PN0cg1RopPG0_s9jHS2Jg1Zg4P3o4b0qU9tJ-5dQQhH9bTht4p3etGH/pub?w=2512&h=3263)
{% endtab %}
{% endtabs %}

The concept of cohorts, where multiple _Experiments_ are grouped and analyzed together, is fundamental and well supported. Furthermore, `isabl` also tracks and executes _Assembly_ aware _Bioinformatics Applications_ making sure that results are a function of the reference genome. Instances of these applications are also tracked and referred as _Analyses_.

![](https://docs.google.com/drawings/d/e/2PACX-1vTG3QBMOtwM5DhpFG07iQFj0SA0J7CE4e8Xd3ZJcpJy24EiDu9HbGomqslNFgqV3rauJ-z_VU-SY-ja/pub?w=1305&h=791)

### Metadata Registration

Isabl offer different mechanisms for metadata registration.

![](https://docs.google.com/drawings/d/e/2PACX-1vRWmNY79RBwL1llZxb7zk_bY7cYmJDsClQnMakgNNit7A2JDNXdedgDTCJ-aTqcWka_ltW95o4SEpoM/pub?w=1264&h=554)



### Register Samples with Excel

TODO

### Register Samples with RESTful API and CLI

`Isabl` comes with a comprehensive RESTful API reference, where you can learn how to use every available endpoint for each resource of the database. You can access it by browsing to  `http://<your-isabl-host>/api/v1/`

![](.gitbook/assets/api.gif)

To register new objects in the database, you may want to see the **CREATE** endpoints, which try to retrieve existing objects using either the _pk_ field or _unique together constraints_, and if it doesn't find a match creates a new object . If the view supports nested objects, these will also be retrieved or created using the same criteria.

{% hint style="warning" %}
_IMPORTANT_: If an existing object is retrieved, its fields won't be updated with the posted data.
{% endhint %}

Check out the following examples, let's say you want to create a new _Individual._ According to the documentation the endpoint to create it and the minimum required fields are the following:

{% api-method method="post" host="/api/v1" path="/individuals" %}
{% api-method-summary %}
individuals\_create
{% endapi-method-summary %}

{% api-method-description %}
Get or create _Individuals_.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-body-parameters %}
{% api-method-parameter name="pk" type="integer" required=true %}
Primary Key
{% endapi-method-parameter %}

{% api-method-parameter name="identifier" type="integer" required=true %}
Instance identifier
{% endapi-method-parameter %}

{% api-method-parameter name="species" type="string" required=true %}
Registered species: i.e. \`HUMAN\`, \`MOUSE\`.
{% endapi-method-parameter %}

{% api-method-parameter name="gender" type="string" required=true %}
Valid values: \`MALE\`, \`FEMALE\`, \`UNKNOWN\`
{% endapi-method-parameter %}

{% api-method-parameter name="center" type="object" required=true %}
Center object
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
  "pk": 0,
  "birth_year": 1800,
  "center": {
    "pk": 0,
    "acronym": "string",
    "created_by": "admin",
    "custom_fields": {},
    "data": "string",
    "internal": true,
    "name": "string",
    "notes": "string",
    "storage_url": "string",
    "storage_usage": 0,
    "tags": [
      {
        "name": "string",
        "pk": 0
      }
    ]
  },
  "created_by": "admin",
  "custom_fields": {},
  "data": "string",
  "gender": "FEMALE",
  "identifier": "string",
  "notes": "string",
  "species": "HUMAN",
  "storage_url": "string",
  "storage_usage": 0,
  "submission": 0,
  "tags": [
    {
      "name": "string",
      "pk": 0
    }
  ]
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

Look that `center` is at the same time another object of the database. So if you want to pass it as a field you may need to create a new one or query an existing one. Let's say you want to get an existing one. 

{% api-method method="get" host="/api/v1" path="/centers/:id" %}
{% api-method-summary %}
center\_read
{% endapi-method-summary %}

{% api-method-description %}
Retrieve an existing _Center._
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="id" type="string" required=true %}
Primary key, acronym or name
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}

{% api-method-body-parameters %}
{% api-method-parameter name="name" type="string" required=true %}
Center name
{% endapi-method-parameter %}

{% api-method-parameter name="acronym" type="string" required=true %}
Abbreviation formed from the initial letters \(e.g. NASA\)
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
  "pk": 0,
  "acronym": "string",
  "created": "2019-06-17T19:47:46Z",
  "created_by": "admin",
  "custom_fields": {},
  "data": "string",
  "internal": true,
  "model_name": "string",
  "modified": "2019-06-17T19:47:46Z",
  "name": "string",
  "notes": "string",
  "slug": "string",
  "storage_url": "string",
  "storage_usage": 0,
  "tags": [
    {
      "name": "string",
      "pk": 0
    }
  ]
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

You may create this new object by making _http requests_ directly to the API:

{% code-tabs %}
{% code-tabs-item title="A request to the API" %}
```bash
curl \
    -H 'Authorization: Token <your-token>' \
    http://<your-isabl-host>/api/v1/centers/MSK

# Response
# { "pk": 1, "acronym":"MSK", "name": "MEMORIAL SLOAN KETTERING", ... } 

curl \
    -X POST \
    -H 'Authorization: Token <your-token>' \
    -H "Content-Type: application/json" \
    -d '{"identifier": "EXTERNAL_ID_1", "species": "HUMAN", "gender": "FEMALE", "center": { "pk": 1, "acronym": "MSK", "name": "MEMORIAL SLOAN KETTERING" } }' \
    http://<your-isabl-host>/api/v1/individuals
```
{% endcode-tabs-item %}
{% endcode-tabs %}

or using the _interactive isabl api_ that comes with the **isabl\_cli** package: 

{% code-tabs %}
{% code-tabs-item title="Using Isabl SDK" %}
```python
import isabl_cli as ii

center = ii.get_instance(
    'centers', 
    'MEMORIAL SLOAN KETTERING (MSK)',
)
individual = ii.create_instance(
    'individuals', 
    identifier = 'EXTERNAL_ID_1', 
    species = 'HUMAN',
    gender = 'FEMALE', 
    center = center, 
)
```
{% endcode-tabs-item %}
{% endcode-tabs %}

{% hint style="info" %}
**Authentication:** For any method you may need an _Authentication Token_ that will be used in every query to the API.
{% endhint %}

if using `isabl_cli` you can run: `isabl login` which will prompt you to enter your username and password. If successful, the auth token will be stored at: `~/.isabl/settings.json`

If using _http requests_, you can run:

```bash
curl  -X POST  \
    -d '{ "username": <your-username>, "password": <your-password> }'
    -H "Content-Type: application/json"  \
    http://<your-isabl-host>/api/v1/rest-auth/login/
```





\`\`

