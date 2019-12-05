import axios from 'axios';

export default class Recipe {
    constructor(id){
        this.id=id;

    }
    async getRecipe() {
        try{
        const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
        this.title = res.data.recipe.title;
        this.publisher = res.data.recipe.publisher;
        this.img = res.data.recipe.image_url;
        this.url=res.data.recipe.source_url;
        this.ingredients=res.data.recipe.ingredients;
        
        }catch(error){
            console.log(error);
        }

    }

    calcTime(){
        const numIng = this.ingredients.length;
        const period = Math.ceil(numIng/3);
        this.servingTime = period*15;

    }
    calcServing(){
        this.serving=4;
    }
     parseIngredients(){
        //get the ingredeients
        const  longUnit= ['tablespoons','tablespoon','ounces','ounce','teaspoons','teaspoon','cups','pounds'];
        const shortUnit =['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound'];
        let ingObject;
        const newIngredeints = this.ingredients.map(el =>{
          //  console.log('inside the new ingredients')
        //replace the ingredeints with shoret forms
        let ingredeint = el.toLowerCase();
        longUnit.forEach((e,i)=>{
            ingredeint=ingredeint.replace(e,shortUnit[i]);
            //console.log('replaced the unit names')
        });
        //remove paranthesis
        ingredeint.replace(/ *\([^)]*\) */g,' ');
        console.log('removed paranthesis')
        //parse ingredients into count,unit,ingredients
        const arrayIngr = ingredeint.split(' ');
        const arrayIndex = arrayIngr.findIndex(el=>shortUnit.includes(el));
        
            //console.log('before dividing the units')
           // console.log('arrayIndex values'+arrayIndex);
        if(arrayIndex >-1){
            const arrCount = arrayIngr.slice(0,arrayIndex);
            let count;
            if(arrCount.length ===1){
                count = eval(arrayIngr[0].replace('-','+'));
            }else{
               count= eval(arrayIngr.slice(0,arrayIndex).join('+'));
            }
            ingObject= {
                count,
                unit:arrayIngr[arrayIndex],
                ingredeint: arrayIngr.slice(arrayIndex+1).join(' ')
            };
           // console.log(`if len > -1 ${ingObject}`)
        }else if(parseInt(arrayIngr[0],10)){
            ingObject ={
                count: parseInt(arrayIngr[0],10),
                unit:'',
                ingredeint:arrayIngr.slice(1).join(' ')
            }
           // console.log(`if bla ${ingObject}`)
        }else if(arrayIndex === -1){
            ingObject = {
                count:1,
                unit:'',
                ingredeint
            }   
          //  console.log(`if len == -1 ${ingObject}`)
        }
        return ingObject;
        });
        this.ingredients=newIngredeints;
        
     }
}