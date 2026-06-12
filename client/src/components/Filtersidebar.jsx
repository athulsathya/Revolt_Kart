import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function Filtersidebar({
  search,
  setSearch,
  category,
  setCategory,
  brand,
  setBrand,
  allProduct,
  setPriceRange,
  priceRange,
}) {
  const categories = allProduct.map((p) => p.category);
  const UniqueCategory = ["All", ...new Set(categories.filter(Boolean))];

  const brands = allProduct.map((p) => p.brand);
  const UniqueBrand = ["All", ...new Set(brands.filter(Boolean))];

  const handleCategoryClick = (val) => {
    setCategory(val);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };

  const handleMinChange = (e) => {
    const value = Number(e.target.value);
    if (value <= priceRange[1]) {
      setPriceRange([value, priceRange[1]]);
    }
  };

  const handleMaxChange = (e) => {
    const value = Number(e.target.value);
    if (value >= priceRange[0]) {
      setPriceRange([priceRange[0], value]);
    }
  };

  const resetFilter = () => {
    setSearch("");
    setCategory("All");
    setBrand("All");
    setPriceRange([0, 999999]);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 w-full sticky top-4">
      {/* Search */}
      <Input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-white p-2 rounded-md border-gray-400 border-2 w-full"
      />

      {/* Category Filter */}
      <div className="mb-6 mt-4">
        <h3 className="font-semibold mb-2">Category</h3>

        <div className="flex flex-col gap-2">
          {UniqueCategory.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="radio"
                name="category"
                checked={category === item}
                onChange={() => handleCategoryClick(item)}
              />
              <label>{item}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Filter */}
      <div>
        <h3 className="font-semibold mb-2">Brand</h3>

        <select
          value={brand}
          onChange={handleBrandChange}
          className="w-full border rounded-md p-2"
        >
          {UniqueBrand.map((item, index) => (
            <option key={index} value={item}>
              {typeof item === "string" ? item.toUpperCase() : "ALL"}
            </option>
          ))}
        </select>

        {/* Price Range */}
        <h1 className="mt-5 font-semibold text-xl mb-3">Price Range</h1>

        <div className="flex flex-col gap-2">
          <label>
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </label>

          <div className="flex gap-2 items-center">
            <input
              type="number"
              min="0"
              max="5000"
              value={priceRange[0]}
              onChange={handleMinChange}
              className="w-24 p-1 border border-gray-300 rounded"
            />

            <span>-</span>

            <input
              type="number"
              min="0"
              max="999999"
              value={priceRange[1]}
              onChange={handleMaxChange}
              className="w-24 p-1 border border-gray-300 rounded"
            />
          </div>

          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={priceRange[0]}
            onChange={handleMinChange}
            className="w-full"
          />

          <input
            type="range"
            min="0"
            max="999999"
            step="100"
            value={priceRange[1]}
            onChange={handleMaxChange}
            className="w-full"
          />
        </div>
      </div>

      {/* Reset Button */}
      <Button onClick={resetFilter} className="w-full mt-4">
        Reset Filter
      </Button>
    </div>
  );
}

export default Filtersidebar;