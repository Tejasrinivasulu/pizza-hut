import { calCartProductPrice } from '@/libs/cartPrice';
import { drawPdfHeader, drawTableHeader, ensurePageSpace, formatPdfPrice, PDF_PRIMARY, } from '@/libs/pdfFormat';
import { jsPDF } from 'jspdf';
export function downloadInvoice(order) {
    var _a, _b, _c, _d;
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 18;
    const rightEdge = pageWidth - margin;
    let y = drawPdfHeader(doc, 'TAX INVOICE / PAYMENT RECEIPT', 'Official bill for your order', `Order #${order.orderNumber || order._id}`, new Date(order.createdAt).toLocaleString());
    // Bill to section
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(50, 50, 50);
    doc.text('BILL TO', margin, y);
    y += 8;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const billLines = [
        `Name: ${order.customerName || 'N/A'}`,
        `Email: ${order.userEmail}`,
        `Phone: ${order.phone || 'N/A'}`,
    ];
    const address = [order.streetAddress, order.city, order.state, order.postalCode, order.country]
        .filter(Boolean)
        .join(', ');
    if (address)
        billLines.push(`Address: ${address}`);
    billLines.forEach(line => {
        const wrapped = doc.splitTextToSize(line, pageWidth - margin * 2);
        doc.text(wrapped, margin, y);
        y += wrapped.length * 5 + 2;
    });
    y += 6;
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, y, rightEdge, y);
    y += 10;
    // Items table
    const colItem = margin + 2;
    const colQty = rightEdge - 72;
    const colRate = rightEdge - 42;
    const colAmt = rightEdge - 2;
    y = drawTableHeader(doc, y, [
        { label: 'ITEM DESCRIPTION', x: colItem },
        { label: 'QTY', x: colQty, align: 'right' },
        { label: 'RATE', x: colRate, align: 'right' },
        { label: 'AMOUNT', x: colAmt, align: 'right' },
    ], margin, pageWidth);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(40, 40, 40);
    order.cartProducts.forEach((item, i) => {
        var _a;
        y = ensurePageSpace(doc, y, 14, margin);
        const price = calCartProductPrice(item);
        const name = ((_a = item.menuItem) === null || _a === void 0 ? void 0 : _a.name) || `Item ${i + 1}`;
        const nameLines = doc.splitTextToSize(name, colQty - colItem - 8);
        doc.text(nameLines, colItem, y);
        doc.text('1', colQty, y, { align: 'right' });
        doc.text(formatPdfPrice(price), colRate, y, { align: 'right' });
        doc.text(formatPdfPrice(price), colAmt, y, { align: 'right' });
        y += Math.max(nameLines.length * 5, 6) + 4;
    });
    y += 4;
    doc.line(margin, y, rightEdge, y);
    y += 10;
    // Totals box
    const totalsBoxW = 90;
    const totalsX = rightEdge - totalsBoxW;
    const subtotal = (_a = order.subtotal) !== null && _a !== void 0 ? _a : 0;
    const delivery = (_b = order.deliveryFee) !== null && _b !== void 0 ? _b : 40;
    const tax = (_c = order.tax) !== null && _c !== void 0 ? _c : 0;
    const total = (_d = order.total) !== null && _d !== void 0 ? _d : 0;
    const totalRows = [
        ['Subtotal', formatPdfPrice(subtotal)],
        ['Delivery Fee', formatPdfPrice(delivery)],
        ['Tax / GST (5%)', formatPdfPrice(tax)],
    ];
    doc.setFontSize(10);
    totalRows.forEach(([label, value]) => {
        doc.setFont('helvetica', 'normal');
        doc.text(label, totalsX, y);
        doc.setFont('helvetica', 'bold');
        doc.text(value, rightEdge, y, { align: 'right' });
        y += 8;
    });
    y += 2;
    doc.setFillColor(PDF_PRIMARY.r, PDF_PRIMARY.g, PDF_PRIMARY.b);
    doc.rect(totalsX - 4, y - 4, totalsBoxW + 4, 14, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(30, 30, 30);
    doc.text('GRAND TOTAL', totalsX, y + 5);
    doc.text(formatPdfPrice(total), rightEdge, y + 5, { align: 'right' });
    y += 20;
    // Payment info
    const paymentLabel = order.paymentStatus === 'paid'
        ? 'Paid Online'
        : order.paymentMethod === 'cod'
            ? 'Cash on Delivery'
            : 'Payment Pending';
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text(`Payment Method: ${paymentLabel}`, margin, y);
    y += 7;
    doc.text(`Order Status: ${(order.orderStatus || 'pending').replace(/_/g, ' ').toUpperCase()}`, margin, y);
    y += 14;
    doc.setFontSize(11);
    doc.setTextColor(PDF_PRIMARY.r, PDF_PRIMARY.g, PDF_PRIMARY.b);
    doc.setFont('helvetica', 'bold');
    doc.text('Thank you for dining with Pizza Fiesta!', pageWidth / 2, y, { align: 'center' });
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text('This is a computer-generated receipt and does not require a signature.', pageWidth / 2, y, { align: 'center' });
    doc.save(`invoice-${order.orderNumber || order._id}.pdf`);
}
