import 'reflect-metadata';
import { bootstrap } from 'config';
import * as TypeGraphQL from 'type-graphql';
import { Container } from 'typedi';
import * as TypeORM from 'typeorm';
import polyfill from 'config/polyfill';

polyfill();

TypeGraphQL.useContainer(Container);
TypeORM.useContainer(Container);

bootstrap();
