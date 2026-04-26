import { StyleSheet, Text, View, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useState, useEffect, useRef } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system/legacy';

/*
Lähde:
- Kurssimateriaali, https://haagahelia.github.io/mobilecourse/docs/ExpoSDK/camera
- ChatGPT:
    * Askartelimme yhdessä tallennuksen mukaan. ChatGPT antoi ohjeet Legacy-versioon, mutta sanoi, että uudempi on huomattavasti monimutkaisempi. Tyydyin siis yksinkertaisempaan.
    * Lisäksi apua virheenkorjauksessa.
*/


export default function TakePicture({ navigation, route }) {
    const [permission, requestPermission] = useCameraPermissions();
    const [savedUri, setSavedUri] = useState(null);

    const camera = useRef(null);

    useEffect(() => {
        requestPermission();
    }, []);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Button mode='contained' onPress={requestPermission}>Käytä kameraa</Button>
            </View>
        );
    }

    const snapAndSave = async () => {
        if (!camera.current) return;

        const photo = await camera.current.takePictureAsync();

        const fileName = `photo_${Date.now()}.jpg`;
        const newPath = FileSystem.documentDirectory + fileName;

        await FileSystem.copyAsync({
            from: photo.uri,
            to: newPath,
        });

        setSavedUri(newPath);
    };

    const clearImage = () => {
        setSavedUri(null)
    }

    const image = () => {
        console.log("URI:", savedUri);
        if (savedUri) {
            return (
                <View>
                    <Image
                        style={{ flex: 1, minWidth: "100%" }}
                        resizeMode="cover"
                        source={{ uri: savedUri }}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Button mode='contained' onPress={() => navigation.navigate('Lisää tee', { savedUri: savedUri })}>Tallenna kuva</Button>
                        <Button mode='contained' onPress={clearImage}>Ota uusi kuva</Button>
                    </View>
                </View>
            )
        } else {
            return (
                <View>
                    <CameraView style={{ flex: 1, minWidth: "100%" }} ref={camera} />
                    <Button mode='contained' style={{ marginBottom: 10 }} onPress={snapAndSave}>Ota kuva</Button>
                </View>
            )
        }
    }

    return (
        <View style={styles.container}>
            {image()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});