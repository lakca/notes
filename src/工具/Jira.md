---
date: 2021-12-24T18:35:16+08:00
title: 工具-Jira
---

# API

[API Docs](https://docs.atlassian.com/software/jira/docs/api/REST/8.7.0/)
[Advanced Searching](http://confluence.atlassian.com/display/JIRA/Advanced+Searching)

| API                                 | URL                                                            | Example                                                                                                                                                       |
| ----------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Search Issues                       | GET/POST `/rest/api/2/search`                                  | `?maxResults=1&jql=${encodeURIComponent('assignee=currentuser() AND status=closed')}&fields=id,key,summary,issuetype,status`                                  |
| List status                         | `/rest/api/2/status`                                           |                                                                                                                                                               |
| List status category                | `/rest/api/2/statuscategory`                                   |                                                                                                                                                               |
| List visible issue type             | `/rest/api/2/issuetype`                                        |                                                                                                                                                               |
| List issue type (admin)             | `/rest/api/2/issuetypescheme`                                  |                                                                                                                                                               |
| List field                          | `/rest/api/2/field`                                            |                                                                                                                                                               |
| List project                        | `/rest/api/2/project`                                          |                                                                                                                                                               |
| Get project                         | `/rest/api/2/project/{projectIdOrKey}`                         |                                                                                                                                                               |
| Get project components              | `/rest/api/2/project/{projectIdOrKey}/components`              |                                                                                                                                                               |
| List project status                 | `/rest/api/2/project/{projectIdOrKey}/statuses`                |                                                                                                                                                               |
| List workflow                       | `/rest/api/2/workflow`                                         | `?workflowName=`                                                                                                                                              |
| List priority                       | `/rest/api/2/priority`                                         |                                                                                                                                                               |
| Get current logged user             | `/rest/api/2/myself`                                           |                                                                                                                                                               |
| Change password current logged user | PUT `/rest/api/2/myself/password`                              | `{ currentPassword: '', password: '' }`                                                                                                                       |
| Change profile current logged user  | PUT `/rest/api/2/myself`                                       | `{ password: '', emailAddress: '', displayName: '' }`                                                                                                         |
| Get issue                           | `/rest/api/2/issue/{issueIdOrKey}`                             |                                                                                                                                                               |
| Get issue subtask                   | `/rest/api/2/issue/{issueIdOrKey}/subtask`                     |                                                                                                                                                               |
| Delete issue                        | DELETE `/rest/api/2/issue/{issueIdOrKey}`                      | `?deleteSubtasks=false`                                                                                                                                       |
| Assign issue                        | PUT `/rest/api/2/issue/{issueIdOrKey}/assignee`                | `{ name: '' }`                                                                                                                                                |
| List issue comment                  | `/rest/api/2/issue/{issueIdOrKey}/comment`                     |                                                                                                                                                               |
| Post issue comment                  | POST`/rest/api/2/issue/{issueIdOrKey}/comment`                 | `{ body: '', visibility: { type: 'role', value: 'administrators' } }`                                                                                         |
| Update, Delete, Get issue comment   | PUT,DELETE,GET `/rest/api/2/issue/{issueIdOrKey}/comment/{id}` | `{ body: '', visibility: { type: 'role', value: 'administrators' } }`                                                                                         |
| List issue watcher                  | `/rest/api/2/issue/{issueIdOrKey}/watchers`                    | `"fred"`                                                                                                                                                      |
| Add a issue watcher                 | POST `/rest/api/2/issue/{issueIdOrKey}/watchers`               | `"fred"`                                                                                                                                                      |
| Remove a issue watcher              | DELETE `/rest/api/2/issue/{issueIdOrKey}/watchers`             | `?username=fred`                                                                                                                                              |
| Add, Remove vote to issue           | POST, DELETE `/rest/api/2/issue/{issueIdOrKey}/votes`          |                                                                                                                                                               |
| List issue vote                     | `/rest/api/2/issue/{issueIdOrKey}/votes`                       |                                                                                                                                                               |
| List transition                     | `/rest/api/2/issue/{issueIdOrKey}/transitions`                 |                                                                                                                                                               |
| Do transition                       | POST `/rest/api/2/issue/{issueIdOrKey}/transitions`            | `{ transition: { id: '' } }`                                                                                                                                  |
| Notify on issue                     | POST `/rest/api/2/issue/{issueIdOrKey}/notify`                 | `{ subject: '', textBody: '', htmlBody: '', to: { reporter: true, assignee: true, watchers: true, voters: true, users: [{ name: 'fred', active: false }] } }` |

# JQL

Frequent Fields:
- `assignee`
- `category`
- `creator`
- `reporter`
- `priority`
- `status`

# Pagination

- `maxResults`
- `startAt`
- `orderBy`
- `expand`
