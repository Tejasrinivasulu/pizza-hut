'use client';
import FoodImage from '@/components/common/FoodImage';
import { CartIcon } from '@/icons/CartIcon';
import { formatPrice } from '@/libs/currency';
import { CartContext } from '@/util/ContextProvider';
import { Button, Link } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import MenuItemPopUp from '../menuItems/MenuItemPopUp';
const BestSellingCard = ({ menuItem, rating }) => {
    const { data: session, status } = useSession();
    const { addToCart } = useContext(CartContext);
    const [showPopUp, setShowPopUp] = useState(false);
    const [adding, setAdding] = useState(false);
    const isLoggedIn = status === 'authenticated' && !!session;
    const hasOptions = menuItem.sizes.length > 0 || menuItem.extraIngredientsPrices.length > 0;
    function handleAddToCart() {
        if (!isLoggedIn) {
            toast.error('Please log in to add items to your cart');
            return;
        }
        if (hasOptions) {
            setShowPopUp(true);
            return;
        }
        setAdding(true);
        addToCart(menuItem, null, []);
        setTimeout(() => setAdding(false), 600);
    }
    async function handlePopUpAddToCart(item, selectedSize, selectedExtras) {
        setAdding(true);
        addToCart(item, selectedSize, selectedExtras);
        await new Promise(resolve => setTimeout(resolve, 400));
        setShowPopUp(false);
        setAdding(false);
    }
    return (<>
      <div className='group h-full flex flex-col items-center p-4 text-center'>
        <div className='relative mb-4'>
          <div className='absolute -inset-3 rounded-full bg-primary/15 blur-xl opacity-0 group-hover:opacity-100 transition-opacity'/>
          <FoodImage src={menuItem.image} alt={menuItem.name} className='relative w-36 h-36 md:w-40 md:h-40 rounded-full border-2 border-primary/60 object-cover group-hover:scale-105 group-hover:border-primary transition-all duration-300 shadow-lg shadow-black/30'/>
          <span className='absolute -bottom-1 -right-1 bg-primary text-dark text-xs font-bold px-2 py-0.5 rounded-full shadow'>
            ⭐ {rating}
          </span>
        </div>

        <h3 className='font-bold text-lg text-center text-white mb-1'>{menuItem.name}</h3>
        <p className='text-primary text-xl font-bold mb-4'>
          {formatPrice(menuItem.basePrice)}
        </p>

        {isLoggedIn ? (<button type='button' disabled={adding} onClick={handleAddToCart} className='mt-auto w-full flex items-center justify-center gap-2 border-2 border-primary bg-primary text-dark font-bold rounded-full px-4 py-2.5 hover:bg-transparent hover:text-primary transition-all disabled:opacity-70'>
            <CartIcon className='w-4 h-4 text-current'/>
            {adding ? 'Added!' : 'Add to Cart'}
          </button>) : (<Button as={Link} href='/login' radius='full' className='mt-auto w-full bg-primary text-dark font-bold' startContent={<CartIcon className='w-4 h-4 text-dark'/>}>
            Login to Order
          </Button>)}
      </div>
      {showPopUp && (<MenuItemPopUp menuItem={menuItem} setShowPopUp={setShowPopUp} onAdd={handlePopUpAddToCart}/>)}
    </>);
};
export default BestSellingCard;
