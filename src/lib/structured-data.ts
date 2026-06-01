export interface BlogPostingSchema {
  type: "BlogPosting";
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  image?: string;
  url: string;
  tags?: string[];
}

export interface OrganizationSchema {
  type: "Organization";
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs?: string[];
}

export interface ArticleSchema {
  type: "Article";
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  image?: string;
  url: string;
}

export interface JobPostingSchema {
  type: "JobPosting";
  title: string;
  description: string;
  datePosted: string;
  url: string;
  employmentType?: string;
  jobLocation?: string;
  hiringOrganization: {
    name: string;
    url: string;
    logo: string;
  };
}

export interface ServiceSchema {
  type: "Service";
  name: string;
  description: string;
  provider: {
    name: string;
    url: string;
  };
  serviceType: string;
  url: string;
}

export interface BreadcrumbListSchema {
  type: "BreadcrumbList";
  items: Array<{
    name: string;
    url: string;
  }>;
}

export type Schema =
  | BlogPostingSchema
  | OrganizationSchema
  | ArticleSchema
  | JobPostingSchema
  | ServiceSchema
  | BreadcrumbListSchema;
