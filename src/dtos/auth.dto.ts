import { IsString, IsNotEmpty, IsEmail, MinLength, IsUUID, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsUUID()
  @IsOptional()
  profile_id?: string;
}

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export interface FunctionDto {
  name: string;
  path: string;
  icon: string;
}

export interface UserResponseDto {
  id: string;
  name: string;
  email: string;
  profile: string;
  funciones: FunctionDto[];
}

export interface AuthResponseDto {
  token: string;
  user: UserResponseDto;
}
