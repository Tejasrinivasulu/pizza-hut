import { countsTowardRevenue, getRevenueDate, sumOrderRevenue } from '@/libs/orderRevenue';
import { drawPdfHeader, drawTableHeader, ensurePageSpace, formatPdfPrice, PDF_PRIMARY, } from '@/libs/pdfFormat';
import { jsPDF } from 'jspdf';
function isToday(dateStr) {
    return new Date(dateStr).toDateString() === new Date().toDateString();
}
function isThisMonth(dateStr) {
    const d = new Date(dateStr);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
}
function paymentLabel(order) {
    if (order.paymentStatus === 'paid' || order.paid)
        return 'Paid';
    if (order.paymentMethod === 'cod')
        return 'COD';
    return 'Pending';
}
export function downloadReportsPdf(orders) {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 18;
    const rightEdge = pageWidth - margin;
    const countableOrders = orders.filter(countsTowardRevenue);
    const totalRevenue = sumOrderRevenue(orders);
    const pending = orders.filter(o => o.orderStatus === 'pending').length;
    const delivered = orders.filter(o => o.orderStatus === 'delivered').length;
    const cancelled = orders.filter(o => o.orderStatus === 'cancelled').length;
    const revenueToday = countableOrders
        .filter(o => isToday(getRevenueDate(o)))
        .reduce((s, o) => { var _a; return s + ((_a = o.total) !== null && _a !== void 0 ? _a : 0); }, 0);
    const revenueThisMonth = countableOrders
        .filter(o => isThisMonth(getRevenueDate(o)))
        .reduce((s, o) => { var _a; return s + ((_a = o.total) !== null && _a !== void 0 ? _a : 0); }, 0);
    const paidOnline = orders.filter(o => o.paymentMethod === 'online' && (o.paid || o.paymentStatus === 'paid')).length;
    const codOrders = orders.filter(o => o.paymentMethod === 'cod' || o.paymentStatus === 'cod_pending').length;
    const avgOrder = countableOrders.length > 0 ? totalRevenue / countableOrders.length : 0;
    let y = drawPdfHeader(doc, 'SALES & PERFORMANCE REPORT', `Generated: ${new Date().toLocaleString()}`, `Total Orders: ${orders.length}`, `Total Revenue: ${formatPdfPrice(totalRevenue)}`);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    doc.text('Performance Summary', margin, y);
    y += 10;
    const stats = [
        ['Total Orders', orders.length.toString()],
        ['Total Revenue (counted)', formatPdfPrice(totalRevenue)],
        ['Revenue Today', formatPdfPrice(revenueToday)],
        ['Revenue This Month', formatPdfPrice(revenueThisMonth)],
        ['Average Order Value', formatPdfPrice(avgOrder)],
        ['Pending Orders', pending.toString()],
        ['Delivered Orders', delivered.toString()],
        ['Cancelled Orders', cancelled.toString()],
        ['Online Paid Orders', paidOnline.toString()],
        ['Cash on Delivery Orders', codOrders.toString()],
    ];
    doc.setFontSize(10);
    stats.forEach(([label, value]) => {
        doc.setFillColor(248, 248, 248);
        doc.rect(margin, y - 4, pageWidth - margin * 2, 10, 'F');
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(60, 60, 60);
        doc.text(label, margin + 4, y + 2);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(30, 30, 30);
        doc.text(value, rightEdge - 4, y + 2, { align: 'right' });
        y += 12;
    });
    y += 8;
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, y, rightEdge, y);
    y += 12;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('All Orders Detail', margin, y);
    y += 4;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text('Revenue counted: Online when paid | COD when delivered', margin, y);
    y += 10;
    const colId = margin + 2;
    const colCustomer = margin + 32;
    const colAmount = rightEdge - 68;
    const colPayment = rightEdge - 42;
    const colStatus = rightEdge - 2;
    y = drawTableHeader(doc, y, [
        { label: 'ORDER ID', x: colId },
        { label: 'CUSTOMER', x: colCustomer },
        { label: 'AMOUNT', x: colAmount, align: 'right' },
        { label: 'PAY', x: colPayment, align: 'right' },
        { label: 'STATUS', x: colStatus, align: 'right' },
    ], margin, pageWidth);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(40, 40, 40);
    orders.forEach(order => {
        var _a, _b;
        y = ensurePageSpace(doc, y, 10, margin);
        const orderId = `#${order.orderNumber || ((_a = order._id) === null || _a === void 0 ? void 0 : _a.slice(-6))}`;
        const customer = (order.customerName || order.userEmail || '—').slice(0, 22);
        const amount = formatPdfPrice((_b = order.total) !== null && _b !== void 0 ? _b : 0);
        const pay = paymentLabel(order);
        const status = (order.orderStatus || 'pending').replace(/_/g, ' ');
        doc.text(orderId, colId, y);
        doc.text(customer, colCustomer, y);
        doc.setFont('helvetica', 'bold');
        doc.text(amount, colAmount, y, { align: 'right' });
        doc.setFont('helvetica', 'normal');
        doc.text(pay, colPayment, y, { align: 'right' });
        doc.text(status, colStatus, y, { align: 'right' });
        y += 8;
    });
    y = ensurePageSpace(doc, y, 20, margin);
    y += 6;
    doc.setFillColor(PDF_PRIMARY.r, PDF_PRIMARY.g, PDF_PRIMARY.b);
    doc.rect(margin, y, pageWidth - margin * 2, 12, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(30, 30, 30);
    doc.text('TOTAL COUNTED REVENUE', margin + 4, y + 8);
    doc.text(formatPdfPrice(totalRevenue), rightEdge - 4, y + 8, { align: 'right' });
    doc.save(`pizza-fiesta-report-${new Date().toISOString().slice(0, 10)}.pdf`);
}
