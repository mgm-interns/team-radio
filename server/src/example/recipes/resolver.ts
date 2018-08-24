import { plainToClass } from 'class-transformer';
import { Logger } from 'services';
import { Arg, Authorized, FieldResolver, Int, Mutation, Query, Resolver, ResolverInterface, Root } from 'type-graphql';
import { Inject } from 'typedi';
import { RecipeInput } from './input';
import { createRecipeSamples } from './samples';
import { Recipe } from './type';

@Resolver(of => Recipe)
export class RecipeResolver implements ResolverInterface<Recipe> {
  @Inject()
  private logger: Logger;

  private readonly items: Recipe[] = createRecipeSamples();

  @FieldResolver()
  ratingsCount(@Root() recipe: Recipe, @Arg('minRate', type => Int, { nullable: true }) minRate: number = 0.0): number {
    return recipe.ratings.filter(rating => rating >= minRate).length;
  }

  @Query(returns => Recipe, { nullable: true })
  async recipe(@Arg('title') title: string): Promise<Recipe | undefined> {
    const item = await this.items.find(recipe => recipe.title === title);
    this.logger.info('item:', item);
    return item;
  }

  @Query(returns => [Recipe], { description: 'Get all the recipes from around the world ' })
  async recipes(): Promise<Recipe[]> {
    const items = await this.items;
    this.logger.info('items:', items);
    return items;
  }

  @Authorized()
  @Mutation(returns => Recipe)
  async addRecipe(@Arg('recipe') recipeInput: RecipeInput): Promise<Recipe> {
    const recipe = plainToClass(Recipe, {
      description: recipeInput.description,
      title: recipeInput.title,
      ratings: [],
      creationDate: new Date()
    });
    await this.items.push(recipe);
    this.logger.info('recipe:', recipe);
    return recipe;
  }
}
