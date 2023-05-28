import MapView, { Marker } from "react-native-maps";
import {
    View,
    StyleSheet,
} from "react-native";

export default function MapScreen({ route }) {
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                minZoomLevel={10}
                initialRegion={{
                    longitude: route.params?.longitude,
                    latitude: route.params?.latitude,
                    longitudeDelta: 0.001,
                    latitudeDelta: 0.001,
                }}
            >
                <Marker
                    title='I am here'
                    coordinate={{ longitude: route.params?.longitude, latitude: route.params?.latitude }}
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
