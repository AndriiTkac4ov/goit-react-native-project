import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

export const useWidthDimension = () => {
    const [dimensions, setDimensions] = useState(
        Dimensions.get('window').width - 16 * 2
    )

    useEffect(() => {
        const onChangeWidth = () => {
            const width = Dimensions.get('window').width - 16 * 2;
        setDimensions(width);
    };
    Dimensions.addEventListener('change', onChangeWidth);
        // return () => {
        //     Dimensions.removeEventListener('change', onChangeWidth);
        // };

        return () => width?.remove();
    }, [])

    return dimensions;
}
