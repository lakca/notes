---
date: 2022-03-18T18:46:49+08:00
title: 技术-WebRTC
---

```mermaid
flowchart LR
	classDef edge stroke:#9df,stroke-width:3;
	classDef more stroke:#9df,stroke-dasharray:5 5;

subgraph sauth[Authentication Overview]
	direction TB
	authentication ---> account & ticket
end

subgraph sperm[Authorization Overview]
	direction TB
	authorization ---> role & group & account & ticket
	role ---> group & account
	group ---> account
end

subgraph sproj[Project Overview]
	direction TB
	project ---> roadmap
	roadmap ---> session
	session ---> task
	task -.-> subtask:::more
end

sauth ---> sperm ---> sproj
```
26b52c33fe3eed348d8e
