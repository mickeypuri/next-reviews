"use client";
import { useState } from "react";
import Heading from "@/components/Heading";

const word_list = ["python", "developer", "hangman", "keyboard", "monitor", "laptop", "program", "terminal", "function", "variable"];

export default function MSPage() {
  const [secret_word] = useState(word_list[Math.floor(Math.random() * word_list.length)]);

  const [currentWord, setCurrentWord] = useState(new Array(secret_word.length).fill("_"))

  const letterChanged = (i: number) => (event: React.ChangeEvent<HTMLInputElement> ) => {
    if (event.target.value.replaceAll("_","")  === secret_word[i]) {
      const newWord = [...currentWord];
      newWord[i] = event.target.value.replaceAll("_","");
      setCurrentWord(newWord)
    }

  };

  return (
    <>
      <Heading>Hangman </Heading>

      <div>
        Current Word: {currentWord as unknown as string}
      </div>

      <div>
        Secret word: {secret_word as unknown as string}
      </div>

      <div>
       {Array.from(currentWord).map((letter, index) => ( 
          <input 
            key={index}
            value={letter} 
            onChange={letterChanged(index)}
          />  
        )) }
      </div>
    </>
  )
}