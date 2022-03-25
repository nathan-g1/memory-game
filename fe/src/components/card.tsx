import React from 'react';
import './card.css'
import { Card } from '../App';

interface Props {
  card: Card;
  flip: (card: Card) => void;
  flipped: boolean;
  disabled: boolean;
}

const CardComponent: React.FC<Props> = ({ flip, card, flipped, disabled }) => {
  const handleClick = () => {
    if (disabled) return;
    flip(card); // call the flip function
  };

  return (
    <div key={card.id} className='card'>
      <div className={flipped ? 'flipped' : ''}>
        <img src={card.src} className='front w-[100px] bg-white rounded-md absolute' alt="card" />
        <img src="/images/bg.png" className="back w-[100px] rounded-md" alt="bg" onClick={handleClick} />
      </div>
    </div>
  );
};

export default CardComponent;
