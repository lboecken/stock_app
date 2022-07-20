 export const truncate = (input) => {
    if (input.length > 28) {
      return input.substring(0, 28) + '...'
    } 
    return input
  }

