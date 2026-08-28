import { useContext, useState } from "react";
import { CartContext } from "../../../util/ContextProvider";
import MenuItemPopUp from "./MenuItemPopUp";
import { useSession } from "next-auth/react";
import { Button, Link } from "@nextui-org/react";
import FoodImage from "@/components/common/FoodImage";
import { CartIcon } from "@/icons/CartIcon";
import toast from "react-hot-toast";
import { formatPrice } from "@/libs/currency";
const MenuItemCard = ({ menuItem }) => {
    const { data: session, status } = useSession();
    const { addToCart } = useContext(CartContext);
    const [showPopUp, setShowPopUp] = useState(false);
    const [adding, setAdding] = useState(false);
    const hasSizesOrExtras = menuItem.sizes.length > 0 || menuItem.extraIngredientsPrices.length > 0;
    const isLoggedIn = status === 'authenticated' && !!session;
    function handleAddToCartClick() {
        if (!isLoggedIn) {
            toast.error('Please log in to add items to your cart');
            return;
        }
        const hasOptions = menuItem.sizes.length > 0 || menuItem.extraIngredientsPrices.length > 0;
        if (hasOptions) {
            setShowPopUp(true);
        }
        else {
            setAdding(true);
            addToCart(menuItem, null, []);
            setTimeout(() => setAdding(false), 600);
        }
    }
    async function handlePopUpAddToCart(item, selectedSize, selectedExtras) {
        setAdding(true);
        addToCart(item, selectedSize, selectedExtras);
        await new Promise(resolve => setTimeout(resolve, 400));
        setShowPopUp(false);
        setAdding(false);
    }
    return (<>
      <div className='flex flex-col gap-3 justify-center text-center items-center'>
        <FoodImage src={menuItem.image} alt={menuItem.name} className='mb-4 w-[200px] h-[200px] rounded-full border-2 border-primary shadow-lg shadow-primary/20'/>
        <div className="flex flex-col gap-4 w-full">
          <h3>{menuItem.name}</h3>
          <p className='text-gray-400 line-clamp-3'>{menuItem.description}</p>
          <p className='text-primary text-lg font-semibold'>
            {hasSizesOrExtras && <span>From: </span>}
              {formatPrice(menuItem.basePrice)}
          </p>
          {isLoggedIn ? (<button type="button" disabled={adding} onClick={handleAddToCartClick} className='w-full flex items-center justify-center gap-2 border-2 border-primary bg-primary text-dark font-bold rounded-full px-5 py-3 hover:bg-dark hover:text-primary transition-all shadow-md disabled:opacity-70'>
              <CartIcon className='w-5 h-5 text-current'/>
              {adding ? 'Added!' : 'Add to Cart'}
            </button>) : (<Button as={Link} href='/login' radius='full' className='w-full bg-primary text-dark font-bold py-6' startContent={<CartIcon className='w-5 h-5 text-dark'/>}>
              Login to Add to Cart
            </Button>)}
        </div>
      </div>
      {showPopUp &&
            <MenuItemPopUp menuItem={menuItem} setShowPopUp={setShowPopUp} onAdd={(item, selectedSize, selectedExtras) => handlePopUpAddToCart(item, selectedSize, selectedExtras)}/>}
    </>);
};
export default MenuItemCard;
