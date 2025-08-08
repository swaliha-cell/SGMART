const NewsLetter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4 mt-24 pb-16 px-4 bg-gradient-to-b from-white to-gray-50 shadow-inner rounded-xl mx-auto max-w-3xl">
      <h1 className="md:text-4xl text-2xl font-bold text-gray-800 tracking-tight">
        Never Miss a Deal!
      </h1>
      <p className="md:text-lg text-gray-500">
        Subscribe to get the latest offers, new arrivals, and exclusive discounts.
      </p>

      <form className="flex flex-col sm:flex-row items-center w-full max-w-xl gap-3 mt-4">
        <input
          type="email"
          required
          placeholder="Enter your email address"
          className="w-full px-4 py-3 text-sm text-gray-600 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-primary text-white rounded-md shadow-md hover:bg-primary-dull transition-all text-sm font-medium w-full sm:w-auto"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
