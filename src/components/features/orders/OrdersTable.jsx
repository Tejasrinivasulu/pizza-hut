import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Button } from "@nextui-org/react";
import Link from "next/link";
import { EyeFilledIcon } from "@/icons/EyeFilledIcon";
import { getReadableDateTime } from "@/libs/datetime";
import { formatPrice } from "@/libs/currency";
import { useMemo } from "react";
function paymentChip(order) {
    if (order.paymentStatus === 'paid' || order.paid) {
        return <Chip color='success' size='sm' variant='flat'>Paid</Chip>;
    }
    if (order.paymentMethod === 'cod' || order.paymentStatus === 'cod_pending') {
        return <Chip color='warning' size='sm' variant='flat'>COD</Chip>;
    }
    return <Chip color='danger' size='sm' variant='flat'>Pending</Chip>;
}
function statusChip(order) {
    var _a;
    const colors = {
        pending: 'warning',
        accepted: 'primary',
        preparing: 'primary',
        out_for_delivery: 'primary',
        delivered: 'success',
        cancelled: 'danger',
    };
    return (<Chip color={colors[order.orderStatus || 'pending']} size='sm' variant='flat' className='capitalize'>

      {((_a = order.orderStatus) === null || _a === void 0 ? void 0 : _a.replace(/_/g, ' ')) || 'pending'}

    </Chip>);
}
function itemsSummary(order) {
    var _a, _b, _c;
    if (!((_a = order.cartProducts) === null || _a === void 0 ? void 0 : _a.length))
        return '—';
    if (order.cartProducts.length > 1) {
        return `${order.cartProducts[0].menuItem.name} + ${order.cartProducts.length - 1} more`;
    }
    return (_c = (_b = order.cartProducts[0].menuItem) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : '—';
}
const OrdersTable = ({ orders, isAdmin, highlightOrderId }) => {
    const columns = useMemo(() => {
        const base = [
            { key: 'orderDate', label: 'Date' },
            { key: 'orderId', label: 'Order ID' },
            ...(isAdmin ? [{ key: 'customer', label: 'Customer' }] : []),
            { key: 'items', label: 'Items' },
            { key: 'amount', label: 'Amount' },
            { key: 'payment', label: 'Payment' },
            { key: 'status', label: 'Status' },
            { key: 'actions', label: 'Actions' },
        ];
        return base;
    }, [isAdmin]);
    return (<Table aria-label="Orders Table" isStriped classNames={{
            wrapper: 'bg-transparent shadow-none p-0',
            th: `bg-gray-800/90 text-primary font-bold text-center ${isAdmin ? 'text-sm py-4' : 'text-sm'}`,
            td: `text-center text-gray-200 ${isAdmin ? 'py-5 text-base' : 'py-4 text-sm'}`,
            tr: `hover:bg-primary/5 transition-colors ${isAdmin ? 'min-h-[80px]' : ''}`,
        }}>

      <TableHeader columns={columns}>

        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}

      </TableHeader>

      <TableBody items={orders} emptyContent={isAdmin
            ? "No orders to display"
            : <p>You haven&apos;t placed any orders. <Link href="/menu" className="text-primary">Start shopping</Link></p>}>

        {(order) => (<TableRow key={order._id} className={`${order._id === highlightOrderId ? 'ring-2 ring-primary' : ''}`}>

            {(columnKey) => {
                var _a, _b;
                switch (columnKey) {
                    case 'orderDate':
                        return <TableCell><p className="whitespace-nowrap text-xs md:text-sm">{getReadableDateTime(order.createdAt)}</p></TableCell>;
                    case 'orderId':
                        return (<TableCell>

                      <span className='font-bold text-primary text-base'>#{order.orderNumber || ((_a = order._id) === null || _a === void 0 ? void 0 : _a.slice(-6))}</span>

                    </TableCell>);
                    case 'customer':
                        return (<TableCell>

                      <p className='font-medium text-white text-sm'>{order.customerName || '—'}</p>

                      <p className='text-xs text-gray-500'>{order.userEmail}</p>

                    </TableCell>);
                    case 'items':
                        return <TableCell className="text-sm max-w-[180px] mx-auto">{itemsSummary(order)}</TableCell>;
                    case 'amount':
                        return <TableCell><span className='font-bold text-primary text-lg'>{formatPrice((_b = order.total) !== null && _b !== void 0 ? _b : 0)}</span></TableCell>;
                    case 'payment':
                        return <TableCell>{paymentChip(order)}</TableCell>;
                    case 'status':
                        return <TableCell>{statusChip(order)}</TableCell>;
                    case 'actions':
                        return (<TableCell>

                      <Button as={Link} href={`/orders/${order._id}`} size={isAdmin ? 'md' : 'sm'} color='primary' variant='solid' className='text-dark font-bold min-w-[90px]' startContent={<EyeFilledIcon className='w-5'/>}>

                        View

                      </Button>

                    </TableCell>);
                    default:
                        return <TableCell>{null}</TableCell>;
                }
            }}

          </TableRow>)}

      </TableBody>

    </Table>);
};
export default OrdersTable;
