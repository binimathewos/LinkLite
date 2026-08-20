---
description: Read this file to understand how to fetch data in this project.
---

# Data Fetching Guidelines

This document outlines the best practices and guidelines for fetching data in our Next.js application. Adhering to these guidelines will ensure consistency, performance, and maintainability across the codebase.

## 1. Use Server Components for Data Fetching

In Next.js, ALWAYS use Server Components for data fetching. NEVER use Client Components for fetching data directly.

## 2. Data Fetching Methods

ALWAYS use the helper functions in the /data directory for fetching data. NEVER fetch data directly within your components.

ALL helper functions in the /data directory should use Drizzel ORM for database interactions.
