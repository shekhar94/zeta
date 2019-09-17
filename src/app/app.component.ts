import { Component } from '@angular/core';
import { ApiService } from '../shared/api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent {
  constructor(private apiService: ApiService) {
    apiService.getFoodCategories().subscribe((response: any) => {
      if (response.status === 200) {
        const body = JSON.parse(response._body);
        this.categories = body.categories;
        this.allRecipes = body.recipes;
        this.onSelectCategory(this.categories[0], 0);
        this.updateFavourites();
      } else {
        console.log('Error in fetching categories');
      }
      console.log(response);
    });
  }
  title = 'zeta';
  categories = [];
  allRecipes = [];
  selectedRecipes = [];
  selected = 0;
  searchTerm = '';
  favourites = [];
  totalItems = 0;
  bag = new Map<String, number>();

  updateFavourites() {
    this.favourites = this.allRecipes.reduce((acc, recipe) => {
      if (recipe.isFavourite) {
        acc.push(recipe);
      }
      return acc;
    }, []);
  }
  onSelectCategory(category, i) {
    // debugger;
    this.selected = i;
    this.selectedRecipes = this.allRecipes.reduce((acc, recipe) => {
      if (recipe.category === category.name) {
        acc.push(recipe);
      }
      return acc;
    }, []);
  }

  onRemoveFromBag(recipe) {
    if (this.bag.has(recipe.name)) {
      const count =  this.bag.get(recipe.name);
      if (count > 0) {
        this.bag.set(recipe.name, (count - 1));
      }
    } 
  this.totalItems -= 1;
  }

  onAddToBag(recipe) {
    if (this.bag.has(recipe.name)) {
      this.bag.set(recipe.name, (this.bag.get(recipe.name) + 1));
    } else {
      this.bag.set(recipe.name, 1);
    }
  this.totalItems += 1;
  }

}
