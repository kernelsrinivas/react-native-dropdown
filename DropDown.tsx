import React, { ReactNode, useCallback, useState } from "react";
import { View, Text, TextStyle, StyleProp, TouchableOpacity, Animated, RegisteredStyle, ViewStyle, FlatList } from "react-native";
import { IS_ANDROID } from "../../utils/utilsHelper";
import { PROFILE_TYPE } from "../constants/ProfilePageConstants";

interface Props {
    setValue: any;
    setOpenques: () => void;
    setOpen: any;
    testID: string | undefined;
    accessible: boolean | undefined;
    accessibilityLabel: string | undefined;
    ArrowUpIconComponent: ReactNode;
    dropdownContainerStyle: RegisteredStyle<ViewStyle>;
    ArrowDownIconComponent: ReactNode;
    textStyle: StyleProp<TextStyle>;
    disabled: any;
    labelStyle: StyleProp<TextStyle>;
    headerTextStyle: StyleProp<TextStyle>;
    value: ReactNode;
    items: [];
    renderListItem: any;
    style: any;
    onChangeValue: any;
}

export const ProfileTypeDropDown = (props: Props) => {
    const [isVisible, setDropDownVisble] = useState(false);
    const headerValue = props.items.filter((item) => item.value === props.value);
    const [{ label }] = headerValue;
    console.log("headerValue", headerValue);
    const onItemClick = useCallback((item) => {
        props.setValue && props.setValue(item.value);
        props.onChangeValue && props.onChangeValue();
        setDropDownVisble(false);
    }, []);
    return (
        <>
            <View style={{ flex: 1, marginTop: IS_ANDROID ? 5 : 0 }}>
                <TouchableOpacity
                    disabled={props.disabled}
                    style={[{ flexDirection: "row" }, props.style]}
                    onPress={() => {
                        isVisible === false && props.setOpenques();
                        props.setOpen && props.setOpen(!isVisible);
                        setDropDownVisble(!isVisible);
                    }}
                    testID={props.testID}
                    {...props.labelProps}
                >
                    <View style={{ flexGrow: 1 }}>
                        <Text accessible={false} allowFontScaling={false} importantForAccessibility="no" style={props.headerTextStyle}>
                            {PROFILE_TYPE.TYPE}
                        </Text>
                        <Text accessible={false} style={[props.headerTextStyle, { fontSize: 17, fontWeight: "500" }]}>
                            {label}
                        </Text>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", marginRight: 10 }}>
                        {isVisible ? props.ArrowUpIconComponent && <props.ArrowUpIconComponent /> : props.ArrowDownIconComponent && <props.ArrowDownIconComponent />}
                    </View>
                </TouchableOpacity>
                {isVisible && (
                    <Animated.View
                        accessible={false}
                        importantForAccessibility="yes"
                        style={[
                            {
                                width: "100%",
                                minHeight: "100%",
                                zIndex: 9999,
                                elevation: 10,
                                flexGrow: 1,
                                position: "absolute",
                                marginTop: props.style.minHeight + (IS_ANDROID ? 4.5 : 6),
                            },
                            props.dropdownContainerStyle,
                        ]}
                    >
                        <FlatList
                            accessible={false}
                            data={props.items}
                            style={props.dropdownContainerStyle}
                            renderItem={({ item, index }) => (
                                <props.renderListItem key={index} item={item} onPress={() => onItemClick(item)} disabled={props.disabled} selectedItem={props.value} />
                            )}
                        />
                    </Animated.View>
                )}
            </View>
        </>
    );
};
