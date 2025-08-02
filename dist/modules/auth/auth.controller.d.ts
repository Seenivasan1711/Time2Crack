import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, UpdateProfileDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    getProfile(req: any): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        role: import("../users/entities/user.entity").UserRole;
    }>;
    updateProfile(req: any, updateProfileDto: UpdateProfileDto): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        role: import("../users/entities/user.entity").UserRole;
        token: string;
    }>;
}
