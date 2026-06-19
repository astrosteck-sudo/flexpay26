import diamondsImage from "../assets/icons/CopilotDiamond.png";

export function PackageDiamonds({
  item,
  setDiamondPackagePrice,
  setDiamonPackage,
  isSelected,
  onSelect,
  setDiamondPackageId
}) {
  function handleDiamondPackage(param, paramPackage, paramPackageId) {
    setDiamondPackagePrice(param);
    setDiamonPackage(paramPackage);
    setDiamondPackageId(paramPackageId)
    onSelect()
  }
  return (
    <>
      <div
        className={`package-option-diamonds ${isSelected? 'selectedPackage': ''} `}
        onClick={() => handleDiamondPackage(item.price, item.diamond_amount, item.package_id)}
      >
        <img src={diamondsImage} alt="Diamonds" className="diamonds-image" />
        <h2 className="package-option-diamonds-title">
          {item.diamond_amount} diamonds
        </h2>
        <p className="package-option-diamonds-price">₵{item.price}</p>
      </div>
    </>
  );
}
