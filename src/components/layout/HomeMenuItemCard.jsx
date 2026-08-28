'use client';
import { Button, Link } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import FoodImage from '@/components/common/FoodImage';
import { formatPrice } from '@/libs/currency';
const HomeMenuItemCard = ({ menuItem, index }) => {
    const { data: session } = useSession();
    const hasSizesOrExtras = menuItem.sizes.length > 0 || menuItem.extraIngredientsPrices.length > 0;
    const imageBlock = (<FoodImage src={menuItem.image} alt={menuItem.name} className='w-full h-full min-h-[220px]'/>);
    const textBlock = (<div className="flex items-center h-full" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.3))" }}>
      <div className={`flex flex-col gap-4 p-10 ${index % 6 >= 3 ? 'text-end w-full' : ''}`}>
        <h3>{menuItem.name}</h3>
        <p className='text-gray-400 line-clamp-3'>{menuItem.description}</p>
        <div className={`flex items-center gap-4 ${index % 6 >= 3 ? 'justify-end' : ''}`}>
          <p className='text-primary'>
            {hasSizesOrExtras && (<span>From: </span>)}
            {formatPrice(menuItem.basePrice)}
          </p>
          <Button as={Link} href={session ? '/menu' : '/login'} radius='none' size='sm' className='bg-transparent border hover:bg-primary hover:text-dark'>Order</Button>
        </div>
      </div>
    </div>);
    if (index % 6 < 3) {
        return (<div className='grid grid-cols-2'>
        <div className='overflow-hidden'>{imageBlock}</div>
        {textBlock}
      </div>);
    }
    return (<div className='grid grid-cols-2'>
      {textBlock}
      <div className='overflow-hidden'>{imageBlock}</div>
    </div>);
};
export default HomeMenuItemCard;
