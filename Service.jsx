import axios from "axios";

const SendBirdAppId = import.meta.env.VITE_SENDBIRD_APP_ID;
const SendBirdApiToken= import.meta.env.VITE_SENDBIRD_API_TOKEN;
const FormatResult = (resp) => {
    const result = {}; // Group by carListingId

    resp.forEach((item) => {
        const listingId = item.carImages?.carListingId; // Get carListingId from carImages
        if (!result[listingId]) {
            result[listingId] = {
                car: item.carListing, // Store car details
                images: [], // Initialize an array for images
            };
        }
        // Add imageUrl to the images array
        if (item.carImages?.imageUrl) {
            result[listingId].images.push(item.carImages.imageUrl);
        }
    });

    // Convert grouped object to an array
    const finalResult = Object.values(result).map((entry) => ({
        ...entry.car,
        images: entry.images,
    }));

    return finalResult;
};

const CreateSendBirdUser = (userId, nickName, profileUrl) => {
    return axios.post('https://api-' + SendBirdAppId + '.sendbird.com/v3/users', {
        user_id: userId,
        nickname: nickName,
        profile_url: profileUrl,
        issue_access_token:false,
    },{
        headers:{
            'Content-Type':'application/json',
            'Api-Token':SendBirdApiToken
        }
    })
}

const CreateSendBirdChannel=(users,title)=>{
    return axios.post('https://api-' + SendBirdAppId + '.sendbird.com/v3/users', {
    user_ids:users,
    is_distinct:true,
    name:title,
    },{
        headers:{
            'Content-Type':'application/json',
            'Api-Token':SendBirdApiToken
        }
    })
}

export default {
    FormatResult,
    CreateSendBirdUser,
    CreateSendBirdChannel
};
