import Search from './models/Search';
import * as searchView from './views/searchView';
import  Recipe from './models/Recipe';
import {elements,renderLoader,clearLoader} from './views/base';
import * as recipeView from './views/recipeView';
/**
 * SEARCH CONTROLLER
 */
const state ={}
const controlSearch = async ()=>{
    //get the query parameter
    const query = searchView.searchInput();
    console.log(query);
    if(query){
    // new search obj add to state
    state.search = new Search(query);

    //PREPARE UI FOR RESULTS
        searchView.clearSearch();
        searchView.clearResults();
        renderLoader(elements.searchResult);
    //GET RECIPES FROM CONTROLLER
      await state.search.getRecipe();  
    // UPDATE THE RECIPES IN UI
    clearLoader();
    searchView.renderResults(state.search.result)
    }

}

elements.searchForm.addEventListener('submit',e=>{
    e.preventDefault();
    controlSearch();
});

elements.searchresPage.addEventListener('click',e=>{
    const btn =e.target.closest('.btn-inline')
    if(btn){
      const goTO = btn.data-set.goto
      searchView.clearResults();
      searchView.renderResults(state.search.result,goTO);
    }

});
/**
 * RECIPE CONTROLLER
 */
 const controlRecipe = async ()=>{
    //Get the id
    const id = window.location.hash.replace('#','');
    if(id){
        //prepare the UI
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
    //get the Recipe
        state.recipe = new Recipe(id);
        try{
           
           await state.recipe.getRecipe();
           
           state.recipe.parseIngredients();
     //get the servings n time
       state.recipe.calcServing();
       state.recipe.calcTime();
    //render the recipe
    clearLoader();
   
    recipeView.renderRecipe(state.recipe);
    console.log(state.recipe);
        }catch(error){
            alert(`something wrong getting recipe ${error}`);
        }
        
    }
    
 }
//window.addEventListener('hashchange',controlRecipe)
['hashchange','load'].forEach( e =>window.addEventListener(e,controlRecipe));