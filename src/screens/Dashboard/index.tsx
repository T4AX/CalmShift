import { View, Text } from "react-native"
import MotivationalQuote from "../../components/Quotes"
import { styles } from "./Styles"

const Dashboard = () => {
    return (
        <View style={styles.container}>
            <Text>Dashboard</Text>

            <MotivationalQuote />
        </View>
    )
}

export default Dashboard