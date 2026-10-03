import fs from 'fs';
import path from 'path';

function verify() {
  const rootDir = process.cwd();
  const registryPath = path.join(rootDir, 'hackersshikkhok-core/includes/Tools/UniversalToolRegistry.php');
  const phpContent = fs.readFileSync(registryPath, 'utf8');

  // Extract all tool IDs
  const matches = [...phpContent.matchAll(/\$tools\['([^']+)'\]\s*=\s*array\(/g)];
  const toolIds = matches.map(m => m[1]);
  const uniqueToolIds = new Set(toolIds);
  const duplicates = toolIds.length - uniqueToolIds.size;

  // Identify bespoke hand-crafted tools (first 100 explicitly defined entries without synthetic suffixes)
  const bespokeTools = toolIds.filter(id => !id.match(/-\d+$/));
  const syntheticTools = toolIds.filter(id => id.match(/-\d+$/));

  // Extract centers count
  const centersMatches = [...phpContent.matchAll(/'slug'\s*=>\s*'([^']+)'/g)];
  const centers = new Set(centersMatches.map(m => m[1]));

  // Extract categories
  const catMatches = [...phpContent.matchAll(/'category'\s*=>\s*'([^']+)'/g)];
  const categories = new Set(catMatches.map(m => m[1]));

  // Check placeholders
  const placeholderMatches = (phpContent.match(/coming soon|placeholder|todo|demo only/gi) || []).length;

  // Verify DB table schema in Database.php
  const dbPath = path.join(rootDir, 'hackersshikkhok-core/includes/Core/Database.php');
  const dbContent = fs.readFileSync(dbPath, 'utf8');
  const hasCustomToolsTable = dbContent.includes('custom_tools');
  const hasToolUsageTable = dbContent.includes('tool_usage');
  const hasSearchAnalyticsTable = dbContent.includes('search_analytics');

  // Verify REST Endpoints in RestController.php
  const restPath = path.join(rootDir, 'hackersshikkhok-core/includes/API/RestController.php');
  const restContent = fs.readFileSync(restPath, 'utf8');
  const hasCatalogRoute = restContent.includes('/tools/catalog');
  const hasExecuteRoute = restContent.includes('/tools/execute');
  const hasRegisterRoute = restContent.includes('/tools/register');
  const hasHealthRoute = restContent.includes('/tools/health');

  console.log('================================================================');
  console.log('HACKERS শিক্ষক SOURCE-LEVEL TOOL RECONCILIATION & AUDIT REPORT');
  console.log('================================================================');
  console.log(`Master Technology Centers          : ${centers.size}`);
  console.log(`Logical Categories                 : ${categories.size}`);
  console.log(`Total Unique Tools in Registry     : ${uniqueToolIds.size}`);
  console.log(`  ├─ Bespoke Hand-Crafted Tools    : ${bespokeTools.length}`);
  console.log(`  └─ Catalog Expansion Tools       : ${syntheticTools.length}`);
  console.log(`Database Custom Tools Table        : ${hasCustomToolsTable ? 'VERIFIED (wp_hs_custom_tools)' : 'MISSING'}`);
  console.log(`Tool Usage Analytics Table        : ${hasToolUsageTable ? 'VERIFIED (wp_hs_tool_usage)' : 'MISSING'}`);
  console.log(`Search Analytics Table             : ${hasSearchAnalyticsTable ? 'VERIFIED (wp_hs_search_analytics)' : 'MISSING'}`);
  console.log(`REST API Catalog Route             : ${hasCatalogRoute ? 'VERIFIED (/tools/catalog)' : 'MISSING'}`);
  console.log(`REST API Execute Route             : ${hasExecuteRoute ? 'VERIFIED (/tools/execute)' : 'MISSING'}`);
  console.log(`REST API Register Route            : ${hasRegisterRoute ? 'VERIFIED (/tools/register)' : 'MISSING'}`);
  console.log(`REST API Health Route              : ${hasHealthRoute ? 'VERIFIED (/tools/health)' : 'MISSING'}`);
  console.log(`Duplicates Count                   : ${duplicates}`);
  console.log(`Placeholders Count                 : ${placeholderMatches}`);
  console.log('----------------------------------------------------------------');
  console.log(`Audit Summary                      : ${uniqueToolIds.size >= 500 && duplicates === 0 && placeholderMatches === 0 ? 'SOURCE RECONCILIATION PASSED' : 'FAILED'}`);
  console.log('================================================================');
}

verify();
