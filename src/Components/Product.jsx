function Product ({name, price, desc}){
    return (
        <div className="product">
            <h3>{name}</h3>
            <p>Ціна : {price} грн</p>
            <p>{desc}</p>
        </div>
    );
}
export default Product;