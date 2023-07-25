import ky from "ky";
import React, { Component } from "react";
import { useQuery, useQueryClient } from "react-query";
import './Word.scss';
import { ActionIcon } from "@mantine/core";
type Props = {};

const Word = (props: Props) => {
//   const RequestCreating = (word: string) => {

//     const response = ky
//       .get("https://api.dictionaryapi.dev/api/v2/entries/en/" + `${word}`)
//       .json();
//     console.log(response);
//     return response;
//   };


   async function RequestCreating(word: string) {
    const response = await ky("https://api.dictionaryapi.dev/api/v2/entries/en/" + `${word}`, {
      retry: {
        limit: 3,
        methods: ['get'],
        statusCodes: [413]
      }
    }).json();
    console.log(response)
    return(response)
  }

  const { data, isLoading, isError } = useQuery("word", () =>
    RequestCreating(window.location.pathname.split("/")[2])
  );
  if (isLoading) {
    return <>загрузка </>;
  }
  if (isError) {
    return <>оштибка </>;
  }
  if (!data) {
    return <>нет данных </>;
  }
  if(data){


 const audioButton = () => {

     
     if(data[0].phonetics[0].audio!=''){
       const audio = new Audio(data[0].phonetics[0].audio);
      const audioButton = (
      <div>
        <button  onClick={() => {
          audio.play();
        }}>
      
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M6.603 10L10 7.22v9.56L6.603 14H3v-4h3.603ZM2 16h3.889l5.294 4.332a.5.5 0 0 0 .817-.387V4.055a.5.5 0 0 0-.817-.387L5.89 8H2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1Zm21-4c0 3.292-1.446 6.246-3.738 8.262l-1.418-1.418A8.98 8.98 0 0 0 21 12a8.98 8.98 0 0 0-3.155-6.844l1.417-1.418A10.974 10.974 0 0 1 23 12Zm-5 0a5.99 5.99 0 0 0-2.287-4.713l-1.429 1.429A3.996 3.996 0 0 1 16 12c0 1.36-.679 2.561-1.716 3.284l1.43 1.43A5.99 5.99 0 0 0 18 12Z"/></svg>
      
          </button>
    
          </div>
      );
      return audioButton;}
      else if(data[0].phonetics[1].audio!=''){
   
        const audio = new Audio(data[0].phonetics[1].audio);

        const audioButton = (
          <div>
          <button   onClick={() => {
            audio.play();
          }}>
        
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M6.603 10L10 7.22v9.56L6.603 14H3v-4h3.603ZM2 16h3.889l5.294 4.332a.5.5 0 0 0 .817-.387V4.055a.5.5 0 0 0-.817-.387L5.89 8H2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1Zm21-4c0 3.292-1.446 6.246-3.738 8.262l-1.418-1.418A8.98 8.98 0 0 0 21 12a8.98 8.98 0 0 0-3.155-6.844l1.417-1.418A10.974 10.974 0 0 1 23 12Zm-5 0a5.99 5.99 0 0 0-2.287-4.713l-1.429 1.429A3.996 3.996 0 0 1 16 12c0 1.36-.679 2.561-1.716 3.284l1.43 1.43A5.99 5.99 0 0 0 18 12Z"/></svg>
        
            </button>
            
           </div>
        );
        return audioButton;}
      else {
        const audioButton = <></>;
        return audioButton;
    }
  };

 
    return(
     <div className="word-box">
      


         <div className="word-name"><div><h1>{data[0].word} </h1>      {data[0].phonetic}</div>
          {audioButton()}
           </div>   




          {data[0].meanings.map((meaning) => (
            <div key={meaning.partOfSpeech}>
             <h2> {meaning.partOfSpeech}</h2>
             
              {meaning.definitions.map((def,index) => (
                <div className="definition-sentence" key={def.definition}> <h4>{index+1}.&nbsp;</h4> {def.definition} </div>
              ))}
            </div>
          ))}
       
      </div>)
  }

 

  console.log(data);
  return (
    <>
     
    </>
  );
};

export default Word;
function elif(arg0: boolean) {
  throw new Error("Function not implemented.");
}

