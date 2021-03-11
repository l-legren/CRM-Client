const Total = () => {

    const total = 200

    return (
        <div className="flex items-center mt-5 bg-white p-3 justify-between">
            <h2 className="text-gray-800 mt-0 text-lg">Total to pay</h2>
            <p className="text-gray-800 mt-0">{total} €</p>
        </div>
    );
}
 
export default Total;