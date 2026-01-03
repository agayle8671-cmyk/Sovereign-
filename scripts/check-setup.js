const requiredEnvVars = [
    'DATABASE_URL',
    'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
    'CLERK_SECRET_KEY',
    'OPENAI_API_KEY', // Check for OpenAI, though we use Google/Vertex primarily in current code. Staying true to user request.
];

console.log('\n🔍 Checking Sovereign setup...\n');

let allGood = true;

// Check environment variables
console.log('Environment Variables:');
requiredEnvVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
        console.log(`  ✅ ${varName} is set`);
    } else {
        // Soft warning for OpenAI if Google is used, but enforcing user request
        console.log(`  ❌ ${varName} is NOT set`);
        allGood = false;
    }
});

if (!allGood) {
    console.log('\n⚠️  Some environment variables are missing!');
    console.log('   Copy .env.example to .env.local and fill in the values.\n');
    process.exit(1);
}

console.log('\n✨ All checks passed! Run `npm run dev` to start.\n');
