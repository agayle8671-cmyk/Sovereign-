const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('new-dash.txt', 'utf8');

function extractCode(filePath) {
    // Find the marker for this file
    const marker = '### `' + filePath + '`';
    const markerIdx = content.indexOf(marker);
    if (markerIdx === -1) {
        console.log('Not found:', filePath);
        return null;
    }

    // Find the code block start
    const codeStart = content.indexOf('```typescript', markerIdx);
    if (codeStart === -1) {
        console.log('No code block for:', filePath);
        return null;
    }

    // Skip past the ```typescript\n
    const actualStart = content.indexOf('\n', codeStart) + 1;

    // Find the end of the code block
    const codeEnd = content.indexOf('```', actualStart);
    if (codeEnd === -1) {
        console.log('No end marker for:', filePath);
        return null;
    }

    return content.substring(actualStart, codeEnd).trim();
}

const files = [
    { path: 'src/lib/dashboard-design.ts', marker: 'src/lib/dashboard-design.ts' },
    { path: 'src/app/(dashboard)/layout.tsx', marker: 'src/app/dashboard/layout.tsx' },
    { path: 'src/components/dashboard/shell.tsx', marker: 'src/components/dashboard/shell.tsx' },
    { path: 'src/components/dashboard/os-sidebar.tsx', marker: 'src/components/dashboard/os-sidebar.tsx' },
    { path: 'src/components/dashboard/os-header.tsx', marker: 'src/components/dashboard/os-header.tsx' },
    { path: 'src/components/dashboard/command-palette.tsx', marker: 'src/components/dashboard/command-palette.tsx' },
    { path: 'src/components/dashboard/agent-nudge.tsx', marker: 'src/components/dashboard/agent-nudge.tsx' },
    { path: 'src/app/(dashboard)/dashboard/page.tsx', marker: 'src/app/dashboard/page.tsx' },
    { path: 'src/components/dashboard/dashboard-home.tsx', marker: 'src/components/dashboard/dashboard-home.tsx' },
    { path: 'src/components/dashboard/dashboard-skeleton.tsx', marker: 'src/components/dashboard/dashboard-skeleton.tsx' },
];

for (const file of files) {
    const code = extractCode(file.marker);
    if (code) {
        // Ensure directory exists
        const dir = path.dirname(file.path);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(file.path, code);
        console.log('Wrote:', file.path, '(', code.length, 'chars)');
    }
}

console.log('Done!');
