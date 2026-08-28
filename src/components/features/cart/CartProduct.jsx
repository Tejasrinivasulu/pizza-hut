import { TrashIcon } from '@/icons/TrashIcon';
import { Tooltip } from '@nextui-org/react';
import FoodImage from '@/components/common/FoodImage';
import { formatPrice } from '@/libs/currency';
const CartProduct = ({ product, productPrice, onRemove }) => {
    return (<div className='grid grid-cols-8 gap-4 border-b pt-2'>
      <div className='col-span-2'>
        <FoodImage src={product.menuItem.image} alt={product.menuItem.name} className='mb-4 w-[120px] h-[120px] rounded-xl'/>
      </div>
      <div className='col-span-3 px-4'>
        <p className='font-semibold'>{product.menuItem.name}</p>
        {product.selectedSize && (<div className='text-sm text-gray-300 py-1'>
            Size: <span>{product.selectedSize.name} + {formatPrice(product.selectedSize.price)}</span>
          </div>)}
        {product.selectedExtras.length > 0 && (<div className='text-sm text-gray-300'>
            {product.selectedExtras.map((extra, index) => (<div key={index}>{extra.name} + {formatPrice((extra.price))}</div>))}
          </div>)}
      </div>
      <div className='items-start text-center'>
        <p className='font-semibold'>Quantity</p>
        <p>1</p>
      </div>
      <div className='text-right font-semibold'>
        {formatPrice(productPrice)}
      </div>
      {!!onRemove && (<Tooltip content='Remove'>
          <div className='ml-6 cursor-pointer' onClick={onRemove}>
            <TrashIcon className={'w-6'}/>
          </div>
        </Tooltip>)}
    </div>);
};
export default CartProduct;
