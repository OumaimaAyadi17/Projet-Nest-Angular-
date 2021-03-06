import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, NotFoundException, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './models/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Request,Response } from 'express';
import { AuthGuard } from './auth.guard';



@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {

    constructor(
        private userservice:  UserService,
        private jwtService: JwtService){

    }

    @Post('register')
    async register(@Body() body: RegisterDto){
        if (body.password !== body.password_confirm){
            throw new BadRequestException('Password do not match');
        }
        const hashed = await bcrypt.hash(body.password,12);
        return this.userservice.create({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            password: hashed,
         } );
        
    }

    
    @Post('login')
    async login(
        @Body('email') email:string,
        @Body('password') password:string,
        @Res({ passthrough: true }) response: Response 

    ) {
        const user = await this.userservice.findOne({email});
        // check user exist (correct or not ) 
        if (!user){
            throw new NotFoundException('User not Found');
        }
        // Now if user exist we check password correct or not 
        if (!await bcrypt.compare(password,user.password)){
            throw new BadRequestException('Invalid Credentials');

        }
        // if email and password are correct 
        const jwt = await this.jwtService.signAsync({id: user.id});
        
        response.cookie('jwt',jwt,{httpOnly: true});
        return user;

    }


    @UseGuards(AuthGuard)
    @Get('user')
    async user(@Req() request: Request) {
        const cookie = request.cookies['jwt'];
        const data = await this.jwtService.verifyAsync(cookie);
        return this.userservice.findOne({id: data['id']});

    }

    @UseGuards(AuthGuard)
    @Post('logout')
    async logout (@Res({ passthrough: true }) response: Response ){
        response.clearCookie('jwt');
        return {
            message: 'Success'
        }
    }

}
