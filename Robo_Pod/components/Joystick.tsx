import React from "react";
import { View, StyleSheet } from "react-native";
import { Touch } from "../components";
import { colors } from "../theme";

interface JoystickType {
    isDisabled?: boolean;
    foward?: () => void;
    back?: () => void;
    right?: () => void;
    left?: () => void;
    stop?: () => void;
}

function Joystick({
    isDisabled,
    foward,
    back,
    right,
    left,
    stop,
}: JoystickType): React.JSX.Element {
    const colorCodeVal = colors.base;
    const strokeVal = colors.one;
    const iconSizeVal = 45;
    return (
        <View style={styles.joystickContainer}>
            <View style={styles.joystickCircle}>
                <View style={{ ...styles.joystickRow, height: 80 }}>
                    <Touch
                        colorCode={colorCodeVal}
                        stroke={strokeVal}
                        iconSize={iconSizeVal}
                        icon="chevron-up"
                        onPress={foward}
                        isDisabled={isDisabled}
                    />
                </View>
                <View style={{ ...styles.joystickRow, height: 130 }}>
                    <Touch
                        colorCode={colorCodeVal}
                        stroke={strokeVal}
                        iconSize={iconSizeVal}
                        icon="chevron-back"
                        onPress={left}
                        isDisabled={isDisabled}
                    />
                    <Touch
                        colorCode={colorCodeVal}
                        stroke={strokeVal}
                        iconSize={iconSizeVal}
                        isLarge
                        isGradient
                        onPress={stop}
                        isDisabled={isDisabled}
                    />
                    <Touch
                        colorCode={colorCodeVal}
                        stroke={strokeVal}
                        iconSize={iconSizeVal}
                        icon="chevron-forward"
                        onPress={right}
                        isDisabled={isDisabled}
                    />
                </View>
                <View style={{ ...styles.joystickRow, height: 80 }}>
                    <Touch
                        colorCode={colorCodeVal}
                        stroke={strokeVal}
                        iconSize={iconSizeVal}
                        icon="chevron-down-outline"
                        onPress={back}
                        isDisabled={isDisabled}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    joystickContainer: {
        height: "45%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    joystickCircle: {
        height: 300,
        width: 300,
        borderRadius: "100%",
        backgroundColor: colors.base,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        elevation: 15,
    },
    joystickRow: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
});
export default Joystick;
