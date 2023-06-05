import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { RecipeBookComponent } from './components/recipe-book/recipe-book.component';
import { RecipeComponent } from './components/recipe-book/recipe-list/recipe/recipe.component';
import { RecipeListComponent } from './components/recipe-book/recipe-list/recipe-list.component';
import { ShoppingListEditComponent } from './components/shopping-list/shopping-list-edit/shopping-list-edit.component';
import { IngredientComponent } from './components/shopping-list/ingredient/ingredient.component';
import { RecipeDetailComponent } from './components/recipe-book/recipe-detail/recipe-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    RecipeBookComponent,
    RecipeComponent,
    RecipeListComponent,
    ShoppingListEditComponent,
    IngredientComponent,
    RecipeDetailComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
