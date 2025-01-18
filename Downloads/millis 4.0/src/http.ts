export async function fetchProjects() {
    const response = await fetch('http://localhost:3000/projects');
       const resData = await response.json();
   
       if(!response.ok){
         throw new Error('failed to fetch projects');
       }

       return resData.projects;
}

export async function fetchQA() {
  const response = await fetch('http://localhost:3000/questions');
     const resData = await response.json();
 
     if(!response.ok){
       throw new Error('failed to fetch questions');
     }

     return resData.questions;
}

export async function fetchArticles() {
  const response = await fetch('http://localhost:3000/articles');
     const resData = await response.json();
 
     if(!response.ok){
       throw new Error('failed to fetch articles');
     }

     return resData.articles;
}

export async function fetchNumberCards(path:string) {
  const response = await fetch(`http://localhost:3000/${path}`);
     const resData = await response.json();
 
     if(!response.ok){
       throw new Error('failed to fetch NumberCards');
     }

     return resData.numbersCards; 
    }

    export async function fetchKeyPoints() {
      const response = await fetch("http://localhost:3000/about");
         const resData = await response.json();
     
         if(!response.ok){
           throw new Error('failed to fetch keyPoints');
         }
    
         return resData.keyPoints; 
        }
    

export async function fetchArticle(index:number) {
  const response = await fetch(`http://localhost:3000/articles/${index}`);
     const resData = await response.json();
 
     if(!response.ok){
       throw new Error('failed to fetch article');
     }

     return resData;
}