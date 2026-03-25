import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import type { TokenPayloadDto } from './dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PassportService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateTokens(payload: TokenPayloadDto) {
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get<string>(
        'JWT_ACCESS_EXPIRES',
      ) as JwtSignOptions['expiresIn'],
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.getOrThrow<string>(
        'JWT_REFRESH_EXPIRES',
      ) as JwtSignOptions['expiresIn'],
      secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyToken(
    token: string,
    tokenType: 'access' | 'refresh',
  ): Promise<TokenPayloadDto> {
    return await this.jwtService.verifyAsync(token, {
      secret: this.configService.getOrThrow<string>(
        `JWT_${tokenType.toUpperCase()}_SECRET`,
      ),
    });
  }
}
