import React,{useEffect, useState} from 'react';
import Logo from './logo.svg';
import './App.css';
import { multiIndexFinder,multiIndexFinderOfTwo } from './utils/multiIndexFinder';
 const emojiSet=[
  {emoji:'🐶',flipped:false,matched:false},
  {emoji:'🦦',flipped:false,matched:false},
  {emoji:'🤩',flipped:false,matched:false},
  {emoji:'🏳️‍🌈',flipped:false,matched:false},
  {emoji:'🦖',flipped:false,matched:false},
  {emoji:'🎉',flipped:false,matched:false},
  {emoji:'🐹',flipped:false,matched:false},
  {emoji:'🙀',flipped:false,matched:false},
  {emoji:'🐶',flipped:false,matched:false},
  {emoji:'🦦',flipped:false,matched:false},
  {emoji:'🤩',flipped:false,matched:false},
  {emoji:'🏳️‍🌈',flipped:false,matched:false},
  {emoji:'🦖',flipped:false,matched:false},
  {emoji:'🎉',flipped:false,matched:false},
  {emoji:'🐹',flipped:false,matched:false},
  {emoji:'🙀',flipped:false,matched:false}];
   
function App() {
  const [emojis,setEmojis]= useState(emojiSet);
  const [movesCount,setMovesCount]= useState<number>(0);
  const [clickCount,setClickCount]= useState<number>(0);
  const [matchCount,setMatchCount]= useState<number>(0);

  const handleCardClick=(flipIndex:number)=>{
    const updatedEmojis=[...emojis];
    updatedEmojis[flipIndex]={...updatedEmojis[flipIndex],flipped:!updatedEmojis[flipIndex].flipped}
    setEmojis(updatedEmojis);
  }
  useEffect(()=>{
    if(clickCount===2){
      setMovesCount((m)=>m+1);
      setClickCount(()=>0);
       const updatedEmojis=[...emojis];
      let matchingEmojis = emojis.filter(emoji=>emoji.matched===false && emoji.flipped===true).map(emojiData=>emojiData.emoji);
      if(matchingEmojis[0]===matchingEmojis[1]){
        setMatchCount((mc)=>mc+1);
        const emojiIndexes=multiIndexFinder(emojis,matchingEmojis[0],'emoji');
        updatedEmojis[emojiIndexes[0]]={...updatedEmojis[emojiIndexes[0]],matched:true};
        updatedEmojis[emojiIndexes[1]]={...updatedEmojis[emojiIndexes[0]],matched:true};
        setEmojis(updatedEmojis);
      }else{
        const unMatchedEmojiIndexes=multiIndexFinderOfTwo(emojis,true,'flipped',false,'matched');
        updatedEmojis[unMatchedEmojiIndexes[0]]={...updatedEmojis[unMatchedEmojiIndexes[0]],flipped:false};
        updatedEmojis[unMatchedEmojiIndexes[1]]={...updatedEmojis[unMatchedEmojiIndexes[1]],flipped:false};
        setTimeout(()=>setEmojis(updatedEmojis),500)
      }
    }else{
      setClickCount((c)=>c+1);
    }
  },[emojis])
  const resetGame=()=>{
    setMovesCount(0);
    setClickCount(0);
    setMatchCount(0);
    setEmojis(emojiSet);
  }
  return (
    <>
      <div className='container'>
        <h2>
          Match The Pairs?
        </h2>
        <div className='row'>
          <div className='score-card matches'>
            <p>Pairs Matched</p>
            <p>{matchCount}/8</p>
          </div>
          <div className='score-card moves'>
            <p>Total Moves</p>
            <p>{movesCount}</p>
          </div>
        </div>
        <div className='grid'>
        {emojis.map(({emoji,flipped,matched},index)=>(
          <div className="card" key={`${index}`} onClick={()=>!matched && !flipped ? handleCardClick(index):{}}>
            <div className={flipped? `inner-card card-flip`:`inner-card `}>
              <div className='card-front'>
                <img src={Logo} alt="logo"/>
              </div>
              <div className='card-back'>
                {emoji}
              </div>
            </div>
          </div>
        ))}
        </div>
        <button className='reset-btn' onClick={()=>resetGame()}>{matchCount===8 ? `Play Again`:`Reset Game`}</button>
      </div>
    </>
  );
}

export default App;
