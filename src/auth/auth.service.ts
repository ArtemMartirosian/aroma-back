import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly config: ConfigService,
        private readonly jwt: JwtService,
    ) {}

    async login(dto: LoginDto) {
        const adminEmail =
            this.config.get<string>('ADMIN_EMAIL') ?? 'admin@aroma.local';
        const passwordHash = this.config.get<string>('ADMIN_PASSWORD_HASH');
        const fallbackPassword =
            this.config.get<string>('ADMIN_PASSWORD') ?? 'admin12345';
        const passwordMatches = passwordHash
            ? await bcrypt.compare(dto.password, passwordHash)
            : dto.password === fallbackPassword;

        if (dto.email !== adminEmail || !passwordMatches) {
            throw new UnauthorizedException('Invalid admin credentials');
        }

        const user = { id: 'admin', email: adminEmail, role: 'admin' as const };
        const accessToken: string = await this.jwt.signAsync({
            sub: user.id,
            email: user.email,
            role: user.role,
        });

        return { accessToken, user };
    }

    me(user: unknown) {
        return user;
    }
}
