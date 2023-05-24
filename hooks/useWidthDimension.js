import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

export const useWidthDimension = (marginHorizontal) => {
    const [dimensions, setDimensions] = useState(
        Dimensions.get('window').width - marginHorizontal * 2
    )

    useEffect(() => {
        const onChangeWidth = () => {
            const width = Dimensions.get('window').width - marginHorizontal * 2;
            setDimensions(width);
        };

        const subscription = Dimensions.addEventListener('change', onChangeWidth);
        return () => subscription?.remove();
    }, [])

    return dimensions;
}
