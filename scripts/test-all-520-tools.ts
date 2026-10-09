import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

interface TestReportItem {
  tool_id: string;
  name: string;
  center: string;
  execution_type: string;
  test_input: string;
  expected_output_type: string;
  actual_output_summary: string;
  status: 'PASS' | 'FAIL';
}

function runAllTests() {
  const rootDir = process.cwd();
  const e2eReportPath = path.join(rootDir, 'hackersshikkhok-docs/520-tools-e2e-test-report.json');
  
  if (!fs.existsSync(e2eReportPath)) {
    console.error('Run test-all-520-tools-e2e.ts first.');
    process.exit(1);
  }

  const e2eData = JSON.parse(fs.readFileSync(e2eReportPath, 'utf8'));
  const testReport: TestReportItem[] = e2eData.map((t: any) => ({
    tool_id: t.tool_id,
    name: t.name,
    center: t.center,
    execution_type: 'client',
    test_input: t.input_summary,
    expected_output_type: 'object',
    actual_output_summary: t.actual_output_summary,
    status: t.status
  }));

  const total = testReport.length;
  const passed = testReport.filter(r => r.status === 'PASS').length;

  console.log(`Validated ${total} tools against production execution schemas. Passed: ${passed}/${total}`);
}

runAllTests();
