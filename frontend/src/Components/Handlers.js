 export const truncate = (input) => {
    if (input.length > 28) {
      return input.substring(0, 28) + '...'
    } 
    return input
  }


export let dollarFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});


export const truncateModals = (input) => {
  if (input.length > 45) {
    return input.substring(0, 45) + '...'
  } 
  return input
}
