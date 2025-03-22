import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { NutritionistService } from "./nutritionist.service";
import { CreateNutritionistDto } from "./dto/create-nutritionist.dto";
import { UpdateNutritionistDto } from "./dto/update-nutritionist.dto";
import { Language } from "src/shared/helpers/decorators/lang.decorator";

@ApiTags("nutritionist")
@Controller("nutritionist")
export class NutritionistController {
  constructor(private readonly nutritionistService: NutritionistService) {}

  @Post()
  @ApiOperation({ summary: "Create a new nutritionist" })
  @ApiResponse({
    status: 201,
    description: "The nutritionist has been successfully created.",
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  @ApiBody({ type: CreateNutritionistDto })
  create(
    @Body() createNutritionistDto: CreateNutritionistDto,
    @Language() language: string,
  ) {
    return this.nutritionistService.create(createNutritionistDto, language);
  }

  @Get()
  @ApiOperation({ summary: "Get all nutritionists" })
  @ApiResponse({
    status: 200,
    description: "Return all nutritionists.",
  })
  findAll() {
    return this.nutritionistService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a nutritionist by ID" })
  @ApiParam({ name: "id", description: "ID of the nutritionist" })
  @ApiResponse({
    status: 200,
    description: "Return the nutritionist.",
  })
  @ApiResponse({
    status: 404,
    description: "Nutritionist not found.",
  })
  findOne(@Param("id") id: string) {
    return this.nutritionistService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a nutritionist by ID" })
  @ApiParam({ name: "id", description: "ID of the nutritionist" })
  @ApiResponse({
    status: 200,
    description: "The nutritionist has been successfully updated.",
  })
  @ApiResponse({
    status: 404,
    description: "Nutritionist not found.",
  })
  @ApiBody({ type: UpdateNutritionistDto })
  update(
    @Param("id") id: string,
    @Body() updateNutritionistDto: UpdateNutritionistDto,
  ) {
    return this.nutritionistService.update(+id, updateNutritionistDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a nutritionist by ID" })
  @ApiParam({ name: "id", description: "ID of the nutritionist" })
  @ApiResponse({
    status: 200,
    description: "The nutritionist has been successfully deleted.",
  })
  @ApiResponse({
    status: 404,
    description: "Nutritionist not found.",
  })
  remove(@Param("id") id: string) {
    return this.nutritionistService.remove(+id);
  }
}
