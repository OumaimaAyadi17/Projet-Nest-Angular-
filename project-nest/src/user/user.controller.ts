import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { UserCreateDto } from './models/user-create.dto';
import { UserUpdateDto } from './models/UserUpdateDto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseInterceptors(ClassSerializerInterceptor) // To not return password
@UseGuards(AuthGuard) //we added it  because this will be accessed only by a authenticated users 
@Controller('users')
export class UserController {
    constructor(private userservice:  UserService) {

    }
   // Find all Users
    @Get()
   async all(): Promise<User[]> {
        return this.userservice.all();
    }

    // Find one User
    @Get(':id')
    async get(@Param ('id') id:number){
        return this.userservice.findOne({id});
    }

    // Create User
    @Post('/create')
    async create(@Body() body: UserCreateDto): Promise<User>{
        const password = await bcrypt.hash('1234', 12);
        
        return this.userservice.create({

            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            password

        });

    }


    // Update User
    @Put('/update/:id')
    async update(
        @Param('id') id: number,
        @Body() body: UserUpdateDto
    ){
        await this.userservice.update(id,body);
        return this.userservice.findOne({id});
      
    }

    // Delete User
    @Delete('/delete/:id')
    async delete(  @Param('id') id: number,){
       return this.userservice.delete(id);
      


    }
}
