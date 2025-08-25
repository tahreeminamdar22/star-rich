const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.config.createMany({
    data: [
      { key: "JOIN_AMOUNT_PAISE", value: 30000 },
      { key: "COMPANY_FUND_PER_ANCESTOR", value: 10000 },
      { key: "UPGRADE_PER_ANCESTOR", value: 10000 },
      { key: "NET_PER_ANCESTOR", value: 10000 },
      { key: "REWARDS_SHARE_OF_COMPANY_FUND", value: 0.25 },
      { key: "REWARDS_MIN_LEVEL", value: 5 },
      { key: "MIN_WITHDRAWAL_PAISE", value: 10000 },
      { key: "WITHDRAWAL_FEES_PCT", value: 2 },
      { key: "TDS_PCT", value: 5 },
      { key: "Sponsor.id", value: 1 },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(() => {
    console.log('✅ Config table seeded');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
