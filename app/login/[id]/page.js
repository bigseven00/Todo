async function getProductById(id) {
  await new Promise(resolve => setTimeout(resolve, 100));
  const products = {
      '1': { id: '1', name: 'Product 1' },
      '2': { id: '2', name: 'Product 2' },
      '3': { id: '3', name: 'Product 3' },
      '4': { id: '4', name: 'Product 4' },
      '5': { id: '5', name: 'Product 5' },
  };
  return products[id] || null;
}

export default async function ProductDetails({ params }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) {
      return <p>Product not found</p>;
  }
  return (
      <>
          <h1>Product Details</h1>
          <p>Product ID: {product.id}</p>
          <p>Product Name: {product.name}</p>
      </>
  );
}