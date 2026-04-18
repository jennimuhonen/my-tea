import { StyleSheet, Text, View, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useState, useEffect, useRef } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system/legacy';

/*
Lähde:
- Kurssimateriaali, https://haagahelia.github.io/mobilecourse/docs/ExpoSDK/camera
- ChatGPT, jonka kanssa askartelimme tallennuksen mukaan. ChatGPT antoi ohjeet Legacy-versioon, mutta sanoi, että uudempi on huomattavasti monimutkaisempi. Tyydyin siis yksinkertaisempaan.
*/


export default function TakePicture() {
    /* const [photoName, setPhotoName] = useState('');
    const [photoBase64, setPhotoBase64] = useState(''); */
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
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Button mode='contained' onPress={requestPermission}>Käytä kameraa</Button>
            </View>
        );
    }

    /* const snap = async () => {
        if (camera) {
            const photo = await camera.current.takePictureAsync({ base64: true });
            setPhotoName(photo.uri);
            setPhotoBase64(photo.base64);
        }
    }; */

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





    return (
        <View style={styles.container}>
            <CameraView style={{ flex: 1, minWidth: "100%" }} ref={camera} />
            {/*<Button title="Take Photo" onPress={snap} />
             <View style={{ flex: 1 }}>
                {photoName && photoBase64 ? (
                    <>
                        <Image style={{ flex: 1 }} source={{ uri: photoName }} />
                        <Image style={{ flex: 1 }} source={{ uri: `data:image/jpg;base64,${photoBase64}` }} />
                    </>
                ) : (
                    <Text>No photo taken yet.</Text>
                )}
            </View> */}
            <View style={{ flex: 1 }}>
                {savedUri ? (
                    <Image style={{ flex: 1 }} source={{ uri: savedUri }} />
                ) : (
                    <Text>No photo taken yet.</Text>
                )}
            </View>
            <Button mode='contained' style={{ marginBottom: 10 }} onPress={snapAndSave}>Ota kuva</Button>
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