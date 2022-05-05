const select = {
  templateOf: {
    books: '#template-book',
    rating: '.book__rating__fill'
  },
  containerOf:{
    books: '.books-list'

  }

};
const chose = {
  rating: {
    six : 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)',
    eight :'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)',
    nine : 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)',

  }
};




const templates = {
  books: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),

};


  
// Przygotuj referencję do szablonu oraz listy .books-list.[done]
const booksContainer = document.querySelector(select.containerOf.books);
   
//Dodaj nową funkcję render.[done]
function render(){   


    


    
  //Wewnątrz niej przejdź po każdym elemencie z dataSource.books. Pamiętaj, że plik script.js ma do tego obiektu bezpośredni dostęp.
  for(let book in dataSource.books){
    dataSource.books[book].ratingBgc = determineRatingBgc(dataSource.books[book].rating);
    dataSource.books[book].ratingWidth = (dataSource.books[book].rating * 10);




    //Wewnątrz tej pętli zadbaj o wygenerowanie kodu HTML na podstawie szablonu oraz danych o konkretnej książce.
    
    const generatedHTML = templates.books(dataSource.books[book]);
    
    
    //Na postawie tego kodu HTML wygeneruj element DOM.
    const elementDOM = utils.createDOMFromHTML(generatedHTML);

    
  
    booksContainer.appendChild(elementDOM);

    
    
    

    console.log(dataSource.books[book]);
    



        
    
  }
  //Wygenerowany element DOM dołącz jako nowe dziecko DOM do listy .books-list.
  

    
}








function init(){

  render(); 
  initActions();
    
}
function favorite(event){
  
  let favoriteBooks = []; 
  let li =  event.path[2]; //document.querySelector('[alt="' + event.target.alt + '"]');

  li.classList.toggle('favorite');
  const liDataId = li.getAttribute('data-id');
  favoriteBooks.push(liDataId);
  let bookNumber = favoriteBooks.indexOf(liDataId);
  
  if(!(li.classList.contains('favorite'))){
    favoriteBooks.splice(bookNumber,1);
    
  }

  

}

function initActions(){

  const filtersFormAdults = document.querySelector('.filters [value="adults"]');
  const filtersFormNonFication = document.querySelector('.filters [value="nonFiction"]');
  

  let books = document.querySelector(select.containerOf.books);
    
  books.addEventListener('dblclick', function(event){

    favorite(event);  
  });

  filtersFormNonFication.addEventListener('change',function(event){
    console.log('event', event);
    filter(event);    
  });  
  filtersFormAdults.addEventListener('change',function(event){
    filter(event);
  });

}
const filters = []; // czemu nie działalo jak był w funkcji  filter caly czas tworzylo nowa tablie filters

function filter(event){

  


  if(event.srcElement.checked){
    
    filters.push(event.target.value);
    

  }else if(!event.srcElement.checked){   //Czemu nie działało mi  event.srcElement.checked == 'false'
    
    let deleteFiltr = filters.indexOf(event.target.value);
    filters.splice(deleteFiltr,1);
   
  }
  
  filterBooks();  

}

function filterBooks(){   
   
    
  for(let book of dataSource.books){
    let bookContainer = document.querySelector('[data-id="' + book.id + '"]');
    

    for(let filt of filters){
      

      

      if(!book.details[filt]== true){
        bookContainer.classList.add('hidden');
        
        break;
                
                
            
      }else{
        bookContainer.classList.remove('hidden');
                
      }
    }
      
      
      
      
    
    
    let x =document.querySelector('[value="adults"]').checked == false;
    console.log('x',x);
    if(document.querySelector('[value="adults"]').checked == false && document.querySelector('[value="nonFiction"]').checked == false){

      bookContainer.classList.remove('hidden');

    }
  }
  
}
function determineRatingBgc(rating){

  if(rating >=9){
    
    return chose.rating.nine;
    
  }
  if(rating >=8){
      
    return chose.rating.eight;
   
  }
  if(rating >=6){
      
    return chose.rating.six;
    
  }


}
//dataSource.books[book].rating

init();