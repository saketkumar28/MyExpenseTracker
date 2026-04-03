import { API_PATH } from "./apiPath";
import {axiosInstance} from "./axiosInstance";

const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);


    try {
        const response = await axiosInstance.post(API_PATH.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data; // Assuming the response contains the image URL
    } catch (error) {
        console.error("Image upload failed:", error);
        throw new Error("Image upload failed. Please try again later.");
    }
}
export default uploadImage;