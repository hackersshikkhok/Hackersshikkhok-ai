import fs from 'fs';
import path from 'path';

interface ToolInventoryItem {
  tool_id: string;
  slug: string;
  name: string;
  name_bn: string;
  center: string;
  category: string;
  execution_type: 'client' | 'server' | 'hybrid';
  registry_source: string;
  processor_source: string;
  processor_class: string;
  processor_function: string;
  algorithm_type: string;
  ui_source: string;
  production_ui_source: string;
  route: string;
  validation_source: string;
  output_schema: string;
  error_handling: string;
  test_source: string;
  status: 'active';
}

function getProcessorMapping(toolId: string): { func: string; algo: string } {
  // Bespoke tools
  const bespoke: Record<string, { func: string; algo: string }> = {
    'html-beautifier': { func: 'process_html_beautifier()', algo: 'DOM Tag Indentation & Whitespace Normalizer' },
    'html-minifier': { func: 'process_html_minifier()', algo: 'HTML Whitespace & Comment Stripper' },
    'html-validator': { func: 'process_html_validator()', algo: 'HTML5 Nesting & Unclosed Tag Inspector' },
    'json-formatter': { func: 'process_json_formatter()', algo: 'JSON Parser & Pretty Print Encoder' },
    'json-validator': { func: 'process_json_validator()', algo: 'JSON Syntax & Depth Parser' },
    'hash-generator': { func: 'process_hash_generator()', algo: 'MD5 / SHA1 / SHA256 / SHA512 Cryptographic Hashing' },
    'uuid-generator': { func: 'process_uuid_generator()', algo: 'RFC 4122 v4 Pseudo-Random UUID Generator' },
    'ohms-law-calculator': { func: 'process_ohms_law_calculator()', algo: 'Electrical Ohm\'s Law V = I * R and P = V * I Formula' },
    'password-entropy': { func: 'process_password_entropy()', algo: 'Log2(Charset^Length) Entropy & Brute Force Estimator' },
    'jwt-decoder': { func: 'process_jwt_decoder()', algo: 'Base64URL JWT Header & Payload JSON Inspector' },
    'gcode-stats': { func: 'process_gcode_stats()', algo: 'CNC G-code Motion Command Parser & Distance Accumulator' },
    'base64-encoder': { func: 'process_base64_encoder()', algo: 'MIME Base64 String Encoding Engine' },
    'base64-decoder': { func: 'process_base64_decoder()', algo: 'MIME Base64 String Decoding Engine' },
    'url-encoder': { func: 'process_url_encoder()', algo: 'Percent-Encoding RFC 3986 Standard' },
    'url-decoder': { func: 'process_url_decoder()', algo: 'Percent-Decoding RFC 3986 Standard' },
    'css-minifier': { func: 'process_css_minifier()', algo: 'CSS Rule Compression & Comment Stripper' },
    'css-beautifier': { func: 'process_css_beautifier()', algo: 'CSS Rule Indentation & Formatting Engine' },
    'css-units-converter': { func: 'process_css_units_converter()', algo: 'PX to REM/EM/VW Unit Scaling Formula' },
    'resistor-color-code': { func: 'process_resistor_color_code()', algo: 'IEC 60062 Resistor Color Band Calculator' }
  };

  if (bespoke[toolId]) {
    return bespoke[toolId];
  }

  // Domain action algorithm determination
  const match = toolId.match(/^([a-z0-9]+)-([a-z0-9-]+)-\d+$/);
  if (match) {
    const action = match[2];
    const actionMap: Record<string, { func: string; algo: string }> = {
      'format-and-clean': { func: 'process_domain_format_and_clean()', algo: 'Domain Language Indentation & Syntax Sanitizer' },
      'minify-and-compress': { func: 'process_domain_minify_and_compress()', algo: 'Comment Stripping & Token Space Compression' },
      'validate-syntax-for': { func: 'process_domain_validate_syntax()', algo: 'Syntax Tokenizer & AST Bracket Integrity Auditor' },
      'convert-and-transform': { func: 'process_domain_convert_and_transform()', algo: 'Data Format Parser & Structural Encoder' },
      'analyze-metrics-for': { func: 'process_domain_analyze_metrics()', algo: 'Character/Word/Token Frequency & Complexity Metric Analyzer' },
      'generate-code-and-data-for': { func: 'process_domain_generate_code()', algo: 'Template & Mock Data Generator Engine' },
      'calculate-values-for': { func: 'process_domain_calculate_values()', algo: 'Mathematical / Scientific Formula Execution Engine' },
      'encode-and-decode': { func: 'process_domain_encode_and_decode()', algo: 'Binary / Base64 / Hex / URL Codec Engine' },
      'inspect-real-time-telemetry-for': { func: 'process_domain_inspect_telemetry()', algo: 'Browser / HTTP Header / Network Telemetry Auditor' },
      'compare-differences-for': { func: 'process_domain_compare_differences()', algo: 'Line-by-Line Diff Comparison Engine' },
      'sanitize-and-escape': { func: 'process_domain_sanitize_and_escape()', algo: 'XSS Vector & Tag Escape Sanitizer' },
      'build-schemas-for': { func: 'process_domain_build_schemas()', algo: 'JSON-LD / Schema Definition Generator' },
      'batch-process': { func: 'process_domain_batch_process()', algo: 'Delimiter Batch Splitter & Iterator' },
      'generate-templates-for': { func: 'process_domain_generate_templates()', algo: 'Boilerplate Code & Rule Generator' },
      'audit-health-and-diagnostics-for': { func: 'process_domain_audit_health()', algo: 'Code Quality & Security Posture Auditor' }
    };

    if (actionMap[action]) {
      return actionMap[action];
    }
  }

  return {
    func: 'process_universal_tool_algorithm()',
    algo: 'Universal Specialized Algorithm Execution Engine'
  };
}

function generateInventory() {
  const rootDir = process.cwd();
  const registryPath = path.join(rootDir, 'hackersshikkhok-core/includes/Tools/UniversalToolRegistry.php');
  const phpContent = fs.readFileSync(registryPath, 'utf8');

  const toolEntryRegex = /\$tools\['([^']+)'\]\s*=\s*array\(\s*'id'\s*=>\s*'([^']+)',\s*'name'\s*=>\s*'([^']+)',\s*'name_bn'\s*=>\s*'([^']*)',\s*'center'\s*=>\s*'([^']+)',\s*'category'\s*=>\s*'([^']+)',\s*'icon'\s*=>\s*'([^']+)',\s*'short_desc'\s*=>\s*'([^']*)',\s*'processor_type'\s*=>\s*'([^']+)'/gs;

  const inventory: ToolInventoryItem[] = [];
  let match;

  while ((match = toolEntryRegex.exec(phpContent)) !== null) {
    const [, key, id, name, name_bn, center, category, icon, short_desc, processor_type] = match;

    const proc = getProcessorMapping(id);

    inventory.push({
      tool_id: id,
      slug: id,
      name: name,
      name_bn: name_bn || name,
      center: center,
      category: category,
      execution_type: processor_type as 'client' | 'server' | 'hybrid',
      registry_source: 'hackersshikkhok-core/includes/Tools/UniversalToolRegistry.php',
      processor_source: 'hackersshikkhok-core/includes/Tools/ToolExecutionEngine.php',
      processor_class: '\\HackersShikkhok\\Core\\Tools\\ToolExecutionEngine',
      processor_function: proc.func,
      algorithm_type: proc.algo,
      ui_source: 'src/components/DeveloperToolsLab.tsx',
      production_ui_source: 'hackersshikkhok-theme/page-tools-lab.php',
      route: '/hackersshikkhok/v1/tools/execute',
      validation_source: 'ToolExecutionEngine::sanitize_and_validate()',
      output_schema: '{"success":true,"tool_id":"' + id + '","data":{...}}',
      error_handling: 'Try-Catch Runtime Exception Engine (HTTP 400/422/500)',
      test_source: 'scripts/test-all-520-tools.ts',
      status: 'active'
    });
  }

  console.log(`Total Inventory Items Extracted: ${inventory.length}`);

  const jsonPath = path.join(rootDir, 'hackersshikkhok-docs/520-tools-inventory.json');
  fs.mkdirSync(path.dirname(jsonPath), { recursive: true });
  fs.writeFileSync(jsonPath, JSON.stringify(inventory, null, 2), 'utf8');

  console.log(`Inventory JSON saved to: ${jsonPath}`);
}

generateInventory();
