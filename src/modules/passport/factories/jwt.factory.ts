import { JwtModuleOptions } from '@nestjs/jwt';

export function getJwtFactory(): JwtModuleOptions {
  return {
    // secret: configService.get<string>('JWT_SECRET'),
  };
}
