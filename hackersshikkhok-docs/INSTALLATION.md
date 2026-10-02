# Installation Guide for Hackers শিক্ষক (HackersShikkhok.com)

## Requirements
- PHP 8.2 or higher
- WordPress 6.4 or higher
- MySQL 8.0+ or MariaDB 10.5+

## Installation Steps
1. **Core Plugin Installation:**
   - Upload `hackersshikkhok-core.zip` via **WordPress Admin > Plugins > Add New > Upload Plugin**.
   - Click **Activate Plugin**.
   - The plugin will automatically run `dbDelta()` to provision all 10 custom database tables and register custom post types & taxonomies.

2. **Theme Installation:**
   - Upload `hackersshikkhok-theme.zip` via **WordPress Admin > Appearance > Themes > Add New > Upload Theme**.
   - Click **Activate**.

3. **Verification:**
   - Navigate to **WordPress Admin > Hackers শিক্ষক Control Center**.
   - Verify System Health, API endpoints, and Database diagnostics.
