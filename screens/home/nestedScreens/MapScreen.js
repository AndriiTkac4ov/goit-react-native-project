import MapView, { Marker } from "react-native-maps";
import {
    View,
    StyleSheet,
} from "react-native";

export default function MapScreen({ route }) {
    const { location, locationName } = route.params;
    
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                minZoomLevel={10}
                initialRegion={{
                    longitude: location?.longitude,
                    latitude: location?.latitude,
                    longitudeDelta: 0.001,
                    latitudeDelta: 0.001,
                }}
            >
                <Marker
                    title={locationName}
                    coordinate={{ longitude: location?.longitude, latitude: location?.latitude }}
                />
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    map: {
        flex: 1,
    },
});
