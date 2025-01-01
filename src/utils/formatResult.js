export const FormatResult = (resp) => {
  let result = [];
  let finalResult = [];

  resp.forEach((item) => {
    const listingId = item.carlisiting?.id;
    if (!result[listingId]) {
      result[listingId] = {
        car: item.carLisiting,
        images: [],
      };
    }
    if (item.carImages) {
      result[listingId].images.push(item.CarImages);
    }
  });

  result.forEach((item) => {
    finalResult.push({
      ...item.car,
      images: item.images,
    });
  });
  return finalResult;
};
