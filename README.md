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

### WP File Manager

> allow to edit wp files

#### Setup

- No Setup Required

#### Installation

> WP Plugins

### Headless Mode

> Add a redirect to React frontend and disable wp indexing

#### Setup

- From WP File Manager open

`wp-content>plugins>headless-mode>headless-mode.php`

then replace

```php
if( apply_filters( 'headless_mode_will_redirect', true, $new_url ) ){
    headless_mode_redirect( $new_url, true );
			exit();
  }
```

with

````php
if( apply_filters( 'headless_mode_will_redirect', true, $new_url ) ){

        	if(preg_match("/.*\/feed[\/]{0,1}$/i",  $new_url)) {

            	return;

    		} else {
            	headless_mode_redirect( $new_url, true );
				exit();
            }

		}
    ```

#### Installation

> WP Plugins
````
