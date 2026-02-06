---
title: Enterprise Secrets Management with HCP Vault Dedicated
company: Ergon Informatik AG
logo: TODO
pubDate: 2026-02-27
results:
  - Accelerated platform evaluation by providing expert answers to critical questions
  - Reduced compliance effort by leveraging HashiCorp's ISO 27001 certification
  - Enabled informed decision-making through comprehensive risk analysis
  - Eliminated costly trial-and-error testing with ready-to-use operational guidance
quote:
  "TODO"
authorName: TODO
authorTitle: TODO
authorImage: TODO
---

## Customer

[Ergon Informatik AG](https://www.ergon.ch/en) is a leading Swiss IT company specializing in tailored software solutions and security products. Founded in 1984, Ergon combines expertise in technology, security, and business to serve clients across finance, healthcare, manufacturing, and public sectors. The company employs over 400 staff members across three locations in Switzerland and is known for its flagship product Airlock Secure Access Hub, a comprehensive security solution for access protection and API management.

## Background

Ergon was developing a product offering for their customers that would rely on enterprise secrets management capabilities. As a company serving highly regulated industries with strict security and compliance requirements, selecting the right secrets management foundation was critical.

However, making the wrong platform choice could waste months of integration work. The company needed practical answers to specific questions: How do backups work? What capabilities does each role provide? Would a 30-day retention limit meet their customers' disaster recovery expectations? Most critically, would building on an ISO 27001-certified platform reduce the compliance burden for their own application?

Rather than spending weeks conducting trial-and-error testing, Ergon engaged bespinian for expert consultation. The company needed someone who deeply understood both HashiCorp Vault's technical architecture and the practical implications for building compliant enterprise products.

## Project Goals

Ergon needed expert guidance to make an informed platform decision without costly trial-and-error:

- Understand whether HCP Vault Dedicated's backup and restore capabilities would meet their customers' disaster recovery expectations
- Determine the operational overhead and team resources required to manage the platform effectively
- Evaluate how HashiCorp's ISO 27001 certification could reduce the compliance burden for their own application
- Identify potential risks, constraints, and limitations that could impact their product offering or customer commitments
- Assess whether the platform's access control model would support their team structure and security requirements
- Gain practical, actionable knowledge to compare HCP Vault Dedicated against alternative solutions

## bespinian's Role

bespinian played a key role in the following areas:

### Backup and Disaster Recovery Evaluation

Ergon needed to know whether HCP Vault Dedicated's backup capabilities would support the disaster recovery commitments the company planned to offer customers. The fixed 30-day retention period was particularly concerning—could this constraint prevent them from meeting customer SLAs?

bespinian analyzed the platform's snapshot-based backup system and clearly documented what Ergon would gain (automated daily backups with built-in redundancy, no operational overhead) versus what they would trade off (fixed 30-day retention, no API automation, web-only operations). Critically, bespinian discovered that while the UI doesn't allow retention changes, HashiCorp Support can accommodate longer retention on a case-by-case basis for compliance needs.

This analysis gave Ergon the practical information needed to assess whether the platform would work for their use case—without spending weeks setting up test environments and conducting their own experiments. They could confidently evaluate whether this backup model aligned with their customer commitments or whether they needed to consider alternatives.

### Operational Readiness Assessment

Before committing to any platform, the company needed to understand the operational overhead—what skills would their team need? How complex would routine operations be? Would they require expensive ongoing consultancy?

bespinian developed practical operational runbooks that guide team members through critical procedures step-by-step, from creating manual snapshots before major changes to executing disaster recovery procedures. The runbooks were designed for operations teams without deep HashiCorp expertise, reducing dependency on specialized knowledge.

These ready-to-use guides gave Ergon confidence that their existing team could manage the platform effectively. Rather than discovering operational complexity after adoption, they understood exactly what day-to-day management would require—enabling accurate resource planning and cost projection for their product offering.

### Team Structure and Access Planning

Ergon needed practical answers to access control questions: What capabilities does each role provide? How should the company structure team access? Would the platform's permission model work for their organization?

bespinian provided clear, practical documentation answering questions like "what can a Contributor do?" and "which role do operations engineers need?" The analysis explained the platform's control plane/data plane separation—meaning different team members managing infrastructure versus using Vault need different access patterns. Importantly, bespinian identified where the platform's fixed roles differ from self-hosted Vault, helping Ergon understand what flexibility they would gain or lose.

This practical guidance enabled Ergon to plan their team structure and access policies before adoption, avoiding the costly reorganization that often follows platform selection. They understood exactly which team members needed which access levels and could factor this into their operational model.

### Compliance Leverage Strategy

A critical question for Ergon was whether building on an ISO 27001-certified platform would reduce the compliance burden for their own application. If part of their system was already certified, would they have less to prove to auditors and customers?

bespinian explained how to leverage HashiCorp's ISO 27001 certification as supporting evidence in their own compliance framework. When using certified third-party components, organizations can reference the vendor's security controls, SOC 2 reports, and certifications during audits—demonstrating due diligence in supplier selection. bespinian documented the specific security measures covered by HashiCorp's certification, including encryption, high availability, and backup redundancy.

This insight was valuable beyond the immediate platform decision. The company understood that choosing a certified component would reduce what they needed to evaluate and prove for their own application's compliance—potentially saving significant time and cost in certification efforts. This compliance leverage became an important factor in their platform evaluation.

### Risk Identification and Decision Support

Platform selection always involves trade-offs and risks. Ergon needed to understand what risks they would be accepting with a managed service model—before discovering them through costly post-adoption surprises.

bespinian conducted comprehensive risk analysis covering scenarios like accidental cluster deletion (recoverable only through HashiCorp Support), audit log gaps that could complicate security investigations, and personnel access patterns inherent to the managed model. For example, bespinian identified that the platform's dual audit trail system (HCP events and Vault logs) lacks direct correlation, potentially creating challenges during incident investigations or compliance audits.

Most importantly, bespinian presented these findings not as deal-breakers, but as factors to weigh in the decision. Each identified risk came with context: Was this acceptable given the operational overhead they were avoiding? Could the company implement compensating controls? Should they negotiate specific terms with HashiCorp? This analysis enabled Ergon to make a fully informed decision—whether to adopt HCP Vault Dedicated with eyes open to the trade-offs, or to evaluate alternatives with a clear understanding of what to look for.

Through this focused engagement, bespinian transformed weeks of potential trial-and-error testing into actionable insights delivered in a matter of hours. Ergon gained not just documentation, but the strategic understanding needed to make a confident platform decision—whether that meant adopting HCP Vault Dedicated, negotiating specific terms with HashiCorp, or evaluating alternatives with a clear framework of what matters. The practical knowledge and ready-to-use operational guidance provided a foundation for moving forward without costly experimentation or expensive ongoing consultancy dependencies.

## Technologies Used

- **Secrets Management**: HashiCorp Vault, HCP Vault Dedicated
- **Cloud Platform**: HashiCorp Cloud Platform (HCP)
- **Infrastructure**: AWS (Amazon S3 for backups, KMS for encryption)
- **Audit Log Streaming**: Amazon CloudWatch, Datadog, Grafana Cloud (optional integrations)