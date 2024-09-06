import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    interpolate,
    SharedValue,
    interpolateColor,
} from 'react-native-reanimated';

interface PaginationProps {
    data: any[]; // Adjust the type according to your data structure
    x: SharedValue<number>;
    size: number;
}

const Pagination: React.FC<PaginationProps> = ({ data, x, size }) => {
    return (
        <View style={styles.paginationContainer}>
            {data.map((_, i) => {
                const animatedDotStyle = useAnimatedStyle(() => {
                    const widthAnimation = interpolate(
                        x.value,
                        [(i - 1) * size, i * size, (i + 1) * size],
                        [8, 8, 8],
                    );
                    const color = interpolateColor(
                        x.value,
                        [(i - 1) * size, i * size, (i + 1) * size],
                        ['#C1C4C2', '#0C447D', '#C1C4C2'],
                    )
                    const opacityAnimation = interpolate(
                        x.value,
                        [(i - 1) * size, i * size, (i + 1) * size],
                        [1, 1, 1],
                    );
                    return {
                        backgroundColor: color,
                        width: widthAnimation,
                        opacity: opacityAnimation,
                    };
                });
                return (
                    <Animated.View style={[styles.dots, animatedDotStyle]} key={i} />
                );
            })}
        </View>
    );
};

export default Pagination;

const styles = StyleSheet.create({
    paginationContainer: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        // alignItems: 'center',
    },
    dots: {
        height: 8,
        backgroundColor: 'orange',
        marginHorizontal: 5,
        borderRadius: 5,
    },
});
