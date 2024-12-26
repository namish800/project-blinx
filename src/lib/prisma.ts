// lib/prisma.ts

import { PrismaClient } from '@prisma/client';


/**
 * We attach prisma to the global object in development to avoid
 * instantiating multiple instances of Prisma Client.
 */
declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// In production, we don't want to pollute the global namespace
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma;
}


export default prisma;
