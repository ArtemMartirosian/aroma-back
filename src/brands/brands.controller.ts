import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@ApiTags('Brands')
@Controller()
export class BrandsController {
    constructor(private readonly brandsService: BrandsService) {}

    @Get('brands')
    findAll() {
        return this.brandsService.findAll();
    }

    @Get('brands/:slug')
    findOne(@Param('slug') slug: string) {
        return this.brandsService.findOne(slug);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('admin/brands')
    adminFindAll() {
        return this.brandsService.findAll(true);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('admin/brands')
    create(@Body() dto: CreateBrandDto) {
        return this.brandsService.create(dto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Patch('admin/brands/:id')
    update(@Param('id') id: string, @Body() dto: UpdateBrandDto) {
        return this.brandsService.update(id, dto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete('admin/brands/:id')
    remove(@Param('id') id: string) {
        return this.brandsService.remove(id);
    }
}
