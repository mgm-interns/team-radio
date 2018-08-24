import 'reflect-metadata';
import { bootstrap } from 'config';
import * as TypeGraphQL from 'type-graphql';
import { Container } from 'typedi';
import * as TypeORM from 'typeorm';

TypeGraphQL.useContainer(Container);
TypeORM.useContainer(Container);

bootstrap();
