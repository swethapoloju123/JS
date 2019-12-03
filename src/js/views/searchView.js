import {elements} from './base';
export const searchInput = ()=>elements.searchInput.value;
export const clearSearch = ()=>{
    elements.searchInput.value='';
};
export const clearResults =()=>{
    elements.searchRelList.innerHTML=''
    elements.searchresPage.innerHTML=''
};
const limitTitle =(title,limit=17)=>{
    const tempTitle =[];
    if(title.length >limit){
        title.split(' ').reduce((acc,curr)=>{
            if(acc+curr.length <limit){
                tempTitle.push(curr);

            }
            return acc+curr.length;

        },0);
        return `${tempTitle.join(' ')}...`;
    }
    return title;
};
const renderRecipe=(recipe)=>{
    const markup =`
    <li>
    <a class="results__link results__link--active" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
</li>
    `;
    elements.searchRelList.insertAdjacentHTML('beforeend',markup);

};
    const createButton = (page,type) => `
        <button class="btn-inline results__btn--${type}" data-goto=${type==='prev' ? page-1:page+1}>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type==='prev' ? 'left':'right'}"></use>
        </svg>
        <span>Page ${type==='prev' ? page-1:page+1}</span>
    </button>
    `;

    const renderButtns = (page,noOfREcipes,recipesPerPage)=>{
        const noOfPages = Math.ceil(noOfREcipes/recipesPerPage);
        let button;
        if(page == 1 && noOfPages>1){
            //Get the next button
            button = createButton(page,'next');
        }else if(page<noOfPages){
            //Get prev and next button
            button = `
            ${createButton(page,'prev')}
            ${createButton(page,'next')}
            `;
        }else if(page===noOfPages && noOfPages>1) {
            //Get prev button
            button = createButton(page,'prev');
        }
        elements.searchresPage.insertAdjacentHTML('afterbegin',button);
    };   
export const renderResults =(recipes,page=1,recipesPerPage=10) =>{
    const start = (page-1)*recipesPerPage;
    const end = page*recipesPerPage;
   
    recipes.slice(start,end).forEach(renderRecipe);
    // render pagination
    renderButtns(page,recipes.length,recipesPerPage);
};

