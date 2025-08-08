import React from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ProductList = () => {
  const { products, currency, axios, fetchProducts } = useAppContext();

  const toggleStock = async (id, inStock) => {
    try {
      const { data } = await axios.post('/api/product/stock', { id, inStock });
      if (data.success) {
        fetchProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-xl font-semibold">All Products</h2>

        <div className="max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-300">
          <table className="w-full table-auto">
            <thead className="bg-gray-100 text-sm text-gray-800 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Price</th>
                <th className="px-4 py-3 font-medium">In Stock</th>
              </tr>
            </thead>

            <tbody className="text-sm text-gray-600">
              {products.map((product) => (
                <tr key={product._id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3 flex items-center gap-3">
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded border"
                    />
                    <span className="truncate max-w-[180px]">{product.name}</span>
                  </td>

                  <td className="px-4 py-3">{product.category}</td>

                  <td className="px-4 py-3 hidden md:table-cell">
                    {currency}
                    {product.offerPrice}
                  </td>

                  <td className="px-4 py-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={product.inStock}
                        onChange={() => toggleStock(product._id, !product.inStock)}
                        className="sr-only peer"
                      />
                      <div className="w-12 h-7 bg-gray-300 rounded-full peer-checked:bg-green-600 transition-colors"></div>
                      <div className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && (
            <div className="text-center text-gray-500 p-6">No products available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;


