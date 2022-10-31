# Wordpress Setup

## Plugins

### Yoast Seo

> Add all Seo Functions

#### Setup

- SEO analysis **ON**
- Readability analysis **ON**
- Cornerstone content **ON**
- Text link counter **ON**
- Insights **ON**
- Link suggestions **ON**
- XML sitemaps **OFF**
- Admin bar menu **ON**
- Security: no advanced or schema settings for authors **ON**
- Usage tracking **OFF**
- REST API: Head endpoint **ON**
- Enhanced Slack sharing **ON**

#### installation

> WP Plugins

### Polylang

> Add languages support

#### Setup

- URL modifications
  **The language is set from the directory name in pretty permalinks**
  **Remove /language/ in pretty permalinks**
- Detect browser language
  **Deactive**
- Media
  **Active**
- Synchronization
  **All Unchecked**

#### installation

> WP Plugins

### WP GraphQl

> Allow to get all data from Wordpress API

#### Setup

- No Setup Required

#### installation

> WP Plugins

### WP GraphQL Polylang

> Add Polylang data on GraphQl API

#### Setup

- No Setup Required

#### installation

> [link](https://github.com/valu-digital/wp-graphql-polylang)

### WPGraphQL Yoast SEO Addon

> Add Yoast Seo data on Grapghql API

#### Setup

- No Setup Required

#### Installation

> WP Plugins

### UpdraftPlus - Backup/Restore

> makes period Backups of articles

#### Setup

- No Setup Required

#### Installation

> WP Plugins

## Frontend remove

- Create a Wordpress custom theme structure
  **index.php**
  **style.css**
- index.php

  `<?php header( "Location: https://blog.minteeble.com" ); ?>`

- style.css

  `/* Theme Name: turn off frontend Theme URI: Description: Author: Version: License: GNU License URI: Tags: */`
