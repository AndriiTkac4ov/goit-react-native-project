import MapView, { Marker } from "react-native-maps";
import {
    View,
    StyleSheet,
} from "react-native";

export default function MapScreen() {
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    longitude: 50,
                    latitude: 50,
                    longitudeDelta: 0.001,
                    latitudeDelta: 0.001,
                }}
            >
                <Marker coordinate={{ longitude, latitude, }} />
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
