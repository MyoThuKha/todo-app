import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from "react-native";
import { StatusBar } from "react-native";
import { useEffect, useState, useRef } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useDispatch, useSelector } from "react-redux";
import { updateName } from "../datas/userReducer";

// return "#f2eee9";

SplashScreen.preventAutoHideAsync();
const Intro = ({ navigation }: { navigation: any }) => {
  const username: string = useSelector((state: any) => state.user.name);
  const foreground: string = useSelector((state: any) => state.user.foreground);
  const background: string = useSelector((state: any) => state.user.background);

  const dispatch = useDispatch();

  useEffect(() => {
    if (username !== "") {
      navigation.navigate("home");
    }
  }, []);

  const firstname = useRef("");
  const secondname = useRef("");

  const [error, setError] = useState(false);

  const [icon, setIcon] = useState(1);
  const changeIcon = () => {
    if (icon === 5) setIcon(1);
    else setIcon(icon + 1);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ ...styles.container, backgroundColor: foreground }}>
        {/* image */}
        <View style={styles.imageBox}>
          <TouchableOpacity onPress={() => changeIcon()}>
            <Image
              source={require(`../assets/profile/profile3.png`)}
              style={{
                width: 300,
                height: 300,
                resizeMode: "contain",
              }}
            />
          </TouchableOpacity>
          {error && <Text style={{ fontSize: 18 }}>Please add your name</Text>}
          {!error && (
            <Text style={{ fontSize: 28, fontFamily: "display" }}>
              Let get start
            </Text>
          )}
        </View>

        {/* form */}
        <View>
          <View style={{ backgroundColor: foreground, ...styles.form }}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Abc"
              onChangeText={(value) => {
                firstname.current = value;
              }}
            />
          </View>
          <View style={{ backgroundColor: foreground, ...styles.form }}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Abc"
              onChangeText={(value) => {
                secondname.current = value;
              }}
            />
          </View>
        </View>

        {/* next */}
        <TouchableOpacity
          onPress={() => {
            if (firstname.current === "" || secondname.current === "") {
              setError(true);
            } else {
              setError(false);
              dispatch(
                updateName({
                  firstname: firstname.current,
                  secondname: secondname.current,
                })
              );
              navigation.navigate("home");
            }
          }}
        >
          <View style={{ backgroundColor: background, ...styles.btn }}>
            <Text style={{ color: foreground }}>Next</Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    justifyContent: "space-between",
  },
  imageBox: {
    height: 300,
    alignItems: "center",
  },
  label: {
    color: "#a3a3a1",
    fontSize: 18,
    marginVertical: 8,
  },
  form: {
    marginHorizontal: 24,
    paddingVertical: 8,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  input: {
    fontSize: 16,
  },
  btn: {
    marginHorizontal: 24,
    alignItems: "center",
    paddingVertical: 18,
    borderRadius: 18,
    marginBottom: 30,
  },
});

export default Intro;
