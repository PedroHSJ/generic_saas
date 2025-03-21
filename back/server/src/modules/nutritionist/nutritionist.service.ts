import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { CreateNutritionistDto } from "./dto/create-nutritionist.dto";
import { UpdateNutritionistDto } from "./dto/update-nutritionist.dto";
import { In, Repository } from "typeorm";
import { NutritionistEntity } from "./entities/nutritionist.entity";
import { Transactional } from "typeorm-transactional";
import { InjectRepository } from "@nestjs/typeorm";
import { I18nService } from "nestjs-i18n";

@Injectable()
export class NutritionistService {
  constructor(
    @Inject(I18nService)
    private readonly i18n: I18nService,
    @InjectRepository(NutritionistEntity)
    private readonly nutritionistRepository: Repository<NutritionistEntity>,
  ) {}

  @Transactional()
  async create(
    createNutritionistDto: CreateNutritionistDto,
    lang: string,
  ) {
    try {
      const nutriExists = await this.nutritionistRepository.findOne({
        where: {
          crn: createNutritionistDto.crn,
        },
      });

      if (nutriExists)
        throw new BadRequestException({
          message: this.i18n.translate(
            "events.commons.alreadyExists",
            {
              lang,
            },
          ),
        });

      const nutriSaved = await this.nutritionistRepository.save(
        createNutritionistDto,
      );

      return {
        message: this.i18n.translate("events.commons.success", {
          lang,
        }),
        data: nutriSaved,
      };
    } catch (error) {
      //   console.log(error);
      //   throw new InternalServerErrorException({
      //     message: this.i18n.translate("events.commons.error", {
      //       lang,
      //     }),
      //     error: error.message ?? error,
      //   });
      // }
      throw error;
    }
  }

  findAll() {
    return `This action returns all nutritionist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nutritionist`;
  }

  update(id: number, updateNutritionistDto: UpdateNutritionistDto) {
    return `This action updates a #${id} nutritionist`;
  }

  remove(id: number) {
    return `This action removes a #${id} nutritionist`;
  }
}
