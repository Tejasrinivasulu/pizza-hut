/** PDF-safe currency (Helvetica cannot render ₹ reliably) */
export function formatPdfPrice(amount) {
    return `Rs. ${amount.toFixed(2)}`;
}
export const PDF_PRIMARY = { r: 245, g: 166, b: 35 };
export const PDF_DARK = { r: 30, g: 30, b: 30 };
export const PDF_MUTED = { r: 100, g: 100, b: 100 };
export function drawPdfHeader(doc, title, subtitle, rightTop, rightBottom) {
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 18;
    doc.setFillColor(PDF_PRIMARY.r, PDF_PRIMARY.g, PDF_PRIMARY.b);
    doc.rect(0, 0, pageWidth, 42, 'F');
    doc.setTextColor(PDF_DARK.r, PDF_DARK.g, PDF_DARK.b);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('PIZZA FIESTA', margin, 16);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(title, margin, 26);
    if (subtitle)
        doc.text(subtitle, margin, 33);
    if (rightTop)
        doc.text(rightTop, pageWidth - margin, 16, { align: 'right' });
    if (rightBottom)
        doc.text(rightBottom, pageWidth - margin, 26, { align: 'right' });
    return 50;
}
export function drawTableHeader(doc, y, columns, margin, pageWidth) {
    doc.setFillColor(240, 240, 240);
    doc.rect(margin, y, pageWidth - margin * 2, 9, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(50, 50, 50);
    columns.forEach(col => {
        doc.text(col.label, col.x, y + 6, { align: col.align || 'left' });
    });
    return y + 12;
}
export function ensurePageSpace(doc, y, needed, margin) {
    const pageHeight = doc.internal.pageSize.getHeight();
    if (y + needed > pageHeight - margin) {
        doc.addPage();
        return margin + 10;
    }
    return y;
}
