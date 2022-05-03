const select = {
  templateOf: {
    books: '#template-book'
  },
  containerOf:{
    books: '.books-list'

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
    //Wewnątrz tej pętli zadbaj o wygenerowanie kodu HTML na podstawie szablonu oraz danych o konkretnej książce.
    
    const generatedHTML = templates.books(dataSource.books[book]);
    
    
    //Na postawie tego kodu HTML wygeneruj element DOM.
    const elementDOM = utils.createDOMFromHTML(generatedHTML);
    console.log(elementDOM);
    booksContainer.appendChild(elementDOM);
  } 
  //Wygenerowany element DOM dołącz jako nowe dziecko DOM do listy .books-list.




}
render();
console.log(dataSource.books);