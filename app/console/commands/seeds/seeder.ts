const fileName = process.argv[2];

if (!fileName) {
  console.error("❌ Please provide a seeder name");
  process.exit(1);
}

const run = async () => {
  try {
    const file = await import(`../../../database/seeders/${fileName}`);
    await file.default();
  } catch (error) {
    console.error(
      `❌ ${error instanceof Error ? error.message : "Unknown error"}`
    );

    process.exit(1);
  }
};

run();
