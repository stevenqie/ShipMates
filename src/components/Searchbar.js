export default function SearchBar({zipcode}) {
    return (
        <nav className="w-full h-14 bg-gray-100 flex items-center px-6 border-b">
            <div className="text-lg font-semibold">Listings for {zipcode}</div>
            <input
                placeholder="Search..."
                className="border rounded px-2 py-1"
            />
            <select className="border rounded px-2 py-1">
                <option> Option 1 </option>
                <option> Option 2 </option>
            </select>
            <button className="bg-blue-500 text-white px-4 py-1 rounded">Search!</button>
        </nav>
    );

}
