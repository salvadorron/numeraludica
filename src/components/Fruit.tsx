import React from 'react';
import StyleFruit from './fruit.module.css';
interface FruitProps {
    name: string;
    number: number;
}

const Fruit: React.FC<FruitProps> = ({ name, number }) => {
    return (
        <div className={StyleFruit.fruit}>
            <span className={StyleFruit["fruit-number"]}>{number}</span> {name}
        </div>
    );
};

export default Fruit;
