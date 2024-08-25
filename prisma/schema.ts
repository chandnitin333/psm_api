import * as fs from 'fs';
import * as path from 'path';

const schemaFiles = ['user.prisma', 'post.prisma', 'admin_user.prisma','district.prisma','taluka.prisma','grampanchayat.prisma','gatgrampanchayat.prisma','floor.prisma','prakar.prisma','malmattecheprakar.prisma'];
const combinedSchemaPath = path.join(__dirname, 'schema.prisma');

let combinedSchema = `
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
`;

schemaFiles.forEach(file => {
  const schema = fs.readFileSync(path.join(__dirname, file), 'utf-8');
  combinedSchema += `\n${schema}`;
});

fs.writeFileSync(combinedSchemaPath, combinedSchema);
console.log('Combined schema written to schema.prisma');