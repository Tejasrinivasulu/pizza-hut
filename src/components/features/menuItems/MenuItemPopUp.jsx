import { Button } from '@nextui-org/react';
import { CartIcon } from '@/icons/CartIcon';
import React, { useState } from 'react';
import { calCartProductPrice } from '../../../util/ContextProvider';
import FoodImage from '@/components/common/FoodImage';
import { formatPrice } from '@/libs/currency';
const MenuItemPopUp = ({ menuItem, setShowPopUp, onAdd }) => {
    const [selectedSize, setSelectedSize] = useState(menuItem.sizes[0] || null);
    const [selectedExtras, setSelectedExtras] = useState([]);
    const addToCartPrice = calCartProductPrice({ menuItem, selectedSize, selectedExtras });
    function handleSelectExtras(e, extraIngredient) {
        const checked = e.target.checked;
        if (checked) {
            setSelectedExtras(prev => [...prev, extraIngredient]);
        }
        else {
            setSelectedExtras(prev => { return prev.filter(item => item._id !== extraIngredient._id); });
        }
    }
    return (<div onClick={() => setShowPopUp(false)} className='fixed inset-0 top-20 bg-black/80 flex items-center justify-center z-[999]'>
      <div onClick={(e) => e.stopPropagation()} className='bg-white p-2 rounded-2xl max-w-md w-full mx-4'>
        <div className='overflow-y-auto p-2' style={{ maxHeight: 'calc(100vh - 200px)' }}>
          <div className='w-full flex flex-col items-center'>
            <FoodImage src={menuItem.image} alt={menuItem.name} className='w-full max-w-[300px] h-[200px] rounded-xl'/>
          </div>
          <h2 className='font-bold text-center my-3 text-primary'>{menuItem.name}</h2>
          <p className='text-center text-sm text-gray-500 mb-4'>{menuItem.description}</p>
          {menuItem.sizes.length > 0 && (<div className="py-2">
              <h3 className="text-center text-gray-700">Select your size</h3>
              {menuItem.sizes.map(size => (<label key={size._id} className="flex items-center gap-2 p-4 border rounded-md mb-1 cursor-pointer">
                  <input type='radio' name='size' checked={(selectedSize === null || selectedSize === void 0 ? void 0 : selectedSize._id) === size._id} onChange={() => setSelectedSize(size)}/>
                  {size.name} {formatPrice(menuItem.basePrice + size.price)}
                </label>))}
            </div>)}
          {menuItem.extraIngredientsPrices.length > 0 && (<div className="py-2">
              <h3 className="text-center text-gray-700">Any extras?</h3>
              {menuItem.extraIngredientsPrices.map(extraIngredient => (<label key={extraIngredient._id} className="flex items-center gap-2 p-4 border rounded-md mb-1 cursor-pointer">
                  <input type='checkbox' name={extraIngredient.name} checked={selectedExtras.some(e => e._id === extraIngredient._id)} onChange={(e) => handleSelectExtras(e, extraIngredient)}/>
                  {extraIngredient.name} +{formatPrice(extraIngredient.price)}
                </label>))}
            </div>)}
          <button type="button" className='mt-4 sticky bottom-2 w-full flex items-center justify-center gap-2 border-2 px-4 py-3 border-primary text-dark bg-primary font-bold
             hover:bg-dark hover:text-primary rounded-full transition-all shadow-md' onClick={() => onAdd(menuItem, selectedSize, selectedExtras)}>
            <CartIcon className='w-5 h-5 text-current'/>
            Add to Cart
            <span className='font-bold'>{formatPrice(addToCartPrice)}</span>
          </button>
          <Button color='danger' variant='flat' radius='full' className='my-2' fullWidth onPress={() => setShowPopUp(false)}>Cancel</Button>
        </div>
      </div>
    </div>);
};
export default MenuItemPopUp;
