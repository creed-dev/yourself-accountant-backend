import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtModule as NestJwtModule } from '@nestjs/jwt/dist/jwt.module';
import { jwtConstants } from '../../common/jwt/constants';

@Module({
  providers: [AuthService, LocalStrategy, LocalAuthGuard],
  imports: [
    UsersModule,
    NestJwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '86400s' },
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
