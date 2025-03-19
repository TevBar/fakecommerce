interface FilterbarProps {
    handleClick: (category: string) => void;
    select: string;
}

function Filterbar(props: FilterbarProps) {
    const categories = ['All Products', 'jewelry', 'electronics', `men's clothing`, `women's clothing`];

    return (
        <div className="categories w-[95%] md:w-[60%] mx-auto my-5 flex flex-wrap justify-around">
            {categories.map((category) => (
                <span
                    key={category}
                    onClick={() => props.handleClick(category)}
                    className={`border-2 cursor-pointer px-5 py-2 mx-2 my-1 rounded border-gray-900 transition hover:bg-gray-800 hover:text-white ${
                        props.select === category ? 'bg-gray-900 text-white' : 'border-stone-700/90 text-gray-900'
                    }`}
                >
                    {category[0].toUpperCase() + category.slice(1)}
                </span>
            ))}
        </div>
    );
}

export default Filterbar;
