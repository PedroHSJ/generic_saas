import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import {
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
} from "@nestjs/swagger";
import { Paginate, Paginated, PaginateQuery } from "nestjs-paginate";
import { IObjectResponse } from "src/shared/interfaces/objectResponse.interface";
import { UserDto } from "./dto/user.dto";
import { Public } from "src/shared/helpers/decorators/public.decorator";

@ApiHeader({
  name: "Accept-Language",
  description: "Language",
  example: "pt-br",
})
@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: "Create a new user" })
  @ApiResponse({
    status: 201,
    description: "User created successfully",
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiBody({ type: CreateUserDto })
  create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<IObjectResponse<UserDto>> {
    return this.userService.create(createUserDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({
    status: 200,
    description: "Return all users",
    type: () => UserDto,
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  async findAll(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<UserDto>> {
    return await this.userService.findAll(query);
  }

  @Public()
  @Get("/account-confirmation/:token")
  @ApiOperation({ summary: "Confirm account" })
  @ApiResponse({
    status: 200,
    description: "Account confirmed successfully",
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  async accountConfirmation(
    @Param("token") token: string,
  ): Promise<{ url: string; message: string }> {
    const { message } = await this.userService.activateUser(token);
    return { url: process.env.CLIENT_LOGIN_ROUTE, message };
  }

  @Public()
  @Post("/resend-account-confirmation-email/:email")
  @ApiOperation({ summary: "Resend account confirmation email" })
  @ApiResponse({
    status: 200,
    description: "Email sent successfully",
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  async resendAccountConfirmationEmail(
    @Param("email") email: string,
  ): Promise<void> {
    await this.userService.resendAccountConfirmationEmail(email);
  }

  // @Get(":id")
  // @ApiOperation({ summary: "Get a user by ID" })
  // @ApiParam({ name: "id", description: "ID of the user" })
  // @ApiResponse({
  //   status: 200,
  //   description: "Return the user",
  // })
  // @ApiResponse({ status: 404, description: "User not found" })
  // findOne(
  //   @Param("id") id: string,
  // ): Promise<IObjectResponse<UserEntity>> {
  //   return this.userService.findById(+id);
  // }

  // @Patch(":id")
  // @ApiOperation({ summary: "Update a user by ID" })
  // @ApiParam({ name: "id", description: "ID of the user" })
  // @ApiResponse({
  //   status: 200,
  //   description: "User updated successfully",
  // })
  // @ApiResponse({ status: 400, description: "Bad request" })
  // @ApiResponse({ status: 404, description: "User not found" })
  // @ApiBody({ type: UpdateUserDto })
  // update(
  //   @Param("id") id: string,
  //   @Body() updateUserDto: UpdateUserDto,
  // ): Promise<IObjectResponse<UserEntity>> {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(":id")
  // @ApiOperation({ summary: "Delete a user by ID" })
  // @ApiParam({ name: "id", description: "ID of the user" })
  // @ApiResponse({
  //   status: 200,
  //   description: "User deleted successfully",
  // })
  // @ApiResponse({ status: 404, description: "User not found" })
  // remove(@Param("id") id: string): Promise<void> {
  //   return this.userService.remove(+id);
  // }
}
