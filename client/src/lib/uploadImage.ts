import axios from "axios";

export const uploadImageToImgbb = async (file: File): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!apiKey) {
      console.error("IMGBB API Key is missing");
      return null;
    }

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      formData
    );

    if (response.data.success) {
      return response.data.data.url;
    }
    return null;
  } catch (error) {
    console.error("Error uploading image to IMGBB:", error);
    return null;
  }
};
