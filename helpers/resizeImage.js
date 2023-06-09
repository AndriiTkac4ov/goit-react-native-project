import * as ImageManipulator from 'expo-image-manipulator';

export const resizeImage = async (uri) => {
    try {
        const manipulatedImage = await ImageManipulator.manipulateAsync(
            uri,
            [
                {
                    resize: { width: 1080 },
                },
                {
                    crop: { originX: 0, originY: 0, width: 1080, height: 700 },
                },
            ],
            { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
        );

        return manipulatedImage.uri;
    } catch (error) {
        console.error('Error with resize image: ', error);
        throw error;
    }
}
