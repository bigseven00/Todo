import Link from 'next/link';

export default function ProductPage() {
    const products = [
        { id: '1', name: 'Product 1' },
        { id: '2', name: 'Product 2' },
        { id: '3', name: 'Product 3' },
        { id: '4', name: 'Product 4' },
        { id: '5', name: 'Product 5' },
    ];
    return (
        <>
            {products.map(product => (
                <h1 key={product.id}>
                    <Link href={`/product/${product.id}`}>{product.name}</Link>
                </h1>
            ))}
        </>
    );
}