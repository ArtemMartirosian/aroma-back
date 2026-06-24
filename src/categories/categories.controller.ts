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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Categories')
@Controller()
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get('categories')
    findAll() {
        return this.categoriesService.findAll();
    }

    @Get('categories/:slug')
    findOne(@Param('slug') slug: string) {
        return this.categoriesService.findOne(slug);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('admin/categories')
    adminFindAll() {
        return this.categoriesService.findAll(true);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('admin/categories')
    create(@Body() dto: CreateCategoryDto) {
        return this.categoriesService.create(dto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Patch('admin/categories/:id')
    update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
        return this.categoriesService.update(id, dto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete('admin/categories/:id')
    remove(@Param('id') id: string) {
        return this.categoriesService.remove(id);
    }
}
