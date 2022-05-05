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
//function getElements(){
const booksContainer = document.querySelector(select.containerOf.books);
   
//}
class BooksList {
  constructor(){
    const  thisBook = this;
    thisBook.filters = [];
    thisBook.render();
    thisBook.initActions();
    thisBook.filterBooks();
    

  }

  render(){     
 
    for(let book in dataSource.books){
      dataSource.books[book].ratingBgc = determineRatingBgc(dataSource.books[book].rating);
      dataSource.books[book].ratingWidth = (dataSource.books[book].rating * 10);

      //Wewnątrz tej pętli zadbaj o wygenerowanie kodu HTML na podstawie szablonu oraz danych o konkretnej książce.   
      const generatedHTML = templates.books(dataSource.books[book]);
    
      //Na postawie tego kodu HTML wygeneruj element DOM.
      const elementDOM = utils.createDOMFromHTML(generatedHTML);

      booksContainer.appendChild(elementDOM);
 
    }   
  }
  favorite(event){
    
    let favoriteBooks = []; 
    let li =  event.path[2];  // czemu pomimo ze w tej lini wyruca ze jest jakis blad wszystko działa jak należy ??
    console.log('event.path[2]',event.path[2]);

    li.classList.toggle('favorite');
    const liDataId = li.getAttribute('data-id');
    favoriteBooks.push(liDataId);
    let bookNumber = favoriteBooks.indexOf(liDataId);
  
    if(!(li.classList.contains('favorite'))){
      favoriteBooks.splice(bookNumber,1);
    
    }
  }
  initActions() {
    const thisBook = this;

    const filtersFormAdults = document.querySelector('.filters [value="adults"]');
    const filtersFormNonFication = document.querySelector('.filters [value="nonFiction"]');
    
    let books = document.querySelector(select.containerOf.books);
        
    books.addEventListener('dblclick', function(event){

      thisBook.favorite(event);  
    });

    filtersFormNonFication.addEventListener('change',function(event){
      console.log('event', event);
      thisBook.filter(event);    
    });  
    filtersFormAdults.addEventListener('change',function(event){
      thisBook.filter(event);
    });

  }

  filter(event){
    const thisBook = this;
    
    if(event.srcElement.checked){
    
      thisBook.filters.push(event.target.value);
    
    }else if(!event.srcElement.checked){   //Czemu nie działało mi  event.srcElement.checked == 'false'
    
      let deleteFiltr = thisBook.filters.indexOf(event.target.value);
      thisBook.filters.splice(deleteFiltr,1);
   
    }
  
    thisBook.filterBooks();  

  }  
  filterBooks(){   
    const thisBook = this;
     
    for(let book of dataSource.books){
      let bookContainer = document.querySelector('[data-id="' + book.id + '"]');
    
      for(let filt of thisBook.filters){
      
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

//init();


const app = new BooksList();
