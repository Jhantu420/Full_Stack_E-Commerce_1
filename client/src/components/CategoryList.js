import React, { useEffect, useState } from "react";

function CategoryList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategoryProduct = () => {
    setLoading(true);
    fetch("http://localhost:4000/api/get-procuctCategory")
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        setData(result.data);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error fetching category products:", err);
      });
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="p-6 container mx-auto">
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex items-center justify-between overflow-scroll space-x-2 scrollbar-none ">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex flex-col items-center justify-center p-2 w-28"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <img
                  src={item?.imageFiles[0]}
                  alt={item.category}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs font-medium mt-1 text-gray-700 capitalize">
                {item?.category}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryList;
