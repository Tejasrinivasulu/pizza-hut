import { Button } from '@nextui-org/react';
const CategoryTag = ({ name, onClick, isSelected }) => {
    const buttonStyle = isSelected ? 'bg-primary border-light text-dark' : 'bg-dark border-primary text-primary hover:bg-primary hover:border-light hover:text-dark';
    return (<Button size='lg' radius='full' className={`border-2 ${buttonStyle}`} onClick={() => onClick(name)}>{name}</Button>);
};
export default CategoryTag;
