# Settings

    FRONTEND_URL
    JIRA_SETTINGS
    DRIVE_SETTINGS

## JIRA Integration

`isabl` projects can be linked to [JIRA]. From all [issue types], tickets are created as [epics] for 2 reasons: **1.** sequencing projects usually take couple of months to complete hence can be divided into multiple [sprints]; **2.** Epics enable the use of JIRA [boards]. In order to start using [JIRA] with isabl, add the following configuration to your django settings:

```python
BEE_SETTINGS["JIRA_SETTINGS"] = {
    "<group_primary_key>": { ... },          # custom per group JIRA server configuration, see `default`
    "active": False,                         # toggle to activate/deactivate the integration
    "default": {                             # default jira server config (required)
        "API2_URL": "https://my.jira.org",   # JIRA URL (required)
        "AUTH": (None, None),                # user username and password (required; don't include this in git!)
        "PROJECT_ID": "10200",               # JIRA project ID (required)
        "URL_FIELD": "customfield_1",        # URL field id to update JIRA with isabl's project URL
        "PROJECT_FIELD": "customfield_2",    # Integer field id to update JIRA with isabl's project primary key
        "GROUP_FIELD": "customfield_3",      # String field id to update JIRA with isabl's project group name
        },
}
```

?> **Tip:** JIRA servers can be configured as a function of the project [group](#groups), simply add an extra key using group primary key with custom JIRA settings for it.

?> **Tip:** Learn how to get a [project id], add [custom fields], and get a [custom field id].

!> If [custom fields] are set and can't be located in the Epic create form of your JIRA project, an error will be mailed to django admins notifying them about the problem. To fix it, visit the Epic create form in JIRA and click `Configure Fields` on the top right corner followed by `Where is my field?`. This will let you search for your custom field and take you to the configuration page. Click on `Edit Configuration` and make sure Epic is selected in *applicable issue types* and your project added in *applicable context*.

## Drive Integration

Path to valid client json file.
Please do this tutorial if you don't have one.
https://developers.google.com/drive/v3/web/quickstart/python.

<!-- JIRA -->
[jira]: https://www.atlassian.com/software/jira
[issue types]: https://confluence.atlassian.com/adminjiracloud/issue-types-844500742.html
[epics]: https://www.atlassian.com/agile/project-management/epics
[sprints]: https://confluence.atlassian.com/jirasoftwarecloud/planning-sprints-764478112.html
[boards]: https://confluence.atlassian.com/jirasoftwarecloud/what-is-a-board-764477964.html
[project id]: https://confluence.atlassian.com/jirakb/how-to-get-project-id-from-the-jira-user-interface-827341414.html
[custom fields]: https://confluence.atlassian.com/adminjiraserver/adding-a-custom-field-938847222.html
[custom field id]: https://confluence.atlassian.com/jirakb/how-to-find-id-for-custom-field-s-744522503.html
