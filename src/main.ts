import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from './role/entities/role.entity';
import { UserEntity } from './users/entities/user.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('School X - OpenAPI 3.0')
    .setDescription(
      `[The source API definition (json)](http://${process.env.SERVER}:${process.env.PORT}/api-json)`,
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
    },
  });

  const port = parseInt(process.env.PORT);
  console.log('port = ', process.env.PORT);
  const server = process.env.SERVER;
  init(app);
  await app.listen(port, server);

  console.log(`Application is running on: ${await app.getUrl()}`);
}

async function init(app: INestApplication<any>) {
  const rolesRepository = app.get<Repository<Role>>(getRepositoryToken(Role));
  const existingRoles = await rolesRepository.find();

  if (existingRoles.length === 0) {
    const adminRole = new Role();
    adminRole.value = 'admin';
    const roleadmin = await rolesRepository.save(adminRole);

    const userRole = new Role();
    userRole.value = 'user';
    await rolesRepository.save(userRole);

    const userRepository = app.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
    const adminEntity = new UserEntity();
    adminEntity.username = process.env.USERNAME_ADMIN;
    const hashedPassword = await bcrypt.hash(
      process.env.PASSWORD_ADMIN,
      Number(process.env.HASH_SALT_ROUNDS),
    );
    adminEntity.password = hashedPassword;
    adminEntity.role = roleadmin;

    await userRepository.save(adminEntity);

    console.log('Admin has been created.');
  }
}
bootstrap();
