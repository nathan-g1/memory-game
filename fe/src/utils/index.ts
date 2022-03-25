import { Card } from '../App';

// Shuffles array in place. ES6 version
export const shuffler = (array: { src: string, matched: boolean }[]): Card[] => {
    const shuffled = [...array, ...array]
        .sort(() => Math.random() - 0.5)
        .map((item, i) => ({ ...item, id: i }));
    return shuffled;
}

// Formattes numbers to be displayed in the UIs
export const nFormatter = (num: number, digits: number) => {
    const lookup = [
        { value: 1, symbol: '' },
        { value: 1e3, symbol: 'k' },
        { value: 1e6, symbol: 'M' },
        { value: 1e9, symbol: 'G' },
        { value: 1e12, symbol: 'T' },
        { value: 1e15, symbol: 'P' },
        { value: 1e18, symbol: 'E' },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup
        .slice()
        .reverse()
        .find(function (item) {
            return num >= item.value;
        });
    return item ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '0';
};
