import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  // ------------------------------------------------------------------------------------
  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<object> {
    const result = await this.authService.signUp(authCredentialsDto);
    if (result.username) {
      return {
        statusCode: 201,
        message: `User ${result.username} created successfully`,
        success: true,
      };
    } else {
      return result;
    }
  }

  // ------------------------------------------------------------------------------------
  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }
}
