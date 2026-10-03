import fs from 'fs';
import path from 'path';

interface ToolInventoryItem {
  tool_id: string;
  slug: string;
  name: string;
  center: string;
  category: string;
  execution_type: 'client' | 'server' | 'hybrid';
  registry_source: string;
  processor_source: string;
  processor_class: string;
  processor_function: string;
  ui_source: string;
  route: string;
  validation_source: string;
  test_source: string;
  database_source: string;
  status: 'active';
}

function generateInventory() {
  const rootDir = process.cwd();
  const registryPath = path.join(rootDir, 'hackersshikkhok-core/includes/Tools/UniversalToolRegistry.php');
  const phpContent = fs.readFileSync(registryPath, 'utf8');

  // Regex match tool array blocks across multiple lines
  const toolEntryRegex = /\$tools\['([^']+)'\]\s*=\s*array\(\s*'id'\s*=>\s*'([^']+)',\s*'name'\s*=>\s*'([^']+)',\s*'name_bn'\s*=>\s*'([^']*)',\s*'center'\s*=>\s*'([^']+)',\s*'category'\s*=>\s*'([^']+)',\s*'icon'\s*=>\s*'([^']+)',\s*'short_desc'\s*=>\s*'([^']*)',\s*'processor_type'\s*=>\s*'([^']+)'/gs;

  const inventory: ToolInventoryItem[] = [];
  let match;

  while ((match = toolEntryRegex.exec(phpContent)) !== null) {
    const [, key, id, name, name_bn, center, category, icon, short_desc, processor_type] = match;

    const isBespoke = !id.match(/-\d+$/);

    inventory.push({
      tool_id: id,
      slug: id,
      name: name,
      center: center,
      category: category,
      execution_type: processor_type as 'client' | 'server' | 'hybrid',
      registry_source: 'hackersshikkhok-core/includes/Tools/UniversalToolRegistry.php',
      processor_source: 'hackersshikkhok-core/includes/Tools/ToolExecutionEngine.php',
      processor_class: '\\HackersShikkhok\\Core\\Tools\\ToolExecutionEngine',
      processor_function: isBespoke ? `process_${id.replace(/-/g, '_')}()` : 'process_generic_tool()',
      ui_source: 'hackersshikkhok-theme/page-tools-lab.php & src/components/DeveloperToolsLab.tsx',
      route: '/hackersshikkhok/v1/tools/execute',
      validation_source: 'hackersshikkhok-core/includes/Tools/ToolExecutionEngine.php::sanitize_and_validate()',
      test_source: 'scripts/verify-tools-catalog.ts',
      database_source: 'wp_hs_custom_tools & wp_hs_tool_usage',
      status: 'active'
    });
  }

  console.log(`Total Inventory Items Extracted: ${inventory.length}`);

  // Write out JSON report
  const jsonPath = path.join(rootDir, 'hackersshikkhok-docs/520-tools-inventory.json');
  fs.mkdirSync(path.dirname(jsonPath), { recursive: true });
  fs.writeFileSync(jsonPath, JSON.stringify(inventory, null, 2), 'utf8');

  // Output summary and verification stats
  const uniqueIds = new Set(inventory.map(i => i.tool_id));
  const handCrafted = inventory.filter(i => !i.tool_id.match(/-\d+$/)).length;
  const expansion = inventory.filter(i => i.tool_id.match(/-\d+$/)).length;

  console.log(`Unique Tool IDs: ${uniqueIds.size}`);
  console.log(`Hand-crafted (Bespoke): ${handCrafted}`);
  console.log(`Catalog Expansion: ${expansion}`);
  console.log(`Inventory JSON saved to: ${jsonPath}`);
}

generateInventory();
