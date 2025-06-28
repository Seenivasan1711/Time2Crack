import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { RegisterDto, LoginDto, UpdateProfileDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { name, email, password } = registerDto;

    // Check if user exists
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Create user
    const user = this.userRepository.create({
      name,
      email,
      passwordHash: password,
    });

    const savedUser = await this.userRepository.save(user);

    return {
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
      role: savedUser.role,
      token: this.generateToken(savedUser.id),
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: this.generateToken(user.id),
    };
  }

  async getProfile(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Update fields
    if (updateProfileDto.name) {
      user.name = updateProfileDto.name;
    }
    if (updateProfileDto.email) {
      user.email = updateProfileDto.email;
    }
    if (updateProfileDto.password) {
      user.passwordHash = updateProfileDto.password;
    }

    const updatedUser = await this.userRepository.save(user);

    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      token: this.generateToken(updatedUser.id),
    };
  }

  private generateToken(userId: string): string {
    return this.jwtService.sign({ sub: userId });
  }
} 