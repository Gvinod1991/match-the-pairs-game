import React, { useEffect, useState } from 'react';
import Logo from './logo.png';
import './App.css';
import {
  multiIndexFinder,
  multiIndexFinderOfTwo,
} from './utils/multiIndexFinder';
import { shuffle } from './utils/suffle';

function App() {
  const eightEmojiSet=['🐶','🦦','🤩','🏳️‍🌈','🦖','🎉','🐹','🙀'];
  const emojiSet2=eightEmojiSet;
  const mergedEmojis=eightEmojiSet.concat(emojiSet2);
  const shuffleEmojis= shuffle(mergedEmojis);
  const emojiSet = shuffleEmojis.map(emoji=>({emoji,flipped:false,matched:false}));
  const [emojis, setEmojis] = useState(emojiSet);
  const [movesCount, setMovesCount] = useState<number>(0);
  const [matchCount, setMatchCount] = useState<number>(0);

  const handleCardClick = (flipIndex: number) => {
    let flippedEmojis = emojis.filter(
      (emoji) => emoji.matched === false && emoji.flipped === true
    );
    if (flippedEmojis && flippedEmojis.length < 2) {
      const updatedEmojis = [...emojis];
      updatedEmojis[flipIndex] = {
        ...updatedEmojis[flipIndex],
        flipped: !updatedEmojis[flipIndex].flipped,
      };
      setEmojis(updatedEmojis);
    }
  };

  useEffect(() => {
    const flippedEmojis = emojis
      .filter((emoji) => emoji.matched === false && emoji.flipped === true)
      .map((emojiData) => emojiData.emoji);
    if (
      flippedEmojis &&
      Array.isArray(flippedEmojis) &&
      flippedEmojis.length === 2
    ) {
      setMovesCount((m) => m + 1);
      const updatedEmojis = [...emojis];
      if (flippedEmojis[0] === flippedEmojis[1]) {
        setMatchCount((mc) => mc + 1);
        const emojiIndexes = multiIndexFinder(
          emojis,
          flippedEmojis[0],
          'emoji'
        );
        updatedEmojis[emojiIndexes[0]] = {
          ...updatedEmojis[emojiIndexes[0]],
          matched: true,
        };
        updatedEmojis[emojiIndexes[1]] = {
          ...updatedEmojis[emojiIndexes[1]],
          matched: true,
        };
      } else {
        const unMatchedEmojiIndexes = multiIndexFinderOfTwo(
          emojis,
          true,
          'flipped',
          false,
          'matched'
        );
        updatedEmojis[unMatchedEmojiIndexes[0]] = {
          ...updatedEmojis[unMatchedEmojiIndexes[0]],
          flipped: false,
        };
        updatedEmojis[unMatchedEmojiIndexes[1]] = {
          ...updatedEmojis[unMatchedEmojiIndexes[1]],
          flipped: false,
        };
      }
      setTimeout(() => setEmojis(updatedEmojis), 1000);
    }
  }, [emojis]);

  const resetGame = () => {
    setMovesCount(0);
    setMatchCount(0);
    setEmojis(shuffle(mergedEmojis).map(emoji=>({emoji,flipped:false,matched:false})));
  };
  return (
    <>
      <div className="container">
        <div className='row'>
          <img src={Logo} className="logo" alt="logo"/>
          <h2 className="title">Match The Pairs?</h2>
        </div>
        <div className="row">
          <div className="score-card matches">
            <p>Pairs Matched</p>
            <p>{matchCount}/8</p>
          </div>
          <div className="score-card moves">
            <p>Total Moves</p>
            <p>{movesCount}</p>
          </div>
        </div>
        <div className="grid">
          {emojis.map(({ emoji, flipped, matched }, index) => (
            <div
              className="card"
              key={`${index}`}
              onClick={() =>
                !matched && !flipped ? handleCardClick(index) : {}
              }
            >
              <div className={flipped ? `inner-card card-flip` : `inner-card `}>
                <div className="card-front">
                  <img src={Logo} alt="logo" />
                </div>
                <div className="card-back">{emoji}</div>
              </div>
            </div>
          ))}
        </div>
        <button className="reset-btn" onClick={() => resetGame()}>
          {matchCount === 8 ? `Play Again` : `Reset Game`}
        </button>
      </div>
    </>
  );
}

export default App;
