import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { RegisterDto, LoginDto, UpdateProfileDto } from './dto/auth.dto';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        role: import("../users/entities/user.entity").UserRole;
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        role: import("../users/entities/user.entity").UserRole;
        token: string;
    }>;
    getProfile(userId: number): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        role: import("../users/entities/user.entity").UserRole;
    }>;
    updateProfile(userId: number, updateProfileDto: UpdateProfileDto): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        role: import("../users/entities/user.entity").UserRole;
        token: string;
    }>;
    private generateToken;
}
